package co.istad.surveyboxapi.api.category.web;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Data
public class CategoryDtoReponse {
    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime dateCreated;
    Long id;
    Boolean status;
    @NotBlank(message = "{cannot.be.blank}")
    String name;
}
