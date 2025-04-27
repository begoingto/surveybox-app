package co.istad.surveyboxapi.api.dashboard.survey.dto;

import lombok.Builder;

import java.util.ArrayList;
import java.util.List;

@Builder
public record MonthlyDto(
        List<MonthlyTotalDto> vote,
        List<MonthlyTotalDto> survey
) {
}
