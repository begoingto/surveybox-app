package co.istad.surveyboxapi.api.question.web;

import co.istad.surveyboxapi.api.question.Question;
import co.istad.surveyboxapi.api.question.QuestionMappStruct;
import co.istad.surveyboxapi.api.question.QuestionService;
import co.istad.surveyboxapi.base.BaseApi;
import co.istad.surveyboxapi.util.PageMapper;
import co.istad.surveyboxapi.util.dto.PageDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("api/v1/existing-questions")
@RequiredArgsConstructor
public class ExistingQuestionController {
    private final QuestionService questionService;

    @GetMapping
    public BaseApi<?> getExistingQuestion(@RequestParam Map<String, String> params) {
        Page<Question> page = questionService.existingQuestion(params);
        PageDTO pageDTO = PageMapper.INSTANCE.toDTO(page);
        pageDTO.setList(page.get().map(QuestionMappStruct.INSTANCE::toDtoResponse).toList());

        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("Existing questions retrieved successfully.")
                .timeStamp(LocalDateTime.now())
                .data(pageDTO)
                .status(true)
                .build();
    }
 }
