package co.istad.surveyboxapi.api.auth.web;

import co.istad.surveyboxapi.api.auth.Role;
import co.istad.surveyboxapi.api.user.GenderEnum;
import co.istad.surveyboxapi.api.user.SocialMedias;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;

@Builder
@Data
public class UpdateAuthMe {
    Long id;
    @NotBlank(message = "{cannot.be.blank}")
    String firstName;
    //@NotBlank(message = "{cannot.be.blank}")
    String lastName;
    @NotNull(message = "The field gender is required.")
    @Enumerated(EnumType.STRING)
    GenderEnum gender;
    @NotBlank(message = "The field email is required.")
    @Email
    @Size(max = 254)
    String email;
    //@Pattern(regexp = "^(\\+855|0)\\d{8,9}$", message = "{user.phone}")
    String phone;
    @Past(message = "{error.invalid.date.format}")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    LocalDate dob;
    String address;
    String company;
    String position;
    String avatar;
    ArrayList<Role> roles;
    HashMap<String,Object> socialMedias;
    public String getSocialMedias() {
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.writeValueAsString(socialMedias);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }
}
