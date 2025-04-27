package co.istad.surveyboxapi.api.auth.web;

import co.istad.surveyboxapi.api.user.validator.password.Password;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Builder;

@Builder
public record NewPassword(
        @NotBlank(message = "The field email is required.")
        @Email
        String email,
        @NotBlank(message = "The field password is required.")
        @Password
        @Size(min = 6, max = 20)
        String password,
        @NotBlank(message = "The field confirm_password is required.")
        @Password
        @Size(min = 6, max = 20)
        String confirmPassword
) {
}
