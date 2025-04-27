package co.istad.surveyboxapi.api.question.spec;

import co.istad.surveyboxapi.api.category.Category;
import co.istad.surveyboxapi.api.question.Question;
import co.istad.surveyboxapi.api.question.QuestionType;
import co.istad.surveyboxapi.api.question.filter.FilterQuestionByCategory;
import jakarta.persistence.criteria.*;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RequiredArgsConstructor
@Data
public class QuestionSpec implements Specification<Question> {
    private final FilterQuestionByCategory filterQuestionByCategory;
    @Override
    public Predicate toPredicate(Root<Question> question, CriteriaQuery<?> query, CriteriaBuilder cb) {
        List<Predicate> predicateList=new ArrayList<>();
        Join<Question, Category>categoryJoin=question.join("category");
        if (filterQuestionByCategory.getCategoryName() != null) {
            String searchTerm = "%" + filterQuestionByCategory.getCategoryName().toLowerCase() + "%";
            Predicate name = cb.like(cb.lower(categoryJoin.get("name")), searchTerm);
            predicateList.add(name);
        }
        if(filterQuestionByCategory.getQuestionName()!=null){
          Predicate predicate1=  cb.like(question.get("name"),"%"+filterQuestionByCategory.getQuestionName()+"%");
          predicateList.add(predicate1);
        }
        if (filterQuestionByCategory.getQuestionType() != null) {
            String questionTypeStr = filterQuestionByCategory.getQuestionType().name();
            Predicate predicate1 = question.get("questionType").in(Collections.singleton(QuestionType.valueOf(questionTypeStr)));
            predicateList.add(predicate1);
        }
        if (filterQuestionByCategory.getSortBy() != null && !filterQuestionByCategory.getSortBy().isEmpty()) {
            String sortBy = filterQuestionByCategory.getSortBy();
            if (filterQuestionByCategory.getSortDirection() != null && filterQuestionByCategory.getSortDirection().equalsIgnoreCase("desc")) {
                query.orderBy(cb.desc(question.get(sortBy)));
            } else {
                query.orderBy(cb.asc(question.get(sortBy)));
            }
        }


        Predicate[] predicates = predicateList.toArray( Predicate[]::new);
        return cb.and(predicates);
    }
    }
