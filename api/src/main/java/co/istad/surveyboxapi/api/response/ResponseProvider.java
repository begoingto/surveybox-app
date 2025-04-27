package co.istad.surveyboxapi.api.response;

import org.apache.ibatis.jdbc.SQL;

public class ResponseProvider {
    private final String TABLE = "responses";
    public String buildInsertResponseSql(){
        return new SQL(){{
            INSERT_INTO(TABLE);
            VALUES("user_id","#{r.user.id}");
            VALUES("survey_id","#{r.survey.id}");
            VALUES("answer","CAST(#{r.answer} AS JSON)");
            VALUES("email","#{r.email}");
            VALUES("username","#{r.username}");
            VALUES("created_at","#{r.createdAt}");
        }}.toString();
    }

    public String buildInsertResponseQuestionsSql(){
        return new SQL(){{
            INSERT_INTO("response_questions");
            VALUES("response_id","#{r.response.id}");
            VALUES("question_id","#{r.question.id}");
            VALUES("question_template_id","#{r.questionTemplateId}");
            VALUES("layout","#{r.layout}");
            VALUES("required","#{r.required}");
        }}.toString();
    }

    public String buildInsertResponseQuestionAnswersSql(){
        return new SQL(){{
            INSERT_INTO("response_question_answers");
            VALUES("answer","#{r.answer}");
            VALUES("response_question_id","#{r.responseQuestions.id}");
            VALUES("answer_set_id","#{r.answerSet.id}");
        }}.toString();
    }

    public String buildBySurveyIdSql(){
        return new SQL(){{
            SELECT("*");
            FROM(TABLE);
            WHERE("survey_id=#{surveyId}");
        }}.toString();
    }
}
