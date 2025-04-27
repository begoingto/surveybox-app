
package co.istad.surveyboxapi.api.theme.web;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

@Data
public class CreateThemeRequest {
    private Long id;

    private String name;
    private JsonNode theme;
    private Long userId;

    // Constructors, getters, and setters...

}