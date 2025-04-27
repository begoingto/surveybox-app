package co.istad.surveyboxapi.api.survey.web;

import lombok.Builder;

@Builder
public record SurveyStatus(
        Boolean status
) {

}
