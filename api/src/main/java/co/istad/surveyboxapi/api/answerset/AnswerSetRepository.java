package co.istad.surveyboxapi.api.answerset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerSetRepository extends JpaRepository<AnswerSet,Long> {
}
