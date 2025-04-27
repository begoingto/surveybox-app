package co.istad.surveyboxapi.api.auth.web;

import co.istad.surveyboxapi.api.user.validator.email.EmailUnique;
import co.istad.surveyboxapi.api.user.validator.password.Password;
import co.istad.surveyboxapi.api.user.validator.password.PasswordMatch;
import co.istad.surveyboxapi.api.user.validator.role.RoleIdConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Builder;

import java.util.List;

@Builder
@PasswordMatch
public record RegisterDto (

        @NotBlank(message = "The field username is required.")
        @Size(max = 254)
        String name,

        @NotBlank(message = "The field email is required.")
        @EmailUnique
        @Email
        @Size(max = 254)
        String email,
        @NotBlank(message = "The field password is required.")
        @Password
        @Size(min = 6, max = 20)
        String password,
        @NotBlank(message = "The field confirm_password is required.")
        @Password
        @Size(min = 6, max = 20)
        String confirmPassword,

        @NotBlank(message = "The field auth provider is required.")
        String authProvider

//        @NotNull(message = "The field roles is required.")
//        @RoleIdConstraint
//        List<Long> roleIds
){}
