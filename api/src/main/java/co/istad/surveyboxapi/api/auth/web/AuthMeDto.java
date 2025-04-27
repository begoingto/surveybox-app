package co.istad.surveyboxapi.api.auth.web;

import co.istad.surveyboxapi.api.auth.Role;
import co.istad.surveyboxapi.api.user.SocialMedias;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;

@Builder
public record AuthMeDto (
        Long id,
        String firstName,
        String lastName,
        String gender,
        String email,
        String phone,
        LocalDate dob,
        String address,
        String company,
        String position,
        String avatar,
        ArrayList<Role> roles,
        HashMap<String,Object> socialMedias,
        Boolean firstLogin
){
}
