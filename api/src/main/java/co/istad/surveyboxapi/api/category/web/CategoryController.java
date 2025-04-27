package co.istad.surveyboxapi.api.category.web;

import co.istad.surveyboxapi.api.category.Category;
import co.istad.surveyboxapi.api.category.CategoryMapper;
import co.istad.surveyboxapi.api.category.CategoryService;
import co.istad.surveyboxapi.api.vote.Vote;
import co.istad.surveyboxapi.api.vote.VoteMapper;
import co.istad.surveyboxapi.base.BaseApi;
import co.istad.surveyboxapi.exception.ApiExceptionResponseMessage;
import co.istad.surveyboxapi.util.PageMapper;
import co.istad.surveyboxapi.util.dto.PageDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/categories")
public class CategoryController {
    private final CategoryService categoryService;
    private final CategoryMapper categoryMapper;

    @PostMapping
    public BaseApi<?> createCategory( @RequestBody @Valid CategoryDtoReponse categoryDto) {
        Category category = CategoryMapper.INSTANCE.toEntity1(categoryDto);
        Category category1 = categoryService.createCateroy(category);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("Category created successfully.")
                .timeStamp(LocalDateTime.now())
                .data(categoryMapper.toResponse(category1))
                .status(true)
                .build();

    }
    @GetMapping("/{id}")
    public BaseApi<?> findCategoryById(@PathVariable("id") Long id) {
        Category category = categoryService.getCategoryById(id);

            return BaseApi.builder()
                    .code(HttpStatus.OK.value())
                    .message("Category found.")
                    .timeStamp(LocalDateTime.now())
                    .data(CategoryMapper.INSTANCE.toResponse(category))
                    .status(true)
                    .build();

    }


    @PutMapping("{id}")
    public BaseApi<?> updateCategory(@PathVariable("id") Long id, @RequestBody @Valid CategoryDto categoryDto) {
        Category category = CategoryMapper.INSTANCE.toEntity(categoryDto);
        category = categoryService.update(id, category);

        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("Category with ID " + id + " updated successfully. Name: " + category.getName())
                .timeStamp(LocalDateTime.now())
                .data(category)
                .status(true)
                .build();
    }


    @GetMapping
    public BaseApi<?>selectCategory(@RequestParam Map<String,String>params){
        Page<Category> page = categoryService.finAll(params);
        PageDTO dto = PageMapper.INSTANCE.toDTO(page);
        dto.setList(page.get().map(CategoryMapper.INSTANCE::toDto).toList());
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .data(dto)
                .message("Find Category successfully")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }

    @DeleteMapping("/{id}")
    public BaseApi<Object> deleteCategory(@PathVariable("id") Long categoryId) throws ApiExceptionResponseMessage {
        Map<String,Object> map= categoryService.deleteCategory(categoryId);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("Category is has been deleted")
                .timeStamp(LocalDateTime.now())
                .data(map)
                .status(true)
                .build();
    }
    @PutMapping("/disable/{id}")
    public BaseApi<Object> disableStatus(@PathVariable("id") Long categoryId,@RequestBody DisableStatusDto disableStatusDto) throws ApiExceptionResponseMessage {
     Category category=  categoryService.disableStatus(categoryId,disableStatusDto);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("Category is has been disable")
                .timeStamp(LocalDateTime.now())
                .data(category)
                .status(true)
                .build();
    }
}
