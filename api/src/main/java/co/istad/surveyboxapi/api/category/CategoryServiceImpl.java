package co.istad.surveyboxapi.api.category;

import co.istad.surveyboxapi.api.category.web.DisableStatusDto;
import co.istad.surveyboxapi.api.category.web.filter.CategoryFilter;
import co.istad.surveyboxapi.api.category.web.filter.CategorySpec;
import co.istad.surveyboxapi.exception.ResourceNotFoundException;
import co.istad.surveyboxapi.util.PageUtils;
import lombok.RequiredArgsConstructor;
import org.apache.commons.collections4.MapUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public Category createCateroy(Category category) {
           category.setStatus(true);
        return categoryRepository.save(category);

    }


    @Override
    public Category getCategoryById(Long id) {

        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category", id));

        return category;
    }


    @Override
    public Category update(Long id, Category category) {

        Category categoryUpdate = getCategoryById(id);

        BeanUtils.copyProperties(category, categoryUpdate, "id");

        return categoryRepository.save(categoryUpdate);
    }


    @Override
    public Page<Category> finAll(Map<String, String> params) {
        CategoryFilter categoryFilter=new CategoryFilter();
        Pageable pageable = PageUtils.getPageableWithSort(params, Sort.by(Sort.Direction.DESC, "id"));
        if (params.containsKey("categoryName")){
            categoryFilter.setCategoryName(MapUtils.getString(params,"categoryName"));
        }
        if(params.containsKey("categoryId")){
            categoryFilter.setCategoryId(MapUtils.getLong(params,"categoryId"));
        }
        CategorySpec categorySpec=new CategorySpec(categoryFilter);
        Page<Category> categories = categoryRepository.findAll(categorySpec,pageable);
        return categories;

    }


    @Override
    public Map<String, Object> deleteCategory(Long cagoryId) {
        Category category= getCategoryById(cagoryId);

        Map<String, Object> response = new HashMap<>();
        response.put("id", category.getId());
        response.put("name", category.getName());
        categoryRepository.deleteById(cagoryId);
        return response;
    }

    @Override
    public Category disableStatus(Long id, DisableStatusDto disableStatusDto) {
       Category category= getCategoryById(id);
       category.setStatus(disableStatusDto.isStatus());

        return categoryRepository.save(category);
    }
}
