package co.istad.surveyboxapi.api.feedback.web;

import co.istad.surveyboxapi.api.survey.web.CreatedByDto;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDateTime;
@Data
public class FeedbackDto{
        @NotBlank
        String description;
        @NotNull(message = "you can rating start with 1->5 only")
        @Min(1)
        @Max(5)
        Integer rating;
        CreatedByDto user;
        LocalDateTime createdAt;

}
