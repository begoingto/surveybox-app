package co.istad.surveyboxapi.api.voteresult;

import co.istad.surveyboxapi.api.user.UserRepository;
import co.istad.surveyboxapi.api.user.UserService;
import co.istad.surveyboxapi.api.vote.Vote;
import co.istad.surveyboxapi.api.vote.VoteRepository;
import co.istad.surveyboxapi.api.vote.enumop.VoteOption;
import co.istad.surveyboxapi.api.voteresult.web.dto.VoteDataDisplayDto;
import co.istad.surveyboxapi.api.voteresult.web.dto.VoteResultDto;
import co.istad.surveyboxapi.api.voteresultset.VoteResultSet;
import co.istad.surveyboxapi.api.voteresultset.VoteResultSetRepository;
import co.istad.surveyboxapi.exception.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Slf4j
public class VoteResultServiceImpl implements VoteResultService {
    private final VoteResultRepository voteResultRepository;
    private final VoteRepository voteRepository;
    private final VoteResultSetRepository voteResultSetRepository;
    private final UserRepository userRepository;
    private final VoteResultMapper voteResultMapper;
    private final UserService userService;
    private final VoteResultMapStruct voteResultMapStruct;

    @Override
    public VoteResultDto responseVote(Long voteId, VoteResultDto voteResultDTO) {
        Vote vote = voteRepository.findById(voteId).orElseThrow(() -> new ResourceNotFoundException("Vote", voteId));

//        if (vote.getVoteOption() == VoteOption.REQUIRED) {
//            Long userId = voteResultDTO.getUserId();
//            if (userId == null || !userService.isValidUser(userId)) {
//                throw new ResourceNotFoundException("Invalid user ID", userId);
//            }
//        } else if (vote.getVoteOption() == VoteOption.ANONYMOUS) {
//            if (voteResultDTO.getUserId() != null) {
//                throw new ResourceNotFoundException("User with Id is not allowed for anonymous Vote", voteId);
//            }
//        }
//
//        VoteResultSet voteResultSet = null;
//
//        if (vote.getVoteOption() == VoteOption.ANONYMOUS) {
//            // If the vote option is anonymous, the vote result set ID must be specified
//            if (voteResultDTO.getVoteResultSetId() == null) {
//                throw new ResourceNotFoundException("Vote Result Set ID must be specified for anonymous Vote", voteId);
//            }
//
//            // Retrieve the vote result set from the database
//
//        }
        VoteResultSet  voteResultSet1 = voteResultSetRepository.findById(voteResultDTO.getVoteResultSetId())
                .orElseThrow(() -> new ResourceNotFoundException("Vote Result Set", voteResultDTO.getVoteResultSetId()));
        // Map the VoteResultDto to a VoteResult object using the MapStruct mapper
        VoteResult voteResult = voteResultMapStruct.toVoteResultSet(voteResultDTO);

        // Set the vote, user, and vote result set (if any) for the VoteResult object
        voteResult.setVote(vote);
      //  voteResult.setUser(vote.getVoteOption() == VoteOption.ANONYMOUS ? null : userRepository.findById(voteResultDTO.getUserId()).orElseThrow(() -> new ResourceNotFoundException("User", voteResultDTO.getUserId())));
      //  voteResult.setVoteResultSet(voteResultSet);
        voteResult.setVoteResultSet(voteResultSet1);

        // Save the VoteResult object to the database
        voteResultRepository.save(voteResult);

        // Return the VoteResultDto to the caller
        return voteResultDTO;
    }

    @Override
    public VoteDataDisplayDto getById(Long voteResultId) {
        Optional<VoteResult> voteResultOptional = voteResultRepository.findById(voteResultId);
        if (voteResultOptional.isPresent()) {
            VoteResult voteResult = voteResultOptional.get();
            return voteResultMapStruct.toDtoDisplay(voteResult);
        } else {
            throw new ResourceNotFoundException("Vote", voteResultId);
        }


    }

}