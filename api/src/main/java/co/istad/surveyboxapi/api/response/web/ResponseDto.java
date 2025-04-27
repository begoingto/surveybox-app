package co.istad.surveyboxapi.api.response.web;

import co.istad.surveyboxapi.api.survey.Survey;
import co.istad.surveyboxapi.api.survey.web.SurveyResponse;
import co.istad.surveyboxapi.api.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResponseDto {
    private Long id;
    private User user;
    private Survey survey;
    private String answer;
    private LocalDateTime createdAt;
}
