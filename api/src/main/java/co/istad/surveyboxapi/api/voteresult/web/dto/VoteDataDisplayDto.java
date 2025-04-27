package co.istad.surveyboxapi.api.voteresult.web.dto;

import co.istad.surveyboxapi.api.user.web.UserDto;
import co.istad.surveyboxapi.api.vote.web.VoteDto;
import co.istad.surveyboxapi.api.voteresultset.web.VoteResultDataDisplay;
import co.istad.surveyboxapi.api.voteresultset.web.VoteResultSetDto;
import lombok.Data;

@Data
public class VoteDataDisplayDto {
    private Long id;
    private Long voteId;
    private Long  userId;
    private VoteResultDataDisplay voteResultSet;

    public VoteDataDisplayDto() {
    }

    public VoteDataDisplayDto(Long id, Long voteId, Long userId, VoteResultDataDisplay voteResultSet) {
        this.id = id;
        this.voteId = voteId;
        this.userId = userId;
        this.voteResultSet = voteResultSet;
    }
}
