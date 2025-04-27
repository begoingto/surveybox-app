package co.istad.surveyboxapi.api.voteresultset;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoteResultSetRepository extends JpaRepository<VoteResultSet,Long> {

}
