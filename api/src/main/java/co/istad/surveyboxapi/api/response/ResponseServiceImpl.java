package co.istad.surveyboxapi.api.response;

import co.istad.surveyboxapi.api.response.web.ResponseSurveyDto;
import co.istad.surveyboxapi.api.response.web.SurveySubmitDto;
import co.istad.surveyboxapi.api.survey.Survey;
import co.istad.surveyboxapi.api.survey.SurveyMybatisMapper;
import co.istad.surveyboxapi.api.survey.web.SurveyResponse;
import co.istad.surveyboxapi.api.user.User;
import co.istad.surveyboxapi.api.user.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class ResponseServiceImpl implements ResponseService{
    private final SurveyMybatisMapper surveyMybatisMapper;
    private final ResponseMapper responseMapper;
    private final UserRepository userRepository;
    @Override
    public List<Response> findAll() {
        return null;
    }

    @Override
    public SurveyResponse save(Long surveyId, SurveySubmitDto surveySubmitDto) {
        User user = new User();
        Survey survey = surveyMybatisMapper.findSurveyId(surveyId).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found"));
        if (surveySubmitDto.userId()!=null){
            user = userRepository.findById(surveySubmitDto.userId()).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found"));
        }
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            String json = objectMapper.writeValueAsString(surveySubmitDto.answers());
            Response response = new Response(null,user,survey,json,LocalDateTime.now(), surveySubmitDto.email(), surveySubmitDto.username());
            responseMapper.insertResponse(response);
            return surveyMybatisMapper.findSurveyById(surveyId).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND, "Not found"));
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JSON format");
        }
    }

    @Override
    public PageInfo<ResponseSurveyDto> getResponseById(Long id,int page, int limit) {
        return PageHelper.startPage(page, limit)
                .doSelectPageInfo(() -> responseMapper.getBySurveyId(id));
    }
}
