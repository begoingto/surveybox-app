package co.istad.surveyboxapi.api.vote;

import co.istad.surveyboxapi.api.vote.web.VoteDto;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.Map;


public interface VoteService {

 VoteDto CreateVote(VoteDto voteDTO);
 Vote getVoteById(Long id);
    Map<String, Object> deleteVoteById(Long id);
    Page<Vote> getAllVote(Map<String,String>params);
    VoteDto update(Long id, VoteDto voteDto);
    List<Map<String, Object>> getVoteResultsList();
    Vote getVoteByUuid(String uuid);
    Map<String, Object> getVoteResultsById(Long voteId);

}
