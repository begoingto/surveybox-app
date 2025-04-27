package co.istad.surveyboxapi.api.answerset;

import co.istad.surveyboxapi.api.answerset.web.AnswerSetDto;
import co.istad.surveyboxapi.api.answerset.web.AnswerSetDtoResponse;
import co.istad.surveyboxapi.api.question.QuestionService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;
@Mapper(componentModel = "spring",uses = QuestionService.class)
public interface AnswerSetMapStruct {
    AnswerSetMapStruct INSTANCE = Mappers.getMapper(AnswerSetMapStruct.class);
    @Mapping(target = "questions", source = "questionId")
    AnswerSet toEntity(AnswerSetDto answerSetDto);
    @Mapping(target = "questionId", source = "questions.id")
    AnswerSetDto toDto(AnswerSet answerSet);
    AnswerSetDtoResponse toResponse(AnswerSet answerSet);
    @Mapping(target = "id", ignore = true)
    void updateQuestionFromDto(AnswerSetDto dto, @MappingTarget AnswerSet question);

}
