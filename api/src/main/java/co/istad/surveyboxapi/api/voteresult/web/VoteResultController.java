package co.istad.surveyboxapi.api.voteresult.web;

import co.istad.surveyboxapi.api.user.UserService;
import co.istad.surveyboxapi.api.vote.VoteRepository;
import co.istad.surveyboxapi.api.voteresult.VoteResultService;
import co.istad.surveyboxapi.api.voteresult.web.dto.VoteDataDisplayDto;
import co.istad.surveyboxapi.api.voteresult.web.dto.VoteResultDto;
import co.istad.surveyboxapi.base.BaseApi;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/vote-results")
@RequiredArgsConstructor
@Slf4j
public class VoteResultController {
    private final VoteResultService voteResultService;
    private final UserService userService;
    private final VoteRepository voteRepository;
@PostMapping("/{voteId}/submit")
public BaseApi<?> responseResultVote(@PathVariable Long voteId, @RequestBody @Valid VoteResultDto voteResultDto) {
    VoteResultDto resultDto = voteResultService.responseVote(voteId, voteResultDto);
    return BaseApi.builder()
            .code(HttpStatus.OK.value())
            .data(resultDto)
            .message("Vote response submitted successfully.")
            .status(true)
            .timeStamp(LocalDateTime.now())
            .build();
}
    @GetMapping("{voteResultId}")
    public BaseApi<?> getVoteResult(@PathVariable("voteResultId") Long voteResultId) {
        VoteDataDisplayDto resultDto=voteResultService.getById(voteResultId);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .data(resultDto)
                .message("Vote result retrieved successfully.")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }

}
