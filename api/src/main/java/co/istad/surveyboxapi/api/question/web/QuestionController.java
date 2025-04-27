package co.istad.surveyboxapi.api.question.web;

import co.istad.surveyboxapi.api.question.Question;
import co.istad.surveyboxapi.api.question.QuestionMappStruct;
import co.istad.surveyboxapi.api.question.QuestionService;
import co.istad.surveyboxapi.api.user.web.GetUserDto;
import co.istad.surveyboxapi.base.BaseApi;
import co.istad.surveyboxapi.exception.ApiExceptionResponseMessage;
import co.istad.surveyboxapi.util.PageMapper;
import co.istad.surveyboxapi.util.dto.PageDTO;
import com.github.pagehelper.PageInfo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/questions")
@Slf4j
public class QuestionController {
    private final QuestionService questionService;
    private final QuestionMappStruct questionMappStruct;

    @PostMapping
    public BaseApi<?> createQuestion(@RequestBody @Valid QuestionDto questionDto) {
        QuestionDto createdQuestionDto = questionService.create(questionDto);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("every thing is ok")
                .timeStamp(LocalDateTime.now())
                .data(createdQuestionDto)
                .status(true)
                .build();
    }

    @GetMapping("question/{id}")
    public BaseApi<?> getQuestionByContainCategoryObject(@PathVariable("id") Long id) {
        DataDisplayQuestionDto question = questionService.displayQuestionContainById(id);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("every thing is ok")
                .timeStamp(LocalDateTime.now())
                .data(question)
                .status(true)
                .build();
    }

    @PutMapping("/{id}")
    public BaseApi<?> update(@PathVariable("id") Long id, @RequestBody @Valid QuestionDto questionDto) {
        questionDto.setId(id);
        QuestionDto questionDto1 = questionService.update(id, questionDto);

        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("every thing is ok")
                .timeStamp(LocalDateTime.now())
                .data(questionDto1)
                .status(true)
                .build();

    }

    @GetMapping("{id}")
    public BaseApi<?> getQuestionById(@PathVariable("id") Long id) throws ApiExceptionResponseMessage {
        Question question = questionService.getQuestionById(id);
        QuestionDto questionDto = questionMappStruct.toDto(question);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("every thing is ok")
                .timeStamp(LocalDateTime.now())
                .data(questionDto)
                .status(true)
                .build();
    }

    @DeleteMapping("/{id}")
    public BaseApi<Object> deleteAnswerSet(@PathVariable("id") Long answerSetId) throws ApiExceptionResponseMessage {
        Map<String, Object> map = questionService.deleteQuestion(answerSetId);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("qeustion is delete successfully")
                .timeStamp(LocalDateTime.now())
                .data(map)
                .status(true)
                .build();
    }

    @GetMapping
    public BaseApi<?> getListQuestion(@RequestParam Map<String, String> params) {
        Page<Question> page = questionService.getQuestion(params);
        PageDTO pageDTO = PageMapper.INSTANCE.toDTO(page);
        pageDTO.setList(page.get().map(QuestionMappStruct.INSTANCE::toDtoResponse).toList());

        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("every thing is ok")
                .timeStamp(LocalDateTime.now())
                .data(pageDTO)
                .status(true)
                .build();
    }

    @GetMapping("/v2")
    public BaseApi<?> findAll(
            @RequestParam(name = "page",required = false,defaultValue = "1") int page,
            @RequestParam(name = "limit",required = false,defaultValue = "15") int limit,
            @RequestParam(name = "name",required = false, defaultValue = "") String name,
            @RequestParam(name = "category",required = false, defaultValue = "") Long categoryId,
//            @RequestParam(name = "required",required = false, defaultValue = "") Boolean required,
            @RequestParam(name = "questionType",required = false, defaultValue = "") String questionType,
            @RequestParam(name = "createdBy",required = false, defaultValue = "") Long createdBy,
            @RequestParam(name = "sortBy",required = false, defaultValue = "") String sortBy,
            @RequestParam(name = "sortDirection",required = false, defaultValue = "") String sortDirection) {
        QuestionFilters filters = QuestionFilters.builder()
                .name(name)
//                .required(required)
                .categoryId(categoryId)
                .questionType(questionType)
                .createdBy(createdBy)
                .sortBy(sortBy)
                .sortDirection(sortDirection)
                .build();
        PageInfo<QuestionDto> findAll = questionService.findAll(page,limit,filters);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("every thing is ok")
                .timeStamp(LocalDateTime.now())
                .data(findAll)
                .status(true)
                .build();
    }
}
