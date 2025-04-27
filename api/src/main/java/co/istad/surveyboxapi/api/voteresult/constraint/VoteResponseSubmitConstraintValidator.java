package co.istad.surveyboxapi.api.voteresult.constraint;

import co.istad.surveyboxapi.api.response.constrant.SurveyResponseSubmitConstraint;
import co.istad.surveyboxapi.api.survey.SurveyMybatisMapper;
import co.istad.surveyboxapi.api.survey.web.SurveyResponse;
import co.istad.surveyboxapi.api.user.UserMapper;
import co.istad.surveyboxapi.api.vote.Vote;
import co.istad.surveyboxapi.api.vote.VoteRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanWrapperImpl;

import java.time.LocalDate;

@Slf4j
@RequiredArgsConstructor
public class VoteResponseSubmitConstraintValidator implements ConstraintValidator<VoteResponseSubmitConstraint,Object> {
    private final VoteRepository surveyMybatisMapper;
    private final UserMapper userMapper;

    private String voteId;
    private String userId;

    private String username;

    private String email;
    private String message;

    @Override
    public void initialize(VoteResponseSubmitConstraint constraintAnnotation) {
        this.voteId = constraintAnnotation.surveyId();
        this.userId = constraintAnnotation.userId();
        this.username = constraintAnnotation.username();
        this.email = constraintAnnotation.email();
        this.message = constraintAnnotation.message();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        Object surveyIdVal = new BeanWrapperImpl(value).getPropertyValue(this.voteId);
        Object nameVal = new BeanWrapperImpl(value).getPropertyValue(this.username);
        Object emailVal = new BeanWrapperImpl(value).getPropertyValue(this.email);
    //    Object userIdVal = new BeanWrapperImpl(value).getPropertyValue(this.userId);

        if (surveyIdVal != null){
            Vote vote = surveyMybatisMapper.findById(Long.parseLong(surveyIdVal.toString()))
                    .orElse(null);
            if (vote == null){
                context.disableDefaultConstraintViolation();
                context.buildConstraintViolationWithTemplate("The voteId field is required.")
                        .addPropertyNode(this.voteId)
                        .addConstraintViolation();
                return false;
//            }else {
//                 if (!surveyMybatisMapper.findById(Long.parseLong(surveyIdVal.toString()))){
//                        context.disableDefaultConstraintViolation();
//                        context.buildConstraintViolationWithTemplate("The surveyId field is not valid.")
//                                .addPropertyNode(this.surveyId)
//                                .addConstraintViolation();
//                        return false;
//                 }
            }

//            if (!survey.getStatus()){
//                context.disableDefaultConstraintViolation();
//                context.buildConstraintViolationWithTemplate("The survey is closed.")
//                        .addPropertyNode(this.surveyId)
//                        .addConstraintViolation();
//                return false;
//            }

//            LocalDate now = LocalDate.now();
//            if (survey.getEndDate().isBefore(now)){
//                context.disableDefaultConstraintViolation();
//                context.buildConstraintViolationWithTemplate("The survey is not expired.")
//                        .addPropertyNode(this.surveyId)
//                        .addConstraintViolation();
//                return false;
//            }


            switch (vote.getVoteOption()){
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
              //  }
//                case REGISTER -> {
//                    if(userIdVal == null){
//                        context.disableDefaultConstraintViolation();
//                        context.buildConstraintViolationWithTemplate("The survey option is REGISTER required userId.")
//                                .addPropertyNode(this.userId)
//                                .addConstraintViolation();
//                        return false;
//                   else {
//                        if (!userMapper.checkUserId(Long.parseLong(userIdVal.toString()))){
//                            context.disableDefaultConstraintViolation();
//                            context.buildConstraintViolationWithTemplate("The userId field is not valid.")
//                                    .addPropertyNode(this.userId)
//                                    .addConstraintViolation();
//                            return false;
//                        }
                 //   }
                }
            }

        }
        return true;
    }
}
