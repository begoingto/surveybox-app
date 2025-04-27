package co.istad.surveyboxapi.api.survey.web;

import co.istad.surveyboxapi.api.user.User;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import java.util.ArrayList;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Slf4j
@JsonInclude(JsonInclude.Include.NON_NULL)
public class SurveyResponseAnswersDto {
    private Long id;
    private CreatedByDto user;
    private Long surveyId;
    private String username;
    private String email;
    private ArrayList<QuestionSurveyDto> answer;
}
