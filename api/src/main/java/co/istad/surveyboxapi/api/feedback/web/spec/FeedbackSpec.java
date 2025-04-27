package co.istad.surveyboxapi.api.feedback.web.spec;

import co.istad.surveyboxapi.api.feedback.Feedback;
import co.istad.surveyboxapi.api.feedback.web.filter.FeedbackFilter;
import jakarta.persistence.criteria.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class FeedbackSpec implements Specification<Feedback> {
    private final FeedbackFilter feedbackFilter;
    @Override
    public Predicate toPredicate(Root<Feedback> feedback, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> predicates = new ArrayList<>();
        if (feedbackFilter.getFeedBackId() != null) {
            predicates.add(criteriaBuilder.equal(feedback.get("id"), feedbackFilter.getFeedBackId()));
        }
        return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
    }
}
