package co.istad.surveyboxapi.api.file.web;

import lombok.Builder;

@Builder
public record FileDto(
        String extension,
        String name,
        Long size,
        String url,
        String downloadUrl
) {
}
