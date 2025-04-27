package co.istad.surveyboxapi.api.auth;

import co.istad.surveyboxapi.api.auth.web.*;
import co.istad.surveyboxapi.api.user.User;
import co.istad.surveyboxapi.api.user.web.CreateUser;
import org.springframework.security.core.Authentication;

import java.util.List;

public interface AuthService {
    void register(RegisterDto registerDto);

    void checkVerify(String email, String code);

    LoginResponse userLogin(LoginDto loginDto);

    AuthDto refreshToken(TokenDto tokenDto);

    AuthMeDto personalInfo(PersonalInfo personalInfo);

    void forgotPassword(ForgotSendEmailDto forgotSendEmailDto);

    void newPassword(NewPassword newPassword);

    AuthMeDto authMe(Authentication authentication);

    AuthMeDto updateAuthMe(UpdateAuthMe updateAuthMe);
}
