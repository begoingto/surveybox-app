package co.istad.surveyboxapi.api.auth.web;

import jakarta.validation.constraints.NotBlank;

public record ForgotSendEmailDto(
        @NotBlank(message = "The field email is required.")
        String email
) {
}
