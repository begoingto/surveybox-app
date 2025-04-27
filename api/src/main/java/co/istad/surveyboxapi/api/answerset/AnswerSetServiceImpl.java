package co.istad.surveyboxapi.api.answerset;

import co.istad.surveyboxapi.api.answerset.web.AnswerSetDto;
import co.istad.surveyboxapi.api.question.Question;
import co.istad.surveyboxapi.api.question.QuestionRepository;
import co.istad.surveyboxapi.exception.ApiException;
import co.istad.surveyboxapi.exception.ApiExceptionResponseMessage;
import co.istad.surveyboxapi.exception.ResourceNotFoundException;
import co.istad.surveyboxapi.util.PageUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnswerSetServiceImpl implements AnswerSetService {
    private final AnswerSetMapStruct answerSetMapStruct;
    private final AnswerSetRepository answerSetRepository;
    private final QuestionRepository questionRepository;

    @Override
    public AnswerSetDto saveAnswerSet(AnswerSetDto answerSet) {
        AnswerSet answerSet1 = answerSetMapStruct.toEntity(answerSet);
        AnswerSet savedAnswerSet = answerSetRepository.save(answerSet1);
        return answerSetMapStruct.toDto(savedAnswerSet);
    }

    @Override
    public AnswerSet getById(Long id) {
        AnswerSet answerSet = answerSetRepository.findById(id).orElseThrow(() ->
                new ResourceNotFoundException("Answer set", id));
        return answerSet;
    }

    @Override
    public AnswerSet updateAnswer(AnswerSetDto answerSetDto, Long questionId) {
        Question question = questionRepository.findById(answerSetDto.getQuestionId()).orElseThrow(() ->
                new ResourceNotFoundException("Question", answerSetDto.getQuestionId()));
        AnswerSet answerSet = answerSetRepository.findById(questionId).orElseThrow(() ->
                new ResourceNotFoundException("Answer set", questionId));
        answerSet.setQuestions(question);
        answerSetMapStruct.updateQuestionFromDto(answerSetDto, answerSet);
        return answerSetRepository.save(answerSet);
    }

    @Override
    public ResponseEntity<Map<String, Object>> deleteAnswerSet(Long answerSetId) throws ApiExceptionResponseMessage {
        AnswerSet answerSet = getById(answerSetId);

        answerSetRepository.delete(answerSet);

        Map<String, Object> response = new HashMap<>();
        response.put("id", answerSet.getId());
        response.put("name", answerSet.getName());
        response.put("img", answerSet.getImg());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @Override
    public Page<AnswerSet> getQuestion(Map<String, String> params) {
        Pageable pageable = PageUtils.getPageable(params);
        Page<AnswerSet> answerSet = answerSetRepository.findAll(pageable);
        return answerSet;
    }

}

