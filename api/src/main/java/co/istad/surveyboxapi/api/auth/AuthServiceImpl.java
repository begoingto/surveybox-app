package co.istad.surveyboxapi.api.auth;

import co.istad.surveyboxapi.api.auth.web.*;
import co.istad.surveyboxapi.api.user.User;
import co.istad.surveyboxapi.security.currentuser.IAuthenticationFacade;
import co.istad.surveyboxapi.util.MailUtil;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.reflection.MetaObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.security.oauth2.server.resource.authentication.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.thymeleaf.TemplateEngine;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {
    @Value("${frontend.base-url}")
    private String frontendUrl;
    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;
    private final PasswordEncoder passwordEncoder;
    private final AuthMapper authMapper;
    private final AuthMapStruct authMapStruct;
    private final MailUtil mailUtil;
    private final DaoAuthenticationProvider daoAuthenticationProvider;
    private final JwtAuthenticationProvider jwtRefreshAuthenticationProvider;
    private final JwtEncoder accessTokenJwtEncoder;
    private final IAuthenticationFacade iAuthenticationFacade;
    private JwtEncoder refreshTokenJwtEncoder;
    @Value("${spring.mail.username}")
    private String appMail;

    @Autowired
    @Qualifier("refreshTokenJwtEncoder")
    public void setRefreshTokenJwtEncoder(@Qualifier("refreshTokenJwtEncoder") JwtEncoder refreshTokenJwtEncoder) {
        this.refreshTokenJwtEncoder = refreshTokenJwtEncoder;
    }

    //    @Transactional
    @Override
    public void register(RegisterDto registerDto) {
        LocalDateTime now = LocalDateTime.now();
        User user = User.builder()
                .firstName(registerDto.name())
                .email(registerDto.email())
                .authProvider(registerDto.authProvider())
                .password(passwordEncoder.encode(registerDto.password()))
                .providerName("credentials")
                .createdAt(now)
                .updatedAt(now)
                .build();
//        user.setDateCreated(now);
//        user.setDateUpdated(now);
//        authMapper.register(user);

        if (authMapper.register(user)) {
            // Create role
            authMapper.createUserRole(user.getId(), 2L);
            this.verify(registerDto.email(), "Account Verify", "verify");
        }
    }

    @Override
    public void checkVerify(String email, String code) {
        User user = authMapper.selectByEmailAndVerifiedCode(email, code)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Email not found."));
        authMapper.updateIsVerifyStatus(email, code);
    }

    @Override
    public LoginResponse userLogin(LoginDto loginDto) {
        if (loginDto.user()!=null){
            User userCheck = authMapper.selectByAuthGoogle(loginDto.user()).orElse(null);
            if (userCheck ==null && !authMapper.checkUserExistByEmail(loginDto.email())){
                User user = authMapStruct.userAuthGoogleDtoToUser(loginDto.user());
                user.setPassword(passwordEncoder.encode(loginDto.password()));
                user.setCreatedAt(LocalDateTime.now());
                user.setUpdatedAt(LocalDateTime.now());
                authMapper.insertUserGoogle(user);
                authMapper.createUserRole(user.getId(), 2L);
            }else {
                this.newPassword(NewPassword.builder().email(loginDto.email()).password(loginDto.password()).build());
                if (userCheck!=null){
                    if (userCheck.getFirstLogin().equals(false)){
                        userCheck.setAvatar(loginDto.user().avatar());
                        userCheck.setFirstName(loginDto.user().firstName());
                        userCheck.setLastName(loginDto.user().lastName());
                        userCheck.setEmail(loginDto.email());
                        userCheck.setVerified(true);
                        userCheck.setActive(true);
                        userCheck.setProviderAccountId(loginDto.user().providerAccountId());
                        userCheck.setProviderName(loginDto.user().providerName());
                    }
                }
                authMapper.updateAuthGoogle(userCheck);
            }
        }
        Authentication authentication = new UsernamePasswordAuthenticationToken(loginDto.email(), loginDto.password());

        authentication = daoAuthenticationProvider.authenticate(authentication);

        // Define scope
        String scope = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(auth -> auth.startsWith("ROLE_"))
                .collect(Collectors.joining(" "));

        Instant now = Instant.now();
        JwtClaimsSet accessTokenClaimsSet = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .subject(authentication.getName())
                .expiresAt(now.plus(5, ChronoUnit.MINUTES))
                .claim("scope", scope)
                .build();

        JwtClaimsSet refreshTokenClaimsSet = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .subject(authentication.getName())
                .expiresAt(now.plus(30, ChronoUnit.DAYS))
                .claim("scope", scope)
                .build();

        String accessToken = accessTokenJwtEncoder.encode(JwtEncoderParameters.from(accessTokenClaimsSet)).getTokenValue();
        String refreshToken = refreshTokenJwtEncoder.encode(JwtEncoderParameters.from(refreshTokenClaimsSet)).getTokenValue();

        User user = authMapper.selectByEmail(loginDto.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Email not found."));
        AuthMeDto authMeDto = authMapStruct.userToAuthMeDto(user);
        return LoginResponse.builder()
                .tokenType("Bearer")
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .authMeDto(authMeDto)
                .build();
    }

    @Override
    public AuthDto refreshToken(TokenDto tokenDto) {
        Instant now = Instant.now();

        BearerTokenAuthenticationToken token = new BearerTokenAuthenticationToken(tokenDto.refreshToken());

        Authentication auth = jwtRefreshAuthenticationProvider.authenticate(token);

        auth.getAuthorities().forEach(System.out::println);
        Jwt jwt = (Jwt) auth.getCredentials();
        JwtClaimsSet accessTokenJwtClaimsSet = JwtClaimsSet.builder()
                .issuedAt(now)
                .issuer("client")
                .expiresAt(now.plus(1, ChronoUnit.HOURS))
                .subject(auth.getName())
                .claim("scope", jwt.getClaimAsString("scope"))
                .build();

        String accessToken = accessTokenJwtEncoder.encode(
                JwtEncoderParameters.from(accessTokenJwtClaimsSet)
        ).getTokenValue();

        return new AuthDto(accessToken, tokenDto.refreshToken());
    }

    @Override
    public AuthMeDto personalInfo(PersonalInfo personalInfo) {
        authMapper.personalInfo(personalInfo);
        return iAuthenticationFacade.getAuthMeDto();
    }

    @Override
    public void forgotPassword(ForgotSendEmailDto forgotSendEmailDto) {
        log.info("forgotPassword: {}", forgotSendEmailDto.email());
        this.verifyForgotPassword(forgotSendEmailDto.email(), "Reset Password", "reset-password");
    }

    @Override
    public void newPassword(NewPassword newPassword) {
        User user = authMapper.selectByEmail(newPassword.email())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found user."));
        authMapper.newPassword(user.getId(), passwordEncoder.encode(newPassword.password()));
    }

    @Override
    public AuthMeDto authMe(Authentication authentication) {
        return iAuthenticationFacade.getAuthMeDto();
    }


    private void verify(String email, String subject, String templateName) {

        User user = authMapper.selectSendMailEmail(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Email not found."));

        String verifiedCode = UUID.randomUUID().toString();

        if (authMapper.updateVerifiedCode(email, verifiedCode)) {
            user.setVerifiedCode(verifiedCode);
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "User cannot be verify.");
        }


        MailUtil.Meta<?> meta = MailUtil.Meta.builder()
                .to(email)
                .from(appMail)
                .subject(subject)
                .templateUrl("mail/" + templateName)
                .data(user)
                .build();
        try {
            mailUtil.send(meta, user);
        } catch (MessagingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }

    public AuthMeDto updateAuthMe(UpdateAuthMe updateAuthMe) {
        AuthMeDto authMeDto1 = iAuthenticationFacade.getAuthMeDto();
        // Determine whether to update the email
        boolean updateEmail = !updateAuthMe.getEmail().equals(authMeDto1.email());
        User userFromUpdate = authMapStruct.updateUpAuthMeToUser(updateAuthMe);
        userFromUpdate.setId(authMeDto1.id());
        userFromUpdate.setVerified(true);
        userFromUpdate.setActive(true);
        userFromUpdate.setFirstLogin(authMeDto1.firstLogin());
        userFromUpdate.setRoles(authMeDto1.roles());
        if (updateEmail){
            User existingUser = authMapper.selectEmailAndId(userFromUpdate, authMeDto1.id()).orElse(null);
            if (existingUser!=null){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Your email: "+ updateAuthMe.getEmail() +" update is already have account.");
            }
            userFromUpdate.setVerified(false);
//            userFromUpdate.setActive(false);
            String verificationCode = UUID.randomUUID().toString();
            userFromUpdate.setVerifiedCode(verificationCode);
        }

        int rowsAffected = authMapper.updateUserProfile(userFromUpdate);
//        // Update the verification code for the new email
        if (updateEmail) {
            String email = userFromUpdate.getEmail();
            String subject = "Email Update Verification";
            String templateName = "verify";
            sendMailverifyUpdateEmail(userFromUpdate, subject, templateName);
        }
        // Return the updated user profile
        return authMapStruct.userToAuthMeDto(userFromUpdate);
    }
    private void sendMailverifyUpdateEmail(User user, String subject, String templateName){
        MailUtil.Meta<?> meta = MailUtil.Meta.builder()
                .to(user.getEmail())
                .from(appMail)
                .subject(subject)
                .templateUrl("mail/" + templateName)
                .data(user)
                .build();
        try {
            mailUtil.send(meta, user);
        } catch (MessagingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
    private void verifyForgotPassword(String email, String subject, String templateName) {

        User user = authMapper.selectSendMailEmailForgetPassword(email)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Email not found."));

        MailUtil.Meta<?> meta = MailUtil.Meta.builder()
                .to(email)
                .from(appMail)
                .subject(subject)
                .templateUrl("mail/" + templateName)
                .data(user)
                .build();
        try {
            mailUtil.send(meta, user);
        } catch (MessagingException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
        }
    }
}