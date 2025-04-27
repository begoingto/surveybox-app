package co.istad.surveyboxapi.api.auth;

import co.istad.surveyboxapi.api.auth.web.AuthMeDto;
import co.istad.surveyboxapi.api.auth.web.PersonalInfo;
import co.istad.surveyboxapi.api.auth.web.UpdateAuthMe;
import co.istad.surveyboxapi.api.auth.web.UserAuthGoogleDto;
import co.istad.surveyboxapi.api.user.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;

@Mapper(componentModel = "spring")
public interface AuthMapStruct {
    AuthMapStruct INSTANCE = Mappers.getMapper(AuthMapStruct.class);
    User personalInfoToUser(PersonalInfo personalInfo);

    @Mapping(source = "user.socialMedias",target = "socialMedias",qualifiedByName = "mapSocialMedias")
    AuthMeDto userToAuthMeDto(User user);

    @Named("mapSocialMedias")
    default HashMap mapSocialMedias(String socialMedias){
        if (socialMedias==null) return null;
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            return objectMapper.readValue(socialMedias, HashMap.class);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,e.getMessage());
        }
    }

    User userAuthGoogleDtoToUser(UserAuthGoogleDto userAuthGoogleDto);

    User updateUpAuthMeToUser(UpdateAuthMe updateAuthMe);
}
