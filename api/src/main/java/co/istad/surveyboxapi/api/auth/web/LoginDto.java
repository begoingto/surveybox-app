package co.istad.surveyboxapi.api.auth.web;

import co.istad.surveyboxapi.api.user.validator.active.ActiveConstraint;
import co.istad.surveyboxapi.api.user.validator.password.Password;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record LoginDto(
        @NotBlank
//        @ActiveConstraint
        @Email
        String email,

        @NotBlank
        @Password
        String password,

        UserAuthGoogleDto user
) {
}
