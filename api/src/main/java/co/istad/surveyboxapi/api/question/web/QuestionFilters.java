package co.istad.surveyboxapi.api.question.web;

import lombok.Builder;

@Builder
public record QuestionFilters(
        String name,
        Long categoryId,
        String questionType,
        Boolean required,
        Long createdBy,
        String sortBy,
        String sortDirection
) {
}
