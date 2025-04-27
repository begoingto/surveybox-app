package co.istad.surveyboxapi.api.response.web;

import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record ResponseAnswerDto(
        Long id,
        Object user,
        Object survey,
        LocalDateTime createdAt,
        Object answer
) { }
