package co.istad.surveyboxapi.api.dashboard.survey;

import co.istad.surveyboxapi.api.dashboard.survey.dto.MonthlyDto;
import co.istad.surveyboxapi.api.dashboard.survey.dto.MonthlyTotalDto;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SurveyResponseServiceImpl implements SurveyResponseService {
    private final EntityManagerFactory createEntityManager;
    private final EntityManager entityManager;

    public MonthlyDto getSurveyResponsesByUserId(Long userId) {
        EntityManager em = createEntityManager.createEntityManager();

        List<Object[]> results = entityManager.createNativeQuery(
                        "SELECT EXTRACT(MONTH FROM created_at) AS month, COUNT(*) as total_survey " +
                                "FROM surveys " +
                                "WHERE created_by = :userId " +
                                "GROUP BY month"
                )
                .setParameter("userId", userId)
                .getResultList();
        List<Object[]> results1 = entityManager.createNativeQuery(
                        "SELECT EXTRACT(MONTH FROM create_at) AS month, COUNT(*) as total " +
                                "FROM votes " +
                                "WHERE created_by = :userId " +
                                "GROUP BY month"
                )
                .setParameter("userId", userId)
                .getResultList();
        List<MonthlyTotalDto> totalVote = results1.stream().map(row -> MonthlyTotalDto.builder()
                .month(row[0])
                .total(row[1])
                .build()
        ).toList();
        List<MonthlyTotalDto> totalSurvey = results.stream().map(row -> MonthlyTotalDto.builder()
                .month(row[0])
                .total(row[1])
                .build()
        ).toList();
        return MonthlyDto.builder()
                .vote(totalVote)
                .survey(totalSurvey)
                .build();
    }

    @Override
    public MonthlyDto getSurveyResponsesByUserAdmin() {
        EntityManager em = createEntityManager.createEntityManager();

        List<Object[]> results = entityManager.createNativeQuery(
                        "SELECT EXTRACT(MONTH FROM created_at) AS month, COUNT(*) as total_survey " +
                                "FROM surveys " +
                                "GROUP BY month"
                )
                .getResultList();
        List<Object[]> results1 = entityManager.createNativeQuery(
                        "SELECT EXTRACT(MONTH FROM create_at) AS month, COUNT(*) as total " +
                                "FROM votes " +
                                "GROUP BY month"
                )
                .getResultList();
        List<MonthlyTotalDto> totalSurvey = results.stream().map(row -> MonthlyTotalDto.builder()
                .month(row[0])
                .total(row[1])
                .build()
        ).toList();
        List<MonthlyTotalDto> totalVote = results1.stream().map(row -> MonthlyTotalDto.builder()
                .month(row[0])
                .total(row[1])
                .build()
        ).toList();

        return MonthlyDto.builder()
                .survey(totalSurvey)
                .vote(totalVote)
                .build();
    }

}
