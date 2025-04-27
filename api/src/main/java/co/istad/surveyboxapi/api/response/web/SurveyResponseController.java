package co.istad.surveyboxapi.api.response.web;


import co.istad.surveyboxapi.api.response.Response;
import co.istad.surveyboxapi.api.response.ResponseService;
import co.istad.surveyboxapi.api.survey.web.FilterDto;
import co.istad.surveyboxapi.api.survey.web.SurveyResponse;
import co.istad.surveyboxapi.base.BaseApi;
import com.github.pagehelper.PageInfo;
import jakarta.validation.Valid;
import jakarta.websocket.server.PathParam;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/responses")
public class SurveyResponseController {
    private final ResponseService responseService;

    @PostMapping("{id}")
    public BaseApi<?> surveyResponse(@PathVariable Long id, @RequestBody @Valid SurveySubmitDto surveySubmitDto) {
        SurveyResponse responseAnswerDto = responseService.save(id, surveySubmitDto);
        return BaseApi.builder()
                .data(responseAnswerDto)
                .code(HttpStatus.OK.value())
                .message("you have been answered successfully")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    //getsurveyResponseById  @PathVariable /survey/{id}
    @GetMapping("/survey/{id}")
    public BaseApi<?> getSurveyResponseById(@PathVariable("id") Long id,
                                            @RequestParam(name = "page", required = false, defaultValue = "1") int page,
                                            @RequestParam(name = "limit", required = false, defaultValue = "15") int limit) {
        PageInfo<ResponseSurveyDto> responses = responseService.getResponseById(id,page,limit);
        return BaseApi.builder()
                .data(responses)
                .code(HttpStatus.OK.value())
                .message("you have been successfully")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }
}
