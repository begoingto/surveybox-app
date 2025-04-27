package co.istad.surveyboxapi.api.feedback.web;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class FeedbackDto1 {
        @NotBlank
        String description;
        @NotNull(message = "you can rating start with 1->5 only")
        @Min(1)
        @Max(5)
        Integer rating;
       // CreatedByDtoWithAvartar user;
        LocalDateTime createdAt;

       UserDto feedBackBy;

        public FeedbackDto1() {

        }
}
