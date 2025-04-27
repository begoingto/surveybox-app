package co.istad.surveyboxapi.api.question;


import co.istad.surveyboxapi.api.answerset.AnswerSet;
import co.istad.surveyboxapi.api.category.Category;
import co.istad.surveyboxapi.api.question.web.QuestionDto;
import co.istad.surveyboxapi.api.question.web.QuestionFilters;
import co.istad.surveyboxapi.api.user.User;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface QuestionMapper {
    @SelectProvider(type = QuestionProvider.class)
    @Results(id = "qMap",value = {
            @Result(property = "id", column = "id"),
            @Result(property = "name", column = "name"),
            @Result(property="questionType", column = "question_type"),
            @Result(property="layout", column = "layout"),
            @Result(property="answerOption", column = "answer_option"),
            @Result(property = "category", column = "category_id",one = @One(select = "findCategoryById")),
            @Result(property = "user", column = "created_by",one = @One(select = "findUserById")),
            @Result(property = "answerSet", column = "id",many = @Many(select = "findAnswerSetById")),
    })
    List<Question> findAll(@Param("f") QuestionFilters filters);

    @Select("SELECT * FROM categories WHERE id = #{id}")
    Category findCategoryById(Long id);

    @Select("SELECT * FROM users WHERE id = #{id}")
    User findUserById(Long id);

    @Select("SELECT * FROM answer_set WHERE question_id = #{id}")
    List<AnswerSet> findAnswerSetById(Long id);
}
