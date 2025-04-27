package co.istad.surveyboxapi.api.response.web;

import co.istad.surveyboxapi.api.survey.Survey;
import co.istad.surveyboxapi.api.survey.web.AnswerItemDto;
import co.istad.surveyboxapi.api.survey.web.QuestionSurveyDto;
import co.istad.surveyboxapi.api.user.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.io.DataInput;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@Slf4j
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseSurveyDto{
    private Long id;
    private User user;
    private Survey survey;
    private String answer;
    private ArrayList<QuestionSurveyDto> answers;
    private LocalDateTime createdAt;

    public ArrayList<QuestionSurveyDto> getAnswers() {
        if (answer==null) {
            return new ArrayList<>();
        }
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            ArrayList<QuestionSurveyDto> answers = objectMapper.readValue(answer, new TypeReference<>() {});
            for (QuestionSurveyDto an: answers) {
                switch (an.getQuestionType()){
                    // CASE ESSAY
                    case ESSAY -> {
                        an.setAnswerSet( an.getAnswerSet());
                    }
                    // CASE MULTIPLE_CHOICE
                    case MULTIPLE_CHOICE,RATING,RANG,YES_NO -> {
                        try {
                            String json1 = objectMapper.writeValueAsString(an.getAnswerSet());
                            List<AnswerItemDto> anItems = objectMapper.readValue(json1, new TypeReference<>() {});
                            anItems = anItems.stream().map(el -> {
                                if (el.answered()==null){
                                    return AnswerItemDto.builder()
                                            .id(el.id())
                                            .name(el.name())
                                            .img(el.img())
                                            .questionId(null)
                                            .answered(false)
                                            .percentage(0D)
                                            .build();
                                }
                                return AnswerItemDto.builder()
                                        .id(el.id())
                                        .name(el.name())
                                        .img(el.img())
                                        .questionId(null)
                                        .answered(el.answered())
                                        .percentage( el.answered().equals(true) ? 100D : 0D)
                                        .build();
                            }).collect(Collectors.toList());
                            an.setAnswerSet(anItems);
                        } catch (JsonProcessingException e) {
                            throw new RuntimeException(e);
                        }
                    }
                    default -> {
                        log.info("default an: {}", an.getQuestionType());
                    }
                }
            }
            return answers;
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String getAnswer() {
        return null;
    }
}
