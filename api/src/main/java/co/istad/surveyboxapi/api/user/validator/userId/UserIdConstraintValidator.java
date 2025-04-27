package co.istad.surveyboxapi.api.user.validator.userId;

import co.istad.surveyboxapi.api.user.UserMapper;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class UserIdConstraintValidator implements ConstraintValidator<UserIdConstraint,Long> {
    private final UserMapper userMapper;
    @Override
    public boolean isValid(Long id, ConstraintValidatorContext context) {
        if (id == null) return true;
        return userMapper.checkUserId(id);
    }
}
