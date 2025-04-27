package co.istad.surveyboxapi.api.theme.web;

import co.istad.surveyboxapi.api.survey.web.CreatedByDto;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

import java.time.LocalDateTime;


@Data
public class ThemeDto {
     Long id;
     JsonNode theme;
    @NotBlank(message = "name must be not null")
    String name;
    CreatedByDto createdBy;
    LocalDateTime dateCreated;
    LocalDateTime updatedAt;
    public ThemeDto() {

    }
    public ThemeDto(Long themeId, String name, JsonNode themeJsonNode, CreatedByDto createdByDto, LocalDateTime updatedAt,LocalDateTime createdAt) {
        this.id = themeId;
        this.theme = themeJsonNode;
        this.name = name;
        this.createdBy = createdByDto;
        this.dateCreated=createdAt;
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
