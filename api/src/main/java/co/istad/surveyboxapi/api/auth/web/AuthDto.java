package co.istad.surveyboxapi.api.auth.web;

import jakarta.validation.constraints.NotBlank;
import lombok.Builder;

@Builder
public record AuthDto(
        @NotBlank
        String accessToken,
        @NotBlank
        String refreshToken
) {
}
