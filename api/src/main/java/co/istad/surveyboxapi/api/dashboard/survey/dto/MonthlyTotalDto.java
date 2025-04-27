package co.istad.surveyboxapi.api.dashboard.survey.dto;

import lombok.Builder;

@Builder
public record MonthlyTotalDto(
        Object month,
        Object total

) {
}
