package co.istad.surveyboxapi.api.voteresult;

import co.istad.surveyboxapi.api.voteresult.web.dto.VoteDataDisplayDto;
import co.istad.surveyboxapi.api.voteresult.web.dto.VoteResultDto;

public interface VoteResultService {
    VoteResultDto responseVote(Long voteId,VoteResultDto voteResultDTO);
    VoteDataDisplayDto getById(Long voteResultId);


}
