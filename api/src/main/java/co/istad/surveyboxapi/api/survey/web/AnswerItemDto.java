package co.istad.surveyboxapi.api.survey.web;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public record AnswerItemDto<T>(
        Long id,
        String name,
        String img,
        Long questionId,
        T answered,

        Double percentage
) {
}
