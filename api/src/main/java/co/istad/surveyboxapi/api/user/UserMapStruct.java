package co.istad.surveyboxapi.api.user;

import co.istad.surveyboxapi.api.auth.web.AuthMeDto;
import co.istad.surveyboxapi.api.auth.web.PersonalInfo;
import co.istad.surveyboxapi.api.auth.web.RegisterDto;
import co.istad.surveyboxapi.api.user.web.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;


@Mapper(componentModel = "spring")
public interface UserMapStruct {
    UserMapStruct INSTANCE = Mappers.getMapper(UserMapStruct.class);

    UserDto toDto(User accountProfile);
//    User toAuthMe(AuthMeDto authMeDto);

    User registerDtoToUser(RegisterDto registerDto);

    User toEntity(UserDto accountProfileDto);


}
