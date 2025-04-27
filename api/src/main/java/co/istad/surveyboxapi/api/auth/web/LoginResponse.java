package co.istad.surveyboxapi.api.auth.web;

import co.istad.surveyboxapi.api.user.User;
import lombok.Builder;


@Builder
public record LoginResponse(
        String tokenType,
        String accessToken,
        String refreshToken,
        AuthMeDto authMeDto
) {
}
