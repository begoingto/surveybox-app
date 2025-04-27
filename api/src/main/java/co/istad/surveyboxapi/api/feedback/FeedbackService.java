package co.istad.surveyboxapi.api.feedback;

import co.istad.surveyboxapi.api.feedback.web.FeedbackDto;
import co.istad.surveyboxapi.api.feedback.web.FeedbackDto1;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;

public interface FeedbackService {
    FeedbackDto createFeedback(FeedbackDto feedbackDto);
    Page<Feedback>getAllFeedback(Map<String,String> params) ;
    List<FeedbackDto1>  findHighestRatedFeedbacks();



}
