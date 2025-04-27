package co.istad.surveyboxapi.security.currentuser;

import co.istad.surveyboxapi.api.auth.web.AuthMeDto;
import org.springframework.security.core.Authentication;

public interface IAuthenticationFacade {
    Authentication getAuthentication();

    AuthMeDto getAuthMeDto();
}
