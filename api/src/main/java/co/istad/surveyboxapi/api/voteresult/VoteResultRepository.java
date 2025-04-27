package co.istad.surveyboxapi.api.voteresult;

import co.istad.surveyboxapi.api.vote.Vote;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VoteResultRepository extends JpaRepository<VoteResult,Long> {

}
