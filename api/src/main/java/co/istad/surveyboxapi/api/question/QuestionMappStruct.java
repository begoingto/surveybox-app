package co.istad.surveyboxapi.api.question;

import co.istad.surveyboxapi.api.answerset.AnswerSet;
import co.istad.surveyboxapi.api.answerset.web.AnswerSetDto;
import co.istad.surveyboxapi.api.category.CategoryService;
import co.istad.surveyboxapi.api.question.web.DataDisplayQuestionDto;
import co.istad.surveyboxapi.api.question.web.QuestionDto;
import co.istad.surveyboxapi.api.question.web.QuestionDtoResponse;
import com.github.pagehelper.PageInfo;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring",uses = {CategoryService.class})
public interface QuestionMappStruct {
    QuestionMappStruct INSTANCE = Mappers.getMapper(QuestionMappStruct.class);

    @Mapping(target = "category", source = "questionDto.categoryId")
    @Mapping(target = "answerSet", source = "questionDto.answerSet")
    Question toEntity(QuestionDto questionDto);

    List<AnswerSetDto> toAnswerSetDtoList(List<AnswerSet> answerSetList);

    @Mapping(target = "questionId", source = "questions.id")
    AnswerSetDto toAnswerSetDto(AnswerSet answerSet);

    AnswerSet toEntity(AnswerSetDto voteResultSetDTO);

//    @Mapping(target = "category", source = "questionDto.categoryId")
//    @Mapping(target = "answerSet", source = "questionDto.answerSet")
    //Question toEntityResponse(QuestionDtoResponse questionDtoResponse);

    //AnswerSet toAnswerSet(AnswerSetDto answerSetDto);
    @Mapping(target = "categoryId", source = "category.id")
    QuestionDto toDto(Question question);

    @Mapping(target = "category.id", source = "category.id")
    @Mapping(target = "category.dateCreated", ignore = true)
    @Mapping(target = "category.dateUpdated", ignore = true)
    QuestionDtoResponse toDtoResponse(Question question);
//    @Mapping(target = "category.id", source = "category")
//    Question toEntityQ(QuestionDtoResponse questionDtoResponse);

    @Mapping(target = "id", ignore = true)
    void updateQuestionFromDto(QuestionDto dto, @MappingTarget Question question);

    @Named("toDtoData")
    default DataDisplayQuestionDto toDtoData(Question question) {
        if (question == null) {
            return null;
        }

        DataDisplayQuestionDto dto = new DataDisplayQuestionDto();
        dto.setId(question.getId());
        dto.setName(question.getName());
        // Set other properties
        return dto;
    }

    PageInfo<QuestionDto> toDtoPageInfo(PageInfo<Question> pageInfo);
}
