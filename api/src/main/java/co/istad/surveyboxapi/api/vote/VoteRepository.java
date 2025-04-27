package co.istad.surveyboxapi.api.vote;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface VoteRepository extends JpaRepository<Vote,Long>, JpaSpecificationExecutor<Vote> {
    Optional<Vote> findByUuid(String uuid);
}
