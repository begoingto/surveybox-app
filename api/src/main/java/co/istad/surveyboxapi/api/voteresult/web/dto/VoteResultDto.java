package co.istad.surveyboxapi.api.voteresult.web.dto;

import co.istad.surveyboxapi.api.response.constrant.SurveyResponseSubmitConstraint;
import co.istad.surveyboxapi.api.voteresult.constraint.VoteResponseSubmitConstraint;
import co.istad.surveyboxapi.api.voteresult.validator.ValidUserId;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
@VoteResponseSubmitConstraint
public class VoteResultDto {
//    @ValidUserId
//    Long userId;
    Long voteResultSetId;
    Long voteId;

    String email;

    String username;



}
