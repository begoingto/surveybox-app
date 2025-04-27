package co.istad.surveyboxapi.api.survey;

import co.istad.surveyboxapi.api.auth.Role;
import co.istad.surveyboxapi.api.auth.web.AuthMeDto;
import co.istad.surveyboxapi.api.survey.web.FilterDto;
import co.istad.surveyboxapi.api.survey.web.SurveyDto;
import co.istad.surveyboxapi.api.survey.web.SurveyQuestionDto;
import co.istad.surveyboxapi.api.survey.web.SurveyResponse;
import co.istad.surveyboxapi.exception.ResourceNotFoundException;
import co.istad.surveyboxapi.exception.ResourceNotFoundExceptionUuid;
import co.istad.surveyboxapi.security.currentuser.IAuthenticationFacade;
import co.istad.surveyboxapi.util.QRCodeGenerator;
import co.istad.surveyboxapi.util.ThumbnailUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.zxing.WriterException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class SurveyServiceImpl implements SurveyService{
    private final SurveyRepository surveyRepository;
    private final QRCodeGenerator qrCodeGenerator;
    private final SurveyMybatisMapper surveyMybatisMapper;
    private final IAuthenticationFacade iAuthenticationFacade;
   private final ThumbnailUtil thumbnailUtil;

    @Override
    public SurveyResponse insertSpecificColumn(Survey survey) throws IOException {
        LocalDateTime currentDateTime = LocalDateTime.now();
        UUID uuid = UUID.randomUUID();
        survey.setUuid(uuid.toString());
        try {
            String qrCode = qrCodeGenerator.generateQRCode(survey.getUuid());
            survey.setQrCode(qrCode);
            // String titleForThumbnail = thumbnailUtil.createThumbnailImage(survey.getTitle());
            // survey.setTitle(titleForThumbnail);
        } catch (WriterException | IOException e) {
            throw new RuntimeException(e);
        }
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        survey.setCreatedBy(authMeDto.id());
        survey.setDateCreated(currentDateTime);
        surveyMybatisMapper.insertSurvey(survey);
        return this.findById(survey.getId());
    }

    @Override
    public PageInfo<SurveyResponse> findAll(Integer page, Integer limit, FilterDto filterDto) {
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        var roles = authMeDto.roles().stream().map(Role::getName).toList();

        return PageHelper.startPage(page, limit)
                .doSelectPageInfo(() -> {
                    if (roles.contains("ADMIN")){
                        surveyMybatisMapper.select(filterDto);
                    }else{
                        surveyMybatisMapper.selectByUser(authMeDto.id(),filterDto);
                    }
                });
    }

    @Override
    public SurveyResponse findById(Long id) {
        return surveyMybatisMapper.findSurveyById(id).orElseThrow(() -> new ResourceNotFoundException("Survey", id));
    }

    @Override
    public void deleteById(Long id) {
        SurveyResponse surveyResponse = this.findById(id);
        surveyRepository.deleteById(surveyResponse.getId());
    }

    @Override
    public SurveyResponse createSurveyQuestion(Long id, SurveyQuestionDto surveyQuestion) {
        ObjectMapper objectMapper = new ObjectMapper();
        // Convert the object to JSON.
        try {
            String json = objectMapper.writeValueAsString(surveyQuestion.questions());
            SurveyResponse surveyResponse= this.findById(id);
            surveyResponse.setSurveyQuestions(surveyQuestion.questions());
            if (!surveyResponse.getAnswers().isEmpty()){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Survey is already answered");
            }
            surveyMybatisMapper.insertSurveyQuestion(id,json);
            return surveyResponse;
        } catch (JsonProcessingException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid JSON format");
        }
    }

    @Override
    public SurveyResponse updateInfoSurvey(Long id, SurveyDto surveyDto) {
        SurveyResponse surveyResponse = this.findById(id);
        surveyMybatisMapper.updateInfoSurvey(id,surveyDto);
        return this.findById(id);
    }

    @Override
    public void updateStatus(Long id, Boolean flippedStatus) {

        Survey survey = surveyMybatisMapper.findSurveyId(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Survey not found."));


        // Update the survey status
        survey.setStatus(flippedStatus);

        // Save the updated survey
        surveyMybatisMapper.updateStatus(id,flippedStatus);
    }

    @Override
    public SurveyResponse findByUuid(String uuid) {
        return surveyMybatisMapper.findSurveyByUuid(uuid)
                .orElseThrow(() -> new ResourceNotFoundExceptionUuid("Survey", uuid));
    }


}
