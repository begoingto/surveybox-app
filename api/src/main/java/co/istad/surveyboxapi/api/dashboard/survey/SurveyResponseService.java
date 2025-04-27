package co.istad.surveyboxapi.api.dashboard.survey;

import co.istad.surveyboxapi.api.dashboard.survey.dto.MonthlyDto;

public interface SurveyResponseService {
    MonthlyDto getSurveyResponsesByUserId(Long userId);
    MonthlyDto getSurveyResponsesByUserAdmin();

}
