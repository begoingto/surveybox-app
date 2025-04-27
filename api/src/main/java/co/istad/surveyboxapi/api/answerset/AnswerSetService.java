package co.istad.surveyboxapi.api.answerset;

import co.istad.surveyboxapi.api.answerset.web.AnswerSetDto;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;

import java.util.Map;

public interface AnswerSetService {
    AnswerSetDto saveAnswerSet(AnswerSetDto answerSet);
    AnswerSet getById(Long id);
    AnswerSet updateAnswer(AnswerSetDto answerSetDto, Long questionId);
    ResponseEntity<Map<String, Object>> deleteAnswerSet(Long answerSetId);
    Page<AnswerSet> getQuestion(Map<String,String>params);
}
