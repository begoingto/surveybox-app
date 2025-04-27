package co.istad.surveyboxapi.api.theme.web;

import co.istad.surveyboxapi.api.question.Question;
import co.istad.surveyboxapi.api.question.QuestionMappStruct;
import co.istad.surveyboxapi.api.theme.Theme;
import co.istad.surveyboxapi.api.theme.ThemeMappStruct;
import co.istad.surveyboxapi.api.theme.ThemeService;
import co.istad.surveyboxapi.base.BaseApi;
import co.istad.surveyboxapi.util.PageMapper;
import co.istad.surveyboxapi.util.dto.PageDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("api/v1/themes")
@RequiredArgsConstructor
@Slf4j
public class ThemeController {
    private final ThemeService themeService;
    private final ThemeMappStruct themeMappStruct;

    @PostMapping
    public BaseApi<?> createTheme(@Valid @RequestBody ThemeDto createThemeRequest){
        ThemeDto themeDto = themeService.createTheme11(createThemeRequest);
        return BaseApi.builder()
                .data(themeDto)
                .timeStamp(LocalDateTime.now())
                .status(true)
                .code(HttpStatus.OK.value())
                .message("Theme submitted successfully.")
                .build();
    }
    @GetMapping("{id}")
    public BaseApi<?> getThemeById(@PathVariable("id") Long id){
        ThemeDto themeDto = themeService.getThemeById(id);
        return BaseApi.builder()
                .data(themeDto)
                .timeStamp(LocalDateTime.now())
                .status(true)
                .code(HttpStatus.OK.value())
                .message("Theme find by id  successfully.")
                .build();
    }
    @PutMapping("/{themeId}")
    public BaseApi<?> updateTheme(@PathVariable Long themeId,@Valid @RequestBody ThemeDto themeDto){
        ThemeDto updatedTheme = themeService.updateThemeById(themeId, themeDto);
        return BaseApi.builder()
                .data(updatedTheme)
                .timeStamp(LocalDateTime.now())
                .status(true)
                .code(HttpStatus.OK.value())
                .message("Theme updated successfully.")
                .build();
    }
    @DeleteMapping("/{themeId}")
    public BaseApi<?> updateTheme(@PathVariable Long themeId){
       Map<String,Object> delete= themeService.deleteThemes(themeId);
        return BaseApi.builder()
                .data(delete)
                .timeStamp(LocalDateTime.now())
                .status(true)
                .code(HttpStatus.OK.value())
                .message("Theme delete successfully.")
                .build();
    }
    @GetMapping
    public BaseApi<?> getAll(Map<String,String>params){
            Page<ThemeDto> page = themeService.getAllThemes(params);
            PageDTO pageDTO = PageMapper.INSTANCE.toDTO(page);
        return BaseApi.builder()
                .data(pageDTO)
                .timeStamp(LocalDateTime.now())
                .status(true)
                .code(HttpStatus.OK.value())
                .message("Themes retrieved successfully.")
                .build();
    }
}