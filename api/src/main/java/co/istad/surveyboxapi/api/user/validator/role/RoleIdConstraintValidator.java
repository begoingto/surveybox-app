package co.istad.surveyboxapi.api.user.validator.role;

import co.istad.surveyboxapi.api.user.UserMapper;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
public class RoleIdConstraintValidator implements ConstraintValidator<RoleIdConstraint, List<Long>> {
    private final UserMapper userMapper;
    @Override
    public boolean isValid(List<Long> roleIds, ConstraintValidatorContext context) {
        Set<Long> UniqueId = new HashSet<>(roleIds);
        for (Long id: UniqueId){
            if (!userMapper.checkRoleId(id)) return false;
        }

        return true;
    }
}
