package co.istad.surveyboxapi.api.survey.web;

import co.istad.surveyboxapi.api.survey.SurveyOptionEnum;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class FilterDto {
    private String title;
    private Boolean status;
    private SurveyOptionEnum surveyOption;
    private Long createdBy;
    private String sortBy;
    private String sortDirection;
}
