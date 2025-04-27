package co.istad.surveyboxapi.api.survey.web;

import co.istad.surveyboxapi.api.question.QuestionType;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Slf4j
@JsonInclude(JsonInclude.Include.NON_NULL)
public class QuestionSurveyDto <T> {
    private Long id;
    private String name;
    private QuestionType questionType;
    private String answerOption;
    private Integer categoryId;
    private String layout;
    private Boolean required;
    private Integer order;
    private Integer answerTemplate;
    private Boolean answered;
    private CreatedByDto user;
    private Integer totalAnswered;
    private T answerSet;
}
