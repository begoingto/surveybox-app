package co.istad.surveyboxapi.api.category.web.filter;

import co.istad.surveyboxapi.api.category.Category;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class CategorySpec implements Specification<Category> {
    private final CategoryFilter categoryFilter;
    @Override
    public Predicate toPredicate(Root<Category> category, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicateList=new ArrayList<>();
        if(categoryFilter.getCategoryName()!=null){
            String searchQuery = categoryFilter.getCategoryName().toLowerCase();
            Predicate predicate1=  cb.like(cb.lower(category.get("name")), "%" + searchQuery + "%");
            predicateList.add(predicate1);
        }
        if(categoryFilter.getCategoryId()!=null){
           Predicate predicate= category.get("id").in(categoryFilter.categoryId);
           predicateList.add(predicate);
        }

        Predicate[] predicates = predicateList.toArray( Predicate[]::new);
        return cb.and(predicates);
    }
}
