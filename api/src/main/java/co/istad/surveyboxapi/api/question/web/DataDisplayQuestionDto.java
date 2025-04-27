package co.istad.surveyboxapi.api.question.web;

import co.istad.surveyboxapi.api.category.web.CategoryDto;
import co.istad.surveyboxapi.api.question.Question;
import co.istad.surveyboxapi.api.question.QuestionType;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class DataDisplayQuestionDto {
    Long id;
    String name;
    CategoryDto category;
    QuestionType questionType;
    String answerTemplate;
    String layout;
    boolean required;
    LocalDateTime dateCreated;
    LocalDateTime dateUpdated;
    public DataDisplayQuestionDto (){

    }
    public DataDisplayQuestionDto(Question question) {
        this.id=question.getId();
        this.name = question.getName();
        this.category = (question.getCategory() != null) ? new CategoryDto(question.getCategory()) : null;
        this.questionType = QuestionType.valueOf(String.valueOf(question.getQuestionType()).toUpperCase());
        this.answerTemplate = question.getAnswerTemplate();
        this.layout = question.getLayout();
        this.required = question.isRequired();
        this.dateCreated=question.getDateCreated();
        this.dateUpdated=question.getDateUpdated();
    }
}
