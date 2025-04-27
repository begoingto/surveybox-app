package co.istad.surveyboxapi.api.user.web;

import co.istad.surveyboxapi.api.auth.Role;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetUserDto{
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String socialMedias;
    private String gender;
    private String phone;
    private String address;
    private String company;
    private String position;
    private LocalDateTime createdAt;
    private String avatar;
    private Boolean isActive;
    private ArrayList<Role> roles;

    public HashMap getSocialMedias() {
        if (socialMedias==null || socialMedias.isEmpty()) return null;
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(socialMedias, HashMap.class);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }
}
