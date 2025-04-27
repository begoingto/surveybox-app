package co.istad.surveyboxapi.api.category.web;

import co.istad.surveyboxapi.api.category.Category;
import jakarta.persistence.Column;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Builder
public record CategoryDto(
        Long id,
        Boolean status,
        @NotBlank(message = "{cannot.be.blank}")
        String name
) {
        public CategoryDto(Category category) {
                this(category.getId(),category.getStatus(), category.getName());
        }

}
