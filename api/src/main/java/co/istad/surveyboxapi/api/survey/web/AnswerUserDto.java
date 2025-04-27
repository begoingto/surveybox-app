package co.istad.surveyboxapi.api.survey.web;


import lombok.Builder;

@Builder
public record AnswerUserDto<T>(
        CreatedByDto user,
        T answer
) {
}
