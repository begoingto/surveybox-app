package co.istad.surveyboxapi.api.category;


import co.istad.surveyboxapi.api.category.web.DisableStatusDto;
import org.springframework.data.domain.Page;

import java.util.Map;

public interface CategoryService {
    Category createCateroy(Category category);

    Category getCategoryById(Long id);

    Category update(Long id, Category category);

    Page<Category> finAll(Map<String,String>params);
    Map<String, Object> deleteCategory(Long questionId);
    Category disableStatus(Long id, DisableStatusDto disableStatusDto);
}
