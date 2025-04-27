package co.istad.surveyboxapi.api.dashboard.survey.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class SurveyResponseDTO {

    private String month;
    private Long total;

    public SurveyResponseDTO(String month, Long numberOfResponse) {
        this.month = month;
        this.total = numberOfResponse;
    }

}