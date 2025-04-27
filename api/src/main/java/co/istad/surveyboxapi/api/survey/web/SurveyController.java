package co.istad.surveyboxapi.api.survey.web;

import co.istad.surveyboxapi.api.survey.Survey;
import co.istad.surveyboxapi.api.survey.SurveyMapper;
import co.istad.surveyboxapi.api.survey.SurveyOptionEnum;
import co.istad.surveyboxapi.api.survey.SurveyService;
import co.istad.surveyboxapi.base.BaseApi;
import com.github.pagehelper.PageInfo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/surveys")
@Slf4j
public class SurveyController {
    private final SurveyService surveyService;

    @PostMapping
    public BaseApi<?> createSurvey(@RequestBody @Valid SurveyDto surveyDto) throws IOException {
        Survey survey = SurveyMapper.INSTANCE.toEntity(surveyDto);
        SurveyResponse surveyResponse = surveyService.insertSpecificColumn(survey);
        return BaseApi.builder()
                .data(surveyResponse)
                .code(HttpStatus.OK.value())
                .message("you have been successfully")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    @GetMapping
    public BaseApi<?> findAll(
            @RequestParam(name = "page", required = false, defaultValue = "1") int page,
            @RequestParam(name = "limit", required = false, defaultValue = "15") int limit,
            @RequestParam(name = "title",required = false, defaultValue = "") String title,
            @RequestParam(name = "status",required = false, defaultValue = "") Boolean status,
            @RequestParam(name = "surveyOption",required = false, defaultValue = "") SurveyOptionEnum surveyOption,
            @RequestParam(name = "createdBy",required = false, defaultValue = "") Long createdBy,
            @RequestParam(name = "sortBy",required = false, defaultValue = "") String sortBy,
            @RequestParam(name = "sortDirection",required = false, defaultValue = "") String sortDirection
    ) {

        PageInfo<SurveyResponse> surveys = surveyService.findAll(
                page,
                limit,
                new FilterDto(
                        title,
                        status,
                        surveyOption,
                        createdBy,
                        sortBy,
                        sortDirection
                ));
        return BaseApi.builder()
                .data(surveys)
                .code(HttpStatus.OK.value())
                .message("you have been successfully")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    @GetMapping("{id}")
    public BaseApi<?> findById(@PathVariable("id") Long id) {

        return BaseApi.builder()
                .data(surveyService.findById(id))
                .code(HttpStatus.OK.value())
                .message("you have been successfully")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }
    @GetMapping("uuid/{uuid}")
    public BaseApi<?> findByUuid(@PathVariable("uuid") String uuid) {

        return BaseApi.builder()
                .data(surveyService.findByUuid(uuid))
                .code(HttpStatus.OK.value())
                .message("you have been successfully")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    @DeleteMapping("{id}")
    public BaseApi<?> deleteById(@PathVariable("id") Long id) {
        surveyService.deleteById(id);
        Map<String, Object> response = new HashMap<>() {{
            put("id", id);
        }};
        return BaseApi.builder()
                .data(response)
                .code(HttpStatus.OK.value())
                .message("Survey with ID " + id + " deleted successfully. Any associated data has been removed.")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }


    @PutMapping("{id}/survey-question")
    public BaseApi<?> surveyQuestion(@PathVariable Long id, @RequestBody @Valid SurveyQuestionDto surveyQuestionDto) {
        SurveyResponse surveyResponse = surveyService.createSurveyQuestion(id, surveyQuestionDto);
        return BaseApi.builder()
                .data(surveyResponse)
                .code(HttpStatus.OK.value())
                .message("you have been created survey questions successfully")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    @PutMapping("{id}")
    public BaseApi<?> updateInfoSurvey(@PathVariable Long id, @RequestBody @Valid SurveyDto surveyDto) {
        SurveyResponse surveyResponse = surveyService.updateInfoSurvey(id, surveyDto);
        return BaseApi.builder()
                .data(surveyResponse)
                .code(HttpStatus.OK.value())
                .message("you have been updated survey successfully")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    @PutMapping("/{id}/flipStatus")
    public BaseApi<?> flipStatus(@PathVariable Long id,@RequestBody SurveyStatus surveyStatus) {
      surveyService.updateStatus(id, surveyStatus.status()); // Set the desired flippedStatus value (e.g., true)
        return BaseApi.builder()
                .data(id)
                .code(HttpStatus.OK.value())
                .message("you have been updated survey successfully")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }
}