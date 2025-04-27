package co.istad.surveyboxapi.api.survey;

import co.istad.surveyboxapi.api.survey.web.SurveyDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface SurveyMapper {

    SurveyMapper INSTANCE = Mappers.getMapper(SurveyMapper.class);

    SurveyDto toDto(Survey survey);

    Survey toEntity(SurveyDto surveyDto);
}
