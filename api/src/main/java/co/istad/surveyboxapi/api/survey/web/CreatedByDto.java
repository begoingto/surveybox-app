package co.istad.surveyboxapi.api.survey.web;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CreatedByDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
}
