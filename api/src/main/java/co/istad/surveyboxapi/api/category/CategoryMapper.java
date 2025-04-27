package co.istad.surveyboxapi.api.category;

import co.istad.surveyboxapi.api.category.web.CategoryDto;
import co.istad.surveyboxapi.api.category.web.CategoryDtoReponse;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    CategoryDto toDto(Category category);

    Category toEntity(CategoryDto categoryDto);
    CategoryDtoReponse toResponse(Category category);
    Category toEntity1(CategoryDtoReponse categoryDtoReponse);
}
