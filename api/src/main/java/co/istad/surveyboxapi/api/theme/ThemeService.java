package co.istad.surveyboxapi.api.theme;

import co.istad.surveyboxapi.api.theme.web.ThemeDto;
import org.springframework.data.domain.Page;

import java.util.Map;

public interface ThemeService {
    Theme findById(Long id);
    ThemeDto createTheme11(ThemeDto createThemeRequest);
    ThemeDto getThemeById(Long id);
    ThemeDto updateThemeById(Long themeId, ThemeDto updateThemeRequest);
    Map<String,Object> deleteThemes(Long themeId);
    Page<ThemeDto> getAllThemes(Map<String, String> params);

}
