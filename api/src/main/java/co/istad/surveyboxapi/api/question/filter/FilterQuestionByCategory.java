package co.istad.surveyboxapi.api.question.filter;

import co.istad.surveyboxapi.api.question.QuestionType;
import lombok.Data;

@Data
public class FilterQuestionByCategory {
    String categoryName;
    String categoryId;
   // Long userId;
    String questionName;
    QuestionType questionType;
    private String sortBy="";
    private String sortDirection="";
    String yourSelf;
    FilterCreator filter;
    public FilterQuestionByCategory() {
        this.sortBy = "";
    }
}
