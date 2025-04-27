package co.istad.surveyboxapi.api.question.web;

import co.istad.surveyboxapi.api.answerset.web.AnswerSetDto;
import co.istad.surveyboxapi.api.category.Category;
import co.istad.surveyboxapi.api.survey.web.CreatedByDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class QuestionDtoResponse {
        Long id;
        @Size(min = 1, max = 254, message = "question is to max length")
        @NotBlank
        String name;
        @NotNull(message = "{required.field}")
        Category category;
        @NotNull(message = "{required.field}")
        String questionType;
        String answerTemplate;
        String layout;
        boolean required;
        CreatedByDto user;
        private List<AnswerSetDto> answerSet;

}
