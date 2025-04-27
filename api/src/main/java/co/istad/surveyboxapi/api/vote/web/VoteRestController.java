package co.istad.surveyboxapi.api.vote.web;

import co.istad.surveyboxapi.api.vote.Vote;
import co.istad.surveyboxapi.api.vote.VoteMapper;
import co.istad.surveyboxapi.api.vote.VoteService;
import co.istad.surveyboxapi.base.BaseApi;
import co.istad.surveyboxapi.util.PageMapper;
import co.istad.surveyboxapi.util.dto.PageDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/votes")
@RequiredArgsConstructor
public class VoteRestController {
    private final VoteService voteService;
    @PostMapping
    public BaseApi<?> createVote(@RequestBody  @Valid VoteDto voteDTOs){
        VoteDto createdVotes = voteService.CreateVote(voteDTOs);
      return BaseApi.builder()
              .code(HttpStatus.OK.value())
              .data(createdVotes)
              .message("Vote created successfully")
              .status(true)
              .timeStamp(LocalDateTime.now())
              .build();
    }
    @GetMapping("{id}")
    public BaseApi<?> getVoteById(@PathVariable("id") Long id){

        Vote voteDto1=voteService.getVoteById(id);
        VoteDto voteDto=VoteMapper.INSTANCE.toDTO(voteDto1);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .data(voteDto)
                .message("Vote with ID " + id + " retrieved successfully.")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }
    @DeleteMapping("{id}")
    public BaseApi<Object> deleteVote(@PathVariable("id") Long id){
       Map<String,Object> map= voteService.deleteVoteById(id);
        return  BaseApi.builder()
                .code(HttpStatus.OK.value())
                .data(map)
                .message("Vote with ID " + id + " deleted successfully.")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }
    @GetMapping
    public BaseApi<?>selectAllVote(@RequestParam Map<String,String>params){
        Page<Vote> page = voteService.getAllVote(params);
        PageDTO dto = PageMapper.INSTANCE.toDTO(page);
        dto.setList(page.get().map(VoteMapper.INSTANCE::toDTO).toList());
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .data(dto)
                .message("All votes retrieved successfully.")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }
    @PutMapping("/{id}")
    public BaseApi<?>updateById(@PathVariable("id") Long id,@RequestBody @Valid VoteDto voteDto){

        voteDto.setId(id);
        VoteDto voteDto1=voteService.update(id,voteDto);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .data(voteDto1)
                .message("Vote with ID " + id + " updated successfully.")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }
    @GetMapping("/response")
    public BaseApi<?> getTotalSurveyResponseByMonth1() {
        List<Map<String, Object>> results = voteService.getVoteResultsList();
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("Total survey responses retrieved successfully.")
                .timeStamp(LocalDateTime.now())
                .data(results)
                .status(true)
                .build();
    }
    @GetMapping("uuid/{uuid}")
    public BaseApi<?> getVoteByUUid(@PathVariable("uuid") String uuid) {
      Vote votes= voteService.getVoteByUuid(uuid);
        VoteDto voteDto=VoteMapper.INSTANCE.toDTO(votes);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .message("find vote by uuid successfully")
                .timeStamp(LocalDateTime.now())
                .data(voteDto)
                .status(true)
                .build();
    }
    @GetMapping("response/{id}")
    public BaseApi<?> getVoteResponseById(@PathVariable("id") Long voteId){

        Map<String, Object> result= voteService.getVoteResultsById(voteId);
       // VoteDto voteDto=VoteMapper.INSTANCE.toDTO(result);
        return BaseApi.builder()
                .code(HttpStatus.OK.value())
                .data(result)
                .message("Vote with ID "  + " retrieved successfully.")
                .status(true)
                .timeStamp(LocalDateTime.now())
                .build();
    }

}
