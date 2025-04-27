package co.istad.surveyboxapi.api.survey;

import co.istad.surveyboxapi.api.survey.web.FilterDto;
import co.istad.surveyboxapi.api.survey.web.SurveyDto;
import co.istad.surveyboxapi.api.survey.web.SurveyQuestionDto;
import co.istad.surveyboxapi.api.survey.web.SurveyResponse;
import com.github.pagehelper.PageInfo;

import java.io.IOException;

public interface SurveyService {
    SurveyResponse insertSpecificColumn(Survey survey) throws IOException;

    PageInfo<SurveyResponse> findAll(Integer page, Integer limit, FilterDto filterDto);

    SurveyResponse findById(Long id);

    void deleteById(Long id);

    SurveyResponse createSurveyQuestion(Long id, SurveyQuestionDto surveyQuestionDto);

    SurveyResponse updateInfoSurvey(Long id, SurveyDto surveyDto);
    void updateStatus(Long id, Boolean flippedStatus);
    SurveyResponse findByUuid(String uuid);

}
