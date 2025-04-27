package co.istad.surveyboxapi.api.survey.web;

import co.istad.surveyboxapi.api.survey.SurveyOptionEnum;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SurveyResponse <T>{
    private Long id;
    private String title;
    private String description;
    private SurveyOptionEnum surveyOption;
    private String cover;
    private Boolean status;
    private String msgWelcome;
    private String msgSuccess;
    private String qrCode;
    private String displayQuestion;
    private String iconSuccess;
    private String iconWelcome;
    private CreatedByDto createdBy;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDateTime dateCreated;
    private Long themeId;
    private String uuid;
    private ArrayList<SurveyResponseAnswersDto> answered;
    private ArrayList<QuestionSurveyDto> answers;
    private T surveyQuestions;

    public ArrayList<SurveyResponseAnswersDto> getAnswered() {
        if (!answered.isEmpty()) {
            return null;
        }
        return answered;
    }

    public ArrayList<QuestionSurveyDto> getAnswers() {

        if (answered.isEmpty()) {
            return new ArrayList<>();
        }

        ArrayList<QuestionSurveyDto> answers = answered.get(0).getAnswer();

//        if (surveyOption.equals(SurveyOptionEnum.REQUIRED)){
//            answered = this.getAnswersAppendUser();
//        }

        ObjectMapper objectMapper = new ObjectMapper();

        List<QuestionSurveyDto> getAnswers = answered.stream()
                                .flatMap(list -> jsonToQuestionSurveyDto(objectMapper, list))
                                .toList();
        try {
            String json = objectMapper.writeValueAsString(answers);
            answers = objectMapper.readValue(json, new TypeReference<>() {});

            for (QuestionSurveyDto an: answers) {
                List<QuestionSurveyDto> getAns = getAnswers.stream()
                        .filter(a -> a.getId().equals(an.getId()))
                        .toList();

                switch (an.getQuestionType()){
                    // CASE ESSAY
                    case ESSAY -> {
                        switch (surveyOption){
                            case REQUIRED,REGISTER -> {
                                var answered = getAns.stream().map(el -> AnswerUserDto.builder()
                                        .user(el.getUser())
                                        .answer(el.getAnswerSet())
                                        .build()).toList();
                                an.setAnswerSet(answered);
                            }
                            case ANONYMOUS -> {
                                var answered = getAns.stream().map(QuestionSurveyDto::getAnswerSet).collect(Collectors.toList());
                                an.setAnswerSet(answered);
                            }
                        }
                        an.setTotalAnswered(answered.size());
                    }
                    // CASE MULTIPLE_CHOICE
                    case MULTIPLE_CHOICE,RATING,RANG,YES_NO -> {

                        String  answerItemJson = objectMapper.writeValueAsString(an.getAnswerSet());
                        List<AnswerItemDto> answerItemDtos = objectMapper.readValue(answerItemJson, new TypeReference<>() {});

                       var answerItemDtos1 = getAns.stream().map(a -> {
                                    try {
                                        String json1 = objectMapper.writeValueAsString(a.getAnswerSet());
                                        List<AnswerItemDto> anItems = objectMapper.readValue(json1, new TypeReference<>() {});
                                        return Collections.singletonList(anItems.stream().filter(el -> {
//                                            Map<String, Object> elMap = objectMapper.convertValue(el.answered(), new TypeReference<>() {});
                                            if (el.answered()==null){
                                                return false;
                                            }
                                            return el.answered().equals(true);
                                        }).map(el -> {

                                            switch (surveyOption){
                                                case REQUIRED,REGISTER -> {
                                                    AnswerUserDto answerUserDto = AnswerUserDto.builder()
                                                            .user(a.getUser())
                                                            .answer(el.answered())
                                                            .build();

                                                    return AnswerItemDto.builder()
                                                            .id(el.id())
                                                            .name(el.name())
                                                            .name(el.name())
                                                            .questionId(null)
                                                            .answered(answerUserDto)
                                                            .build();
                                                }
                                                case ANONYMOUS -> {
                                                    return AnswerItemDto.builder()
                                                            .id(el.id())
                                                            .name(el.name())
                                                            .name(el.name())
                                                            .questionId(null)
                                                            .answered(el.answered())
                                                            .build();
                                                }
                                            }
                                            return null;
                                        }).findFirst().orElse(null));
                                    } catch (JsonProcessingException e) {
                                        throw new RuntimeException(e);
                                    }
                       }).flatMap(Collection::stream).toList();
                       an.setTotalAnswered(answerItemDtos1.size());
                       an.setAnswerSet(answerItemDtos.stream().map(el ->{
                           var correctAns = answerItemDtos1.stream().filter(el1 -> {
                                 if (el1==null){
                                      return false;
                                 }
                               return el1.id().equals(el.id());
                           }).toList();

                           double percentage;

                           try {
                               percentage = ((double) correctAns.size() / (double) answerItemDtos1.size())*100;
                           }catch (Exception e) {
                               throw new ResponseStatusException(HttpStatus.PRECONDITION_FAILED,"Divide by 0");
                           }
                            return AnswerItemDto.builder()
                                    .id(el.id())
                                    .name(el.name())
                                    .img(el.img())
                                    .questionId(null)
                                    .answered(correctAns)
                                    .percentage(percentage)
                                    .build();
                       }).toList());
                    }
                    default -> {
                        log.info("default an: {}", an.getQuestionType());
                    }
                }
            }

        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return answers;
    }

    private Stream<QuestionSurveyDto> jsonToQuestionSurveyDto(ObjectMapper objectMapper, SurveyResponseAnswersDto list) {

        try {
            String json = objectMapper.writeValueAsString(list.getAnswer());
            ArrayList<QuestionSurveyDto> answers = objectMapper.readValue(json, new TypeReference<>() {});

            if (surveyOption.equals(SurveyOptionEnum.REQUIRED)){
                CreatedByDto createdBy = new CreatedByDto();
                createdBy.setUsername(list.getUsername());
                createdBy.setEmail(list.getEmail());
                answers = answers.stream().peek(el -> el.setUser(createdBy)).collect(Collectors.toCollection(ArrayList::new));
            }
            if (surveyOption.equals(SurveyOptionEnum.REGISTER)){
                answers = answers.stream().peek(el -> el.setUser(list.getUser())).collect(Collectors.toCollection(ArrayList::new));
            }

            list.setAnswer(answers);

            return answers.stream();
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public ArrayList<QuestionSurveyDto> getSurveyQuestions() {
        if (surveyQuestions == null || surveyQuestions=="") return new ArrayList<>();
        return (ArrayList<QuestionSurveyDto>) surveyQuestions;
    }
}
