package co.istad.surveyboxapi.api.theme;

import co.istad.surveyboxapi.api.auth.web.AuthMeDto;
import co.istad.surveyboxapi.api.question.Question;
import co.istad.surveyboxapi.api.survey.web.CreatedByDto;
import co.istad.surveyboxapi.api.theme.web.ThemeDto;
import co.istad.surveyboxapi.api.user.User;
import co.istad.surveyboxapi.exception.ResourceNotFoundException;
import co.istad.surveyboxapi.security.currentuser.IAuthenticationFacade;
import co.istad.surveyboxapi.util.PageMapper;
import co.istad.surveyboxapi.util.PageUtils;
import co.istad.surveyboxapi.util.dto.PageDTO;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class ThemeServiceImpl implements ThemeService {
    private final IAuthenticationFacade iAuthenticationFacade;
    private final ThemeMapper themeMapper;
    private final ThemeMappStruct themeMappStruct;
    private final ThemeRepository themeRepository;

    @Override
    public Theme findById(Long id) {
        return themeMapper.findById(id);
    }

    private void setQuestionCreatedBy(Theme theme) {
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        User user = new User();
        user.setId(authMeDto.id());
        user.setFirstName(authMeDto.firstName());
        user.setLastName(authMeDto.lastName());
        user.setEmail(authMeDto.email());
        //  theme.setUser(user);
    }



    @Override
    public ThemeDto createTheme11(ThemeDto createThemeRequest) {
        String themeJsonString = createThemeRequest.getTheme().toString();
        String name = createThemeRequest.getName();
        JsonNode jsonNode = createThemeRequest.getTheme();
        LocalDateTime now = LocalDateTime.now();
        createThemeRequest.setDateCreated(now);
        Long idTheme = createThemeRequest.getId();
        log.info("Id {}", idTheme);

        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        Long userId = authMeDto.id();

        Theme theme = themeRepository.createTheme(now, name, themeJsonString, userId);
        ThemeDto themeDto = new ThemeDto();
        //   themeDto.setDateCreated(LocalDateTime.now());
        themeDto.setId(theme.getId());
        themeDto.setName(name);
        themeDto.setTheme(jsonNode);
        themeDto.setDateCreated(theme.getCreatedAt());
        CreatedByDto createdByDto = new CreatedByDto();
        createdByDto.setId(authMeDto.id());
        createdByDto.setFirstName(authMeDto.firstName());
        createdByDto.setEmail(authMeDto.email());
        createdByDto.setLastName(authMeDto.lastName());

        themeDto.setCreatedBy(createdByDto);

        return themeDto;
    }

    @Override
    public ThemeDto getThemeById(Long id) {
        Theme themeOptional = themeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Them", id));
        log.info("them {}",themeOptional);
        ThemeDto themeDto = new ThemeDto();
        themeDto.setId(themeOptional.getId());
        themeDto.setName(themeOptional.getName());
        themeDto.setDateCreated(themeOptional.getCreatedAt());
        themeDto.setUpdatedAt(themeOptional.getUpdatedAt());
//        LocalDateTime nowUpdate = themeOptional.getUpdatedAt();
//        themeDto.setUpdatedAt(nowUpdate);
        themeDto.setTheme(themeOptional.getTheme());
        CreatedByDto createdByDto = new CreatedByDto();
        createdByDto.setId(themeOptional.getUser().getId());
        createdByDto.setFirstName(themeOptional.getUser().getFirstName());
        createdByDto.setEmail(themeOptional.getUser().getEmail());
        createdByDto.setLastName(themeOptional.getUser().getLastName());
        themeDto.setCreatedBy(createdByDto);
        return themeDto;
    }

    @Override
    @Transactional
    public ThemeDto updateThemeById(Long themeId, ThemeDto themeDto) {
        Theme existingTheme = themeRepository.findById(themeId).orElseThrow(() -> new ResourceNotFoundException("Them", themeId));
        String name = themeDto.getName();
        Theme theme1=new Theme();
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime nowUpdate = existingTheme.getCreatedAt();
        themeDto.setUpdatedAt(now);
        themeDto.setUpdatedAt(nowUpdate);
        themeDto.setUpdatedAt(existingTheme.getUpdatedAt());
        JsonNode themeJsonNode = themeDto.getTheme();

        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        Long userId = authMeDto.id();

        ObjectMapper objectMapper = new ObjectMapper();
        String themeJsonString;
        try {
            themeJsonString = objectMapper.writeValueAsString(themeJsonNode);
        } catch (JsonProcessingException e) {
            log.error("Error processing JSON: {}", e.getMessage());
            return null;
        }

        themeRepository.updateThemeById(themeId, name, themeJsonString, now, userId);

        CreatedByDto createdByDto = new CreatedByDto();
        createdByDto.setId(authMeDto.id());
        createdByDto.setFirstName(authMeDto.firstName());
        createdByDto.setEmail(authMeDto.email());
        createdByDto.setLastName(authMeDto.lastName());
        ThemeDto updatedThemeDto = new ThemeDto(themeId, name, themeJsonNode, createdByDto, now,nowUpdate);

        return updatedThemeDto;
    }

    @Override
    public Map<String, Object> deleteThemes(Long themeId) {
        ThemeDto question = getThemeById(themeId);
        Theme theme= themeMappStruct.toEntity(question);
        themeRepository.delete(theme);
        Map<String, Object> response = new HashMap<>();
        response.put("id", question.getId());
        response.put("name", question.getName());
        return response;
    }

    @Override
    public Page<ThemeDto> getAllThemes(Map<String, String> params) {
        Pageable pageable = PageUtils.getPageable(params);
        Page<Theme> themePage = themeRepository.findAll(pageable);
        List<ThemeDto> themeDtoList = new ArrayList<>();
        for (Theme theme : themePage.getContent()) {
            ThemeDto themeDto = new ThemeDto();
            themeDto.setId(theme.getId());
            themeDto.setName(theme.getName());
            themeDto.setDateCreated(theme.getCreatedAt());
            themeDto.setUpdatedAt(theme.getUpdatedAt());
            themeDto.setTheme(theme.getTheme());
            CreatedByDto createdByDto = new CreatedByDto();
            createdByDto.setId(theme.getUser().getId());
            createdByDto.setFirstName(theme.getUser().getFirstName());
            createdByDto.setEmail(theme.getUser().getEmail());
            createdByDto.setLastName(theme.getUser().getLastName());
            themeDto.setCreatedBy(createdByDto);
            themeDtoList.add(themeDto);
        }
        return new PageImpl<>(themeDtoList, pageable, themePage.getTotalElements());
    }
}

