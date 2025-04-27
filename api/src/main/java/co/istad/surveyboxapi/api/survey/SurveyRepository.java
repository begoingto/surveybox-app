package co.istad.surveyboxapi.api.survey;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SurveyRepository extends JpaRepository<Survey , Long> {

    @Query(value = "SELECT id FROM surveys", nativeQuery = true)
    List<Survey> findAllSurvey();
}
