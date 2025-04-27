package co.istad.surveyboxapi.api.user.web;

import co.istad.surveyboxapi.api.auth.Role;
import co.istad.surveyboxapi.api.survey.web.SurveyStatus;
import co.istad.surveyboxapi.api.user.User;
import co.istad.surveyboxapi.api.user.UserMapStruct;
import co.istad.surveyboxapi.api.user.UserService;
import co.istad.surveyboxapi.base.BaseApi;
import co.istad.surveyboxapi.util.PageMapper;
import co.istad.surveyboxapi.util.dto.PageDTO;
import com.github.pagehelper.PageInfo;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/users")
public class UserController {
    private final UserService userService;
    @PostMapping
    public BaseApi<?>saveUser(@RequestBody @Valid CreateUser userDto){
//        User user= UserMapStruct.INSTANCE.toEntity(userDto);
//        List<Role> roles = new ArrayList<>(){{
//            for (Long id:userDto.roleIds()) {
//                add(new Role(id,null,null));
//            }
//        }};
//        user.setRoles(roles);
//       User user1= userService.create();
        CreateUser userDto1 =userService.create(userDto);

        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("User profile saved successfully.")
                .timeStamp(LocalDateTime.now())
                .data(userDto1)
                .status(true)
                .build();
    }
    @GetMapping("{id}")
    public BaseApi<?>getUserById(@PathVariable("id") Long id){
        UserDto userDto=userService.getById(id);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("User profile with ID " + id + " updated successfully.")
                .timeStamp(LocalDateTime.now())
                .data(userDto)
                .status(true)
                .build();
    }
    @GetMapping
    public BaseApi<?> accountProfileFindAll(
            @RequestParam(name = "page",required = false,defaultValue = "1") int page,
            @RequestParam(name = "limit",required = false,defaultValue = "15") int limit
    ){
        PageInfo<GetUserDto> findAllUser = userService.findAllUser(page,limit);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("User profiles retrieved successfully.")
                .timeStamp(LocalDateTime.now())
                .data(findAllUser)
                .status(true)
                .build();
    }
    @PutMapping("{id}")
    public BaseApi<?> updateById(@PathVariable("id") Long id ,@RequestBody UserDto accountProfile){
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("User profile with ID " + id + " updated successfully.")
                .timeStamp(LocalDateTime.now())
                .data(userService.updateById(id, accountProfile))
                .status(true)
                .build();
    }
    @DeleteMapping("{id}")
    public BaseApi<?> deleteAccountProfileById(@PathVariable Long id){
        userService.deleteById(id);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("User profile with ID " + id + " updated successfully.")
                .timeStamp(LocalDateTime.now())
                .data("Your Id delete : "+id)
                .status(true)
                .build();
    }


    @PutMapping("/{id}/flipStatus")
    public BaseApi<?> UserFlipStatus(@PathVariable Long id,@RequestBody UserStatus userStatus) {
        userService.UserUpdateStatus(id,userStatus.isActive());
        return BaseApi.builder()
                .data(id)
                .code(HttpStatus.OK.value())
                .message("you have been updated User successfully")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }
}

