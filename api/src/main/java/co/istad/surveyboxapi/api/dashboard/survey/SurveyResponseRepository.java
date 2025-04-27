package co.istad.surveyboxapi.api.dashboard.survey;

import co.istad.surveyboxapi.api.response.Response;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface SurveyResponseRepository extends JpaRepository<Response,Long> {
    @Query(value = "SELECT DATE_TRUNC('month', r.created_at) AS month, COUNT(*) AS totalSurveyResponse " +
            "FROM responses r " +
            "INNER JOIN surveys s ON r.survey_id = s.id " +
            "WHERE s.created_by = :userId AND EXTRACT(YEAR FROM r.created_at) = EXTRACT(YEAR FROM CURRENT_TIMESTAMP) " +
            "GROUP BY month " +
            "ORDER BY month", nativeQuery = true)
    List<Object[]> getTotalSurveyResponseByMonth(Long userId);


}
