package co.istad.surveyboxapi.api.auth.web;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public record PersonalInfo(
    @NotBlank
    @Email
    String email,
    String phone,

    @JsonFormat(pattern = "yyyy-MM-dd")
    LocalDate dob,
    String address,
    String company,
    String position,
    String avatar
) {
}
