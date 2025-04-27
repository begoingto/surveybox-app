package co.istad.surveyboxapi.api.response;

import co.istad.surveyboxapi.api.response.web.ResponseSurveyDto;
import co.istad.surveyboxapi.api.response.web.SurveySubmitDto;
import co.istad.surveyboxapi.api.survey.web.SurveyResponse;
import com.github.pagehelper.PageInfo;

import java.util.List;

public interface ResponseService {
    List<Response> findAll();

    SurveyResponse save(Long surveyId, SurveySubmitDto surveySubmitDto);

    PageInfo<ResponseSurveyDto> getResponseById(Long id,int page, int limit);
}
