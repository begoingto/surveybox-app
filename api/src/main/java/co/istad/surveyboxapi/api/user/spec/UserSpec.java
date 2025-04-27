package co.istad.surveyboxapi.api.user.spec;

import co.istad.surveyboxapi.api.user.User;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
public class UserSpec implements Specification<User> {
    private final UserFilter userFilter;

    @Override
    public Predicate toPredicate(Root<User> accountProfile, CriteriaQuery<?> query, CriteriaBuilder cb) {

        List<Predicate> accountPredicate = new ArrayList<>();
        if (userFilter.getUserId() != null) {
            Predicate userId = accountProfile.get("id").in(userFilter.getUserId());
            accountPredicate.add(userId);
        }



        if (userFilter.getFirstName() != null) {
            Predicate lastName = cb.like(accountProfile.get("firstName")
                    , "%" + userFilter.getFirstName() + "%");
            accountPredicate.add(lastName);
        }



        if (userFilter.getLastName() != null) {
            Predicate firstName = cb.like(accountProfile.get("lastName")
                    , "%" + userFilter.getLastName().concat("%"));
            accountPredicate.add(firstName);
        }



        if (userFilter.getFullName() != null) {
            Predicate fullName = cb.like(accountProfile.get("fullName")
                    , "%" + userFilter.getFullName().concat("%"));
            accountPredicate.add(fullName);
        }



        return cb.and(accountPredicate.toArray(Predicate[]::new));
    }
}
