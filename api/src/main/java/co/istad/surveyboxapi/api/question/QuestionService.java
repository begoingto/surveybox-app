package co.istad.surveyboxapi.api.question;

import co.istad.surveyboxapi.api.question.web.DataDisplayQuestionDto;
import co.istad.surveyboxapi.api.question.web.QuestionDto;
import co.istad.surveyboxapi.api.question.web.QuestionFilters;
import co.istad.surveyboxapi.api.user.web.GetUserDto;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import org.springframework.data.domain.Page;

import java.util.Map;

public interface QuestionService {
    QuestionDto create(QuestionDto questionDto);
    DataDisplayQuestionDto displayQuestionContainById(Long id);
    Question updateQuestion(QuestionDto question , Long categoryId);
    Question getQuestionById(Long questionId);
    Map<String, Object> deleteQuestion(Long questionId);
    Page<Question> getQuestion(Map<String,String>params);
    QuestionDto update(Long id, QuestionDto questionDto);
    Map<String, Object> countQuestions();
    Page<Question> existingQuestion(Map<String,String>params);

    PageInfo<QuestionDto> findAll(int page, int limit, QuestionFilters filters);
}
