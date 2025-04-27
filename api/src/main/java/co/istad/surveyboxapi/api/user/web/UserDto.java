package co.istad.surveyboxapi.api.user.web;

import co.istad.surveyboxapi.api.user.SocialMedias;
import co.istad.surveyboxapi.api.user.validator.email.EmailUnique;
import jakarta.validation.constraints.*;
import lombok.Builder;
import org.hibernate.mapping.Map;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;

@Builder
public record UserDto(
        @NotBlank(message = "{cannot.be.blank}")
        String firstName,
        @NotBlank(message = "{cannot.be.blank}")
        String lastName,

        @NotBlank(message = "{cannot.be.blank}")
        String gender,

        @NotBlank(message = "The field email is required.")
        @EmailUnique
        @Email
        @Size(max = 254)
        String email,
        boolean isActive,

        @Pattern(regexp="^(\\+855|0)\\d{8,9}$",message = "{user.phone}")
        String phone,
        String avatar,
        @Past(message = "{error.invalid.date.format}")
        @DateTimeFormat(pattern = "yyyy-MM-dd")
        LocalDate dob,
        String address,
        String company,
        String position,
        String socialMedias,
        String password
//        List<Long> roleIds
) {
}
