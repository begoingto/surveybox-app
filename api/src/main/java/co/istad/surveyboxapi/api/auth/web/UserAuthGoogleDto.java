package co.istad.surveyboxapi.api.auth.web;

import lombok.Builder;

@Builder
public record UserAuthGoogleDto(
        String firstName,
        String lastName,
        String email,
        Boolean isActive,
        Boolean isVerified,
        String avatar,
        String providerAccountId,
        String providerName
) {
}
