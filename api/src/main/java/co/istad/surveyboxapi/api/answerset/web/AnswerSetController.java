package co.istad.surveyboxapi.api.answerset.web;

import co.istad.surveyboxapi.api.answerset.AnswerSet;
import co.istad.surveyboxapi.api.answerset.AnswerSetMapStruct;
import co.istad.surveyboxapi.api.answerset.AnswerSetService;
import co.istad.surveyboxapi.exception.ApiException;
import co.istad.surveyboxapi.exception.ApiExceptionResponseMessage;
import co.istad.surveyboxapi.util.PageMapper;
import co.istad.surveyboxapi.util.dto.PageDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/answer-set")
public class AnswerSetController {
    private final AnswerSetService answerSetService;
    @PostMapping
    public ResponseEntity<AnswerSetDto> saveAnswerSet(@RequestBody @Valid AnswerSetDto answerSetDto) {
        AnswerSetDto savedAnswerSet = answerSetService.saveAnswerSet(answerSetDto);
        return ResponseEntity.ok(savedAnswerSet);
    }
    @GetMapping("{id}")
    public ResponseEntity<?> getAnswerById(@PathVariable("id") Long id) {
      AnswerSet answerSet=answerSetService.getById(id);
        return ResponseEntity.ok(AnswerSetMapStruct.INSTANCE.toResponse(answerSet));
    }
    @PutMapping("{id}")
    public ResponseEntity<?> updateAnswerSet(@RequestBody AnswerSetDto answerSetDto,@PathVariable("id") Long id) {
       AnswerSet answerSet= answerSetService.updateAnswer(answerSetDto,id);
        return ResponseEntity.accepted().body(answerSet);
    }
    @DeleteMapping("/{answerSetId}")
    public ResponseEntity<Map<String, Object>> deleteAnswerSet(@PathVariable Long answerSetId) throws ApiExceptionResponseMessage {
        return answerSetService.deleteAnswerSet(answerSetId);
    }
    @GetMapping
    public ResponseEntity<?> getListAnswer(Map<String,String>params) {
        Page<AnswerSet> page = answerSetService.getQuestion(params);
        PageDTO dto = PageMapper.INSTANCE.toDTO(page);
        dto.setList(page.get().map(AnswerSetMapStruct.INSTANCE::toDto).toList());
        return ResponseEntity.ok(dto);
    }
}

