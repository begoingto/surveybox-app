package co.istad.surveyboxapi.api.survey.web;

import co.istad.surveyboxapi.api.survey.DisplayQuestionEnum;
import co.istad.surveyboxapi.api.survey.SurveyOptionEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;

import java.time.LocalDate;

@Builder
public record SurveyDto(
        @NotBlank
        String title,
        String description,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate startDate,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
        LocalDate endDate,
        @NotNull
        SurveyOptionEnum surveyOption,
        String cover,
        String msgWelcome,
        String msgSuccess,
        String qrCode,
        @NotNull
        DisplayQuestionEnum displayQuestion,
        String iconSuccess,
        String iconWelcome
) {
}
