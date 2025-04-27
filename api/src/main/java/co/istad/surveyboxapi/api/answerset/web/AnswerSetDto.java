package co.istad.surveyboxapi.api.answerset.web;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AnswerSetDto {
    Long id;
    @NotNull(message = "{required.field}")
    Long  questionId;
    @NotBlank(message = "{cannot.be.blank}")
    String name;
    String img;
}
