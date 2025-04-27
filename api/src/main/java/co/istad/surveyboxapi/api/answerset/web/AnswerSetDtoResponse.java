package co.istad.surveyboxapi.api.answerset.web;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AnswerSetDtoResponse {
    Long id;
    String name;
    String img;
}
