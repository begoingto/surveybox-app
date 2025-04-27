package co.istad.surveyboxapi.api.voteresult.validator;

import co.istad.surveyboxapi.api.user.UserService;
import co.istad.surveyboxapi.api.voteresult.VoteResultService;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.factory.annotation.Autowired;

public class UserIdValidator implements ConstraintValidator<ValidUserId, Long> {
    @Autowired
    private UserService userService;
    private VoteResultService voteResultService;

    @Override
    public void initialize(ValidUserId constraintAnnotation) {
    }

    @Override
    public boolean isValid(Long userId, ConstraintValidatorContext context) {
        return userId == null || userService.isValidUser(userId);
    }
}