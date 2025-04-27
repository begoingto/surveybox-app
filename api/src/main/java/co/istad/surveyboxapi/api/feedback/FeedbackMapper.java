package co.istad.surveyboxapi.api.feedback;

import co.istad.surveyboxapi.api.feedback.web.FeedbackDto;
import co.istad.surveyboxapi.api.feedback.web.FeedbackDto1;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface FeedbackMapper {
    FeedbackMapper INSTANCE = Mappers.getMapper(FeedbackMapper.class);
    FeedbackDto toDto (Feedback feedback);
    Feedback toEntity (FeedbackDto feedbackDto);
    List<FeedbackDto1> toDtoList(List<Feedback> feedbackList);
    List<Feedback> toEntityList(List<FeedbackDto> feedbackDtoList);
}
