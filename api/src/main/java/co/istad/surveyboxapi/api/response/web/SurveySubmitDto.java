package co.istad.surveyboxapi.api.response.web;


import co.istad.surveyboxapi.api.response.constrant.SurveyResponseSubmitConstraint;
import co.istad.surveyboxapi.api.survey.web.QuestionSurveyDto;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import java.util.ArrayList;

@Builder
@SurveyResponseSubmitConstraint
public record SurveySubmitDto(
     @NotNull(message = "survey id is required")
     Long surveyId,

     Long userId,
     String email,
     String username,
     ArrayList<QuestionSurveyDto> answers
){
}
