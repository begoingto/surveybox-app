package co.istad.surveyboxapi.api.question.web;

import co.istad.surveyboxapi.api.answerset.web.AnswerSetDto;
import co.istad.surveyboxapi.api.category.Category;
import co.istad.surveyboxapi.api.question.Question;
import co.istad.surveyboxapi.api.survey.web.CreatedByDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Null;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class QuestionDto {
        Long id;
        @Size(min = 1, max = 254, message = "question is to max length")
        @NotBlank
        String name;
        @NotNull(message = "{required.field}")
        Long categoryId;
        Category category;
        @NotNull(message = "{required.field}")
        String questionType;
        String answerTemplate;
        String layout;
        boolean required;
        CreatedByDto user;
        String answerOption;
        private List<AnswerSetDto> answerSet;
}
