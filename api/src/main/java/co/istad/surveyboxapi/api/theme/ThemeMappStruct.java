package co.istad.surveyboxapi.api.theme;

import co.istad.surveyboxapi.api.theme.web.CreateThemeRequest;
import co.istad.surveyboxapi.api.theme.web.ThemeDto;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ThemeMappStruct {
    ThemeMappStruct INSTANCE= Mappers.getMapper(ThemeMappStruct.class);
    ThemeDto toDto(Theme theme);
    Theme toEntity(ThemeDto themeDto);
    CreateThemeRequest toEntityRequest(Theme theme);
    Theme toTheme(CreateThemeRequest createThemeRequest);
}
