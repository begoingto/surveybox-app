package co.istad.surveyboxapi.security;

import co.istad.surveyboxapi.security.custom.CustomJwtAccessDeniedHandler;
import co.istad.surveyboxapi.security.custom.CustomAuthenticationEntryPoint;
import co.istad.surveyboxapi.util.KeyUtil;
import com.nimbusds.jose.jwk.JWK;
import com.nimbusds.jose.jwk.JWKSet;
import com.nimbusds.jose.jwk.RSAKey;
import com.nimbusds.jose.jwk.source.JWKSource;
import com.nimbusds.jose.proc.SecurityContext;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtEncoder;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@EnableMethodSecurity
public class SecurityConfig {
    private final PasswordEncoder encoder;
    private final UserDetailsServiceImpl userDetailsService;
    private final CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
    private final CustomJwtAccessDeniedHandler customJwtAccessDeniedHandler;
    private final KeyUtil keyUtil;

    @Bean
    public DaoAuthenticationProvider daoAuthenticationProvider() {
        DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
        auth.setUserDetailsService(userDetailsService);
        auth.setPasswordEncoder(encoder);
        return auth;
    }

    @Bean
    @Qualifier("jwtRefreshAuthenticationProvider")
    public JwtAuthenticationProvider jwtRefreshAuthenticationProvider() {

        JwtAuthenticationProvider provider =  new JwtAuthenticationProvider(refreshTokenJwtDecoder());
        provider.setJwtAuthenticationConverter(jwtAuthenticationConverter());

        return provider;
    }


    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // Disabling CSRF protection
        http.csrf(AbstractHttpConfigurer::disable);

        // allowed to make cross-origin requests
        http.cors(cors -> cors.configure(http));

        // configure authorization for HTTP requests
        http.authorizeHttpRequests(request -> {
            // Get current user authenticated
            request.requestMatchers("/api/v1/auth/me").authenticated();
            request.requestMatchers("/api/v1/auth/personal-info").authenticated();
            request.requestMatchers("/api/v1/auth/me/update").authenticated();
            // User protection
            request.requestMatchers("/api/v1/users/**").hasAnyAuthority("SCOPE_ROLE_ADMIN");

            // File Upload and Download
            request.requestMatchers("/api/v1/files/**").authenticated();

            request.requestMatchers(HttpMethod.GET,"/api/v1/surveys/uuid/**").permitAll();
            request.requestMatchers(HttpMethod.GET,"/api/v1/surveys/**").authenticated();
            request.requestMatchers("/api/v1/surveys/**").hasAnyAuthority( "SCOPE_ROLE_SURVEY_CREATOR");

            // Category protection
            request.requestMatchers(HttpMethod.GET,"/api/v1/categories/**").authenticated();
            request.requestMatchers("/api/v1/categories/**").hasAnyAuthority("SCOPE_ROLE_ADMIN");

            // Vote protection
            request.requestMatchers(HttpMethod.GET,"/api/v1/votes/uuid/**").permitAll();
            request.requestMatchers(HttpMethod.GET,"/api/v1/votes/**").authenticated();
            request.requestMatchers("/api/v1/votes/**").hasAnyAuthority( "SCOPE_ROLE_SURVEY_CREATOR");

            // Question protection
            request.requestMatchers("/api/v1/questions/**").authenticated();

            // responses protection
//            request.requestMatchers("/api/v1/responses/**").hasAnyAuthority( "SCOPE_ROLE_SURVEY_CREATOR");
            request.requestMatchers(HttpMethod.GET,"/api/v1/responses/survey/**").authenticated();

            // Feedback protection
            request.requestMatchers(HttpMethod.POST,"/api/v1/feedbacks/**").hasAnyAuthority("SCOPE_ROLE_SURVEY_CREATOR");
            request.requestMatchers(HttpMethod.GET,"/api/v1/feedbacks/**").hasAnyAuthority("SCOPE_ROLE_ADMIN");

            // Theme protection
            request.requestMatchers(HttpMethod.GET,"/api/v1/themes/**").authenticated();
            request.requestMatchers("/api/v1/themes/**").hasAnyAuthority("SCOPE_ROLE_ADMIN");
            request.requestMatchers(HttpMethod.GET,"/api/v1/dashboard/graphs/admins**").hasAnyAuthority("SCOPE_ROLE_ADMIN");
            request.anyRequest().permitAll();
        });

        // Spring Security is used to configure a resource server that supports OAuth 2.0 token jwt authentication
        http.oauth2ResourceServer(oauth2 -> oauth2.jwt(
                jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())
                )
        );


        // configure Session Auth to stateless By default is stateful
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Spring Security is used to configure how Spring Security will handle exceptions
        http.exceptionHandling(ex -> {
            ex.authenticationEntryPoint(customAuthenticationEntryPoint);
            ex.accessDeniedHandler(customJwtAccessDeniedHandler);
        });

        return http.build();
    }

    @Bean
    @Primary
    public JwtDecoder accessTokenJwtDecoder() {
        return NimbusJwtDecoder
                .withPublicKey(keyUtil.getAccessTokenPublicKey()).build();
    }

    @Bean
    @Qualifier("refreshTokenJwtDecoder")
    public JwtDecoder refreshTokenJwtDecoder() {
        return NimbusJwtDecoder
                .withPublicKey(keyUtil.getRefreshTokenPublicKey()).build();
    }

    @Bean
    @Primary
    public JwtEncoder accessTokenJwtEncoder() {

        JWK jwk = new RSAKey
                .Builder(keyUtil.getAccessTokenPublicKey())
                .privateKey(keyUtil.getAccessTokenPrivateKey())
                .build();

        JWKSet jwkSet = new JWKSet(jwk);

        JWKSource<SecurityContext> jwkSource =
                (jwkSelector, context) -> jwkSelector.select(jwkSet);

        return new NimbusJwtEncoder(jwkSource);
    }

    @Bean
    @Qualifier("refreshTokenJwtEncoder")
    public JwtEncoder refreshTokenJwtEncoder() {

        JWK jwk = new RSAKey
                .Builder(keyUtil.getRefreshTokenPublicKey())
                .privateKey(keyUtil.getRefreshTokenPrivateKey())
                .build();

        JWKSet jwkSet = new JWKSet(jwk);

        JWKSource<SecurityContext> jwkSource =
                (jwkSelector, context) -> jwkSelector.select(jwkSet);

        return new NimbusJwtEncoder(jwkSource);
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        return new JwtAuthenticationConverter();
    }
}