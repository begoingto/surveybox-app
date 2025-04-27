package co.istad.surveyboxapi.api.feedback.web;

import co.istad.surveyboxapi.api.feedback.Feedback;
import co.istad.surveyboxapi.api.feedback.FeedbackMapper;
import co.istad.surveyboxapi.api.feedback.FeedbackService;
import co.istad.surveyboxapi.base.BaseApi;
import co.istad.surveyboxapi.util.PageMapper;
import co.istad.surveyboxapi.util.dto.PageDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/feedbacks")
@RequiredArgsConstructor
public class FeedbackController {
    private final FeedbackService feedbackService;
    @PostMapping
    public BaseApi<?> CreateFeedback(@RequestBody @Valid FeedbackDto feedbackDto){
       FeedbackDto feedbackDto2= feedbackService.createFeedback(feedbackDto);
        return BaseApi.builder()
                .data(feedbackDto2)
                .timeStamp(LocalDateTime.now())
                .status(true)
                .code(HttpStatus.OK.value())
                .message("Feedback submitted successfully.")
                .build();
    }

    @GetMapping
    public BaseApi<?> findAllFeedbackByUser(@RequestParam  Map<String,String>params){
        Page<Feedback>feedbackDtos= feedbackService.getAllFeedback(params);
        PageDTO pageDTO= PageMapper.INSTANCE.toDTO(feedbackDtos);
        pageDTO.setList(feedbackDtos.get().map(FeedbackMapper.INSTANCE::toDto).toList());
        return BaseApi.builder()
                .data(pageDTO)
                .timeStamp(LocalDateTime.now())
                .status(true)
                .code(HttpStatus.OK.value())
                .message("Feedback for the user retrieved successfully.")
                .build();

    }
}
