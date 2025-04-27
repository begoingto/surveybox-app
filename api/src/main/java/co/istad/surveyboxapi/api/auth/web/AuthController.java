package co.istad.surveyboxapi.api.auth.web;

import co.istad.surveyboxapi.api.auth.AuthMapStruct;
import co.istad.surveyboxapi.api.auth.AuthService;
import co.istad.surveyboxapi.api.user.User;
import co.istad.surveyboxapi.api.user.UserMapStruct;
import co.istad.surveyboxapi.api.user.UserService;
import co.istad.surveyboxapi.api.user.web.CreateUser;
import co.istad.surveyboxapi.base.BaseApi;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/auth")
@Slf4j
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public BaseApi<?> register(@Valid @RequestBody RegisterDto registerDto) {

        authService.register(registerDto);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .status(true)
                .message("Success registration")
                .timeStamp(LocalDateTime.now())
                .data(registerDto.email())
                .build();
    }

    @PostMapping("/login")
    public BaseApi<?> login(@Valid @RequestBody LoginDto loginDto) {

        LoginResponse loginResponse = authService.userLogin(loginDto);

        return BaseApi.builder()
                .status(true)
                .code(HttpStatus.OK.value())
                .message("You have been registered successfully.")
                .timeStamp(LocalDateTime.now())
                .data(loginResponse)
                .build();
    }

    @PostMapping("/refresh-token")
    public AuthDto refreshToken(@RequestBody TokenDto tokenDto) {
        return authService.refreshToken(tokenDto);
    }

    @GetMapping("/check-verify")
    public BaseApi<?> checkVerify(@RequestParam String email, @RequestParam String verifiedCode) {

        authService.checkVerify(email, verifiedCode);

        return BaseApi.builder()
                .status(true)
                .code(HttpStatus.OK.value())
                .message("You have been verified on surveybox successfully.")
                .timeStamp(LocalDateTime.now())
                .data(email)
                .build();
    }

    @PutMapping("/personal-info")
    public BaseApi<?> personalInfo(@RequestBody @Valid PersonalInfo personalInfo) {

        AuthMeDto user = authService.personalInfo(personalInfo);

        return BaseApi.builder()
                .status(true)
                .code(HttpStatus.OK.value())
                .message("You have been updated your personal info successfully.")
                .timeStamp(LocalDateTime.now())
                .data(user)
                .build();
    }

    @PostMapping("/forgot-password")
    public BaseApi<?> forgotPassword(@RequestBody @Valid ForgotSendEmailDto forgotSendEmailDto) {

        authService.forgotPassword(forgotSendEmailDto);

        return BaseApi.builder()
                .status(true)
                .code(HttpStatus.OK.value())
                .message("You have been updated your password successfully.")
                .timeStamp(LocalDateTime.now())
                .data(forgotSendEmailDto.email())
                .build();
    }

    @PutMapping("/new-password")
    public BaseApi<?> newPassword(@RequestBody @Valid NewPassword newPassword) {

        authService.newPassword(newPassword);

        return BaseApi.builder()
                .status(true)
                .code(HttpStatus.OK.value())
                .message("You have been updated your password successfully.")
                .timeStamp(LocalDateTime.now())
                .data(newPassword.email())
                .build();
    }


    @GetMapping("/me")
    public BaseApi<?> getUserInfo(Authentication auth) {

        AuthMeDto authMeDto = authService.authMe(auth);

        return BaseApi.builder()
                .status(true)
                .code(HttpStatus.OK.value())
                .message("User information retrieved successfully.")
                .timeStamp(LocalDateTime.now())
                .data(authMeDto)
                .build();
    }
    @PutMapping("me/update")
    public BaseApi<?> updateAuth(@Valid @RequestBody UpdateAuthMe updateAuthMe){
        AuthMeDto authMeDto = authService.updateAuthMe(updateAuthMe);
        return BaseApi.builder()
                .status(true)
                .code(HttpStatus.OK.value())
                .message("User information retrieved successfully.")
                .timeStamp(LocalDateTime.now())
                .data(authMeDto)
                .build();
    }

}
