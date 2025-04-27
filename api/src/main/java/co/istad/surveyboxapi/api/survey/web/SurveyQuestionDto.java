package co.istad.surveyboxapi.api.survey.web;

import java.util.ArrayList;

public record SurveyQuestionDto(
        ArrayList<QuestionSurveyDto> questions
) {
}
