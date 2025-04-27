package co.istad.surveyboxapi.security.currentuser;

import co.istad.surveyboxapi.api.auth.AuthMapStruct;
import co.istad.surveyboxapi.api.auth.AuthMapper;
import co.istad.surveyboxapi.api.auth.web.AuthMeDto;
import co.istad.surveyboxapi.api.user.User;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

@Component
@AllArgsConstructor
public class AuthenticationFacade implements IAuthenticationFacade{
    private final AuthMapper authMapper;
    private final AuthMapStruct authMapStruct;


    @Override
    public Authentication getAuthentication() {
        return SecurityContextHolder.getContext().getAuthentication();
    }

    @Override
    public AuthMeDto getAuthMeDto() {
        Authentication authentication = getAuthentication();
        User user = authMapper.selectByEmail(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Auth me("+ authentication.getName() +") is not found."));
        return authMapStruct.userToAuthMeDto(user);
    }
}
