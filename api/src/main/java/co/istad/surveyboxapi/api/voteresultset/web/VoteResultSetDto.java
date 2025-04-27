package co.istad.surveyboxapi.api.voteresultset.web;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class VoteResultSetDto {
        Long id;
//        @NotBlank(message = "{required.field}")
        String value;
//        @NotBlank(message = "{required.field}")
        String image;
        Long voteId;
}
