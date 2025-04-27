package co.istad.surveyboxapi.api.voteresultset;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class VoteResultSetServiceImpl implements VoteResultSetService{
    private final VoteResultSetRepository voteResultSetRepository;
    @Override
    public VoteResultSet createVoteResultSet(VoteResultSet voteResultSet) {
        return voteResultSetRepository.save(voteResultSet);
    }

    @Override
    public VoteResultSet getVoteResultSetById(Long id) {
       VoteResultSet resultSet= voteResultSetRepository.findById(id).orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND
                ,String.format("VoteResultSet with %d not found",id)));
        return resultSet;
    }

}
