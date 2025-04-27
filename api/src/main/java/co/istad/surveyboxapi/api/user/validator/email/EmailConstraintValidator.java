package co.istad.surveyboxapi.api.user.validator.email;

import co.istad.surveyboxapi.api.user.UserRepository;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class EmailConstraintValidator implements ConstraintValidator<EmailUnique,String> {
    private final UserRepository userRepository;
    @Override
    public boolean isValid(String email, ConstraintValidatorContext context) {
        return !userRepository.existsByEmail(email);
    }
}
