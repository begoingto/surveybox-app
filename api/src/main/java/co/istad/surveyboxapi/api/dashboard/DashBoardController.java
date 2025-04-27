package co.istad.surveyboxapi.api.dashboard;

import co.istad.surveyboxapi.api.auth.Role;
import co.istad.surveyboxapi.api.auth.web.AuthMeDto;
import co.istad.surveyboxapi.api.dashboard.survey.SurveyResponseService;
import co.istad.surveyboxapi.api.dashboard.survey.dto.MonthlyDto;
import co.istad.surveyboxapi.api.question.QuestionService;
import co.istad.surveyboxapi.base.BaseApi;
import co.istad.surveyboxapi.security.currentuser.AuthenticationFacade;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
public class DashBoardController {
    private final QuestionService questionService;
    private final SurveyResponseService responseService;
    private final AuthenticationFacade authenticationFacade;

    @GetMapping
    public BaseApi<?> countQuestionUserAndSurvey() {
        Map<String, Object> mapResponseEntity = questionService.countQuestions();
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("every thing is ok")
                .timeStamp(LocalDateTime.now())
                .data(mapResponseEntity)
                .status(true)
                .build();
    }

    @GetMapping("/graphs")
    public BaseApi<?> getSurveyResponsesByCurrentUser() {
        AuthMeDto authMeDto = authenticationFacade.getAuthMeDto();
        Long userId = authMeDto.id();

        MonthlyDto monthlyDto = responseService.getSurveyResponsesByUserId(userId);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("every thing is ok")
                .timeStamp(LocalDateTime.now())
                .data(monthlyDto)
                .status(true)
                .build();
    }

    @GetMapping("/graphs/admins")
    public BaseApi<?> getSurveyResponsesByAdmin() {
        AuthMeDto authMeDto = authenticationFacade.getAuthMeDto();
        var roles = authMeDto.roles().stream().map(Role::getName).toList();
        if (roles.contains("ADMIN")) {
            MonthlyDto monthlyDto = responseService.getSurveyResponsesByUserAdmin();
            return BaseApi.builder()
                    .code(HttpStatus.OK.value())
                    .message("Everything is ok")
                    .timeStamp(LocalDateTime.now())
                    .data(monthlyDto)
                    .status(true)
                    .build();
        } else {
            // Handle unauthorized access
            return BaseApi.builder()
                    .code(HttpStatus.UNAUTHORIZED.value())
                    .message("Unauthorized access")
                    .timeStamp(LocalDateTime.now())
                    .status(false)
                    .build();
        }
    }
}