package co.istad.surveyboxapi.api.user.validator.active;

import co.istad.surveyboxapi.api.user.UserMapper;
import co.istad.surveyboxapi.api.user.validator.role.RoleIdConstraint;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.AllArgsConstructor;

@AllArgsConstructor
public class ActiveConstraintValidator implements ConstraintValidator<ActiveConstraint, String> {
    private final UserMapper userMapper;
    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return userMapper.checkUserActive(email);
    }
}
