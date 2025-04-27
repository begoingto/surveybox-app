package co.istad.surveyboxapi.api.response.web;

import co.istad.surveyboxapi.api.survey.web.CreatedByDto;

public record QuestionAnswerDto(
        Long id,
        String name,
        Long categoryId,
        String questionType,
        Long questionTemplateId,
        String layout,
        Boolean required,
        CreatedByDto user,
        Object answers
) {
}
