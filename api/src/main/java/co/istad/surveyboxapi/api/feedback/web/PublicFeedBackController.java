package co.istad.surveyboxapi.api.feedback.web;

import co.istad.surveyboxapi.api.feedback.FeedbackService;
import co.istad.surveyboxapi.base.BaseApi;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/public-feedbacks")
@RequiredArgsConstructor
public class PublicFeedBackController {
    private final FeedbackService feedbackService;


    @GetMapping
    public BaseApi<?> getTop6FeedBack(){
     List<FeedbackDto1> feedbackDtos= feedbackService.findHighestRatedFeedbacks();
        return BaseApi.builder()
                .data(feedbackDtos)
                .timeStamp(LocalDateTime.now())
                .status(true)
                .code(HttpStatus.OK.value())
                .message("you have been successfully")
                .build();

    }
}
