package co.istad.surveyboxapi.api.response.constrant;

import co.istad.surveyboxapi.api.survey.SurveyMybatisMapper;
import co.istad.surveyboxapi.api.survey.web.SurveyResponse;
import co.istad.surveyboxapi.api.user.UserMapper;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanWrapperImpl;

import java.time.LocalDate;

@Slf4j
@RequiredArgsConstructor
public class SurveyResponseSubmitConstraintValidator implements ConstraintValidator<SurveyResponseSubmitConstraint,Object> {
    private final SurveyMybatisMapper surveyMybatisMapper;
    private final UserMapper userMapper;

    private String surveyId;
    private String userId;
    private String username;
    private String email;
    private String message;

    @Override
    public void initialize(SurveyResponseSubmitConstraint constraintAnnotation) {
        this.surveyId = constraintAnnotation.surveyId();
        this.userId = constraintAnnotation.userId();
        this.username = constraintAnnotation.username();
        this.email = constraintAnnotation.email();
        this.message = constraintAnnotation.message();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        Object surveyIdVal = new BeanWrapperImpl(value).getPropertyValue(this.surveyId);
        Object nameVal = new BeanWrapperImpl(value).getPropertyValue(this.username);
        Object emailVal = new BeanWrapperImpl(value).getPropertyValue(this.email);
        Object userIdVal = new BeanWrapperImpl(value).getPropertyValue(this.userId);

        if (surveyIdVal != null){
            SurveyResponse survey = surveyMybatisMapper.findSurveyById(Long.parseLong(surveyIdVal.toString()))
                    .orElse(null);
            if (survey == null){
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("The surveyId field is required.")
                        .addPropertyNode(this.surveyId)
                        .addConstraintViolation();
                return false;
            }else {
                 if (!surveyMybatisMapper.checkSurveyId(Long.parseLong(surveyIdVal.toString()))){
                        context.disableDefaultConstraintViolation();
                        context.buildConstraintViolationWithTemplate("The surveyId field is not valid.")
                                .addPropertyNode(this.surveyId)
                                .addConstraintViolation();
                        return false;
                 }
            }

            if (!survey.getStatus()){
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("The survey is closed.")
                        .addPropertyNode(this.surveyId)
                        .addConstraintViolation();
                return false;
            }

            LocalDate now = LocalDate.now();
            if (survey.getEndDate().isBefore(now)){
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("The survey is not expired.")
                        .addPropertyNode(this.surveyId)
                        .addConstraintViolation();
                return false;
            }


            switch (survey.getSurveyOption()){
                case REQUIRED -> {
                    if (nameVal == null || emailVal == null){
                        context.disableDefaultConstraintViolation();
                        context.buildConstraintViolationWithTemplate(this.message)
                                .addPropertyNode(this.username)
                                .addConstraintViolation();
                        context.buildConstraintViolationWithTemplate(this.message)
                                .addPropertyNode(this.email)
                                .addConstraintViolation();
                        return false;
                    }
                }
                case REGISTER -> {
                    if(userIdVal == null){
                        context.disableDefaultConstraintViolation();
                        context.buildConstraintViolationWithTemplate("The survey option is REGISTER required userId.")
                                .addPropertyNode(this.userId)
                                .addConstraintViolation();
                        return false;
                    }else {
                        if (!userMapper.checkUserId(Long.parseLong(userIdVal.toString()))){
                            context.disableDefaultConstraintViolation();
                            context.buildConstraintViolationWithTemplate("The userId field is not valid.")
                                    .addPropertyNode(this.userId)
                                    .addConstraintViolation();
                            return false;
                        }
                    }
                }
            }

        }
        return true;
    }
}
