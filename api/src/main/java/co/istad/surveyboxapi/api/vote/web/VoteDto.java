package co.istad.surveyboxapi.api.vote.web;

import co.istad.surveyboxapi.api.survey.web.CreatedByDto;
import co.istad.surveyboxapi.api.voteresultset.web.VoteResultSetDto;
import jakarta.validation.constraints.NotBlank;
import lombok.Builder;
import lombok.Data;


import java.util.Date;
import java.util.List;

@Builder
@Data
public class VoteDto {
    Long id;
    @NotBlank(message = "{cannot.be.blank}")
    String title;
    Boolean status;
    @NotBlank(message = "{required.field}")
    String choosing;
    @NotBlank(message = "{cannot.be.blank}")
    String voteOption;
    Date createAt;
    String uuid;
    String qrCode;
    CreatedByDto user;
    private List<VoteResultSetDto> voteResultSets;
}
