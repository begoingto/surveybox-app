package co.istad.surveyboxapi.api.user;

import co.istad.surveyboxapi.api.user.web.CreateUser;
import co.istad.surveyboxapi.api.user.web.GetUserDto;
import co.istad.surveyboxapi.api.user.web.UserDto;
import com.github.pagehelper.PageInfo;
import org.springframework.data.domain.Page;

import java.util.Map;

public interface UserService {
    CreateUser create(CreateUser accountProfileD);

    Page<User> findAllAccount(Map<String, String> params);
    PageInfo<GetUserDto> findAllUser(int page, int limit);

    UserDto getById(Long id);

    void deleteById(Long id);
    UserDto updateById(Long id, UserDto accountProfile);
    boolean isValidUser(Long userId);

    void UserUpdateStatus(Long id, Boolean flippedStatus);
}
