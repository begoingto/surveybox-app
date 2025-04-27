package co.istad.surveyboxapi.api.voteresultset.web;

import co.istad.surveyboxapi.api.voteresultset.VoteResultSet;
import co.istad.surveyboxapi.api.voteresultset.VoteResultSetMapper;
import co.istad.surveyboxapi.api.voteresultset.VoteResultSetService;
import co.istad.surveyboxapi.base.BaseApi;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/v1/vote-result-set")
@RequiredArgsConstructor
public class VoteResultSetController {
        private final VoteResultSetService voteResultSetService;

        @PostMapping
        public BaseApi<?> createVoteResultSet(@RequestBody @Valid VoteResultSetDto voteResultSetDto){
            VoteResultSet voteResultSet =VoteResultSetMapper.INSTANCE.toEntity(voteResultSetDto);
            VoteResultSet voteResultSet1=voteResultSetService.createVoteResultSet(voteResultSet);
            return BaseApi.builder()
                    .code(HttpStatus.OK.value())
                    .data(voteResultSet1)
                    .message("Result Vote Created Successfully")
                    .status(true)
                    .timeStamp(LocalDateTime.now())
                    .build();
        }
        @GetMapping("{id}")
        public BaseApi<?> getVoteResultSetById(@PathVariable("id") Long id){
            VoteResultSet voteResultSet=voteResultSetService.getVoteResultSetById(id);
            return BaseApi.builder()
                    .code(HttpStatus.OK.value())
                    .data(voteResultSet)
                    .message("Get voted result Successfully")
                    .status(true)
                    .timeStamp(LocalDateTime.now())
                    .build();
        }
}
