package co.istad.surveyboxapi.api.voteresult;

import co.istad.surveyboxapi.api.user.UserService;
import co.istad.surveyboxapi.api.vote.VoteService;
import co.istad.surveyboxapi.api.voteresult.web.dto.VoteDataDisplayDto;
import co.istad.surveyboxapi.api.voteresult.web.dto.VoteResultDto;
import co.istad.surveyboxapi.api.voteresult.web.dto.VoteResultDtoForAnonymous;
import co.istad.surveyboxapi.api.voteresultset.VoteResultSet;
import co.istad.surveyboxapi.api.voteresultset.VoteResultSetService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring"
        ,uses = {VoteService.class, VoteResultSetService.class, UserService.class})
public interface VoteResultMapStruct {
    VoteResultMapStruct INSTANCE = Mappers.getMapper(VoteResultMapStruct.class);

    VoteResult toEntity(VoteResultDto voteResultDto);

    VoteResultDto toDto(VoteResult voteResult);

   // @Mapping(source = "voteId", target = "vote.id")
   // @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "voteResultSetId", target = "voteResultSet.id")
    VoteResult toVoteResultSet(VoteResultDto voteResultDto);

    VoteResultDtoForAnonymous forAnonymousDto(VoteResultDto voteResultDto);

    VoteResult toResult(VoteResultDtoForAnonymous voteResultDtoForAnonymous);

    List<VoteResultSet> toVoteResultSets(List<VoteResultDto> voteResultDtos);

    @Mapping(source = "voteResult.vote.id", target = "voteId")
    @Mapping(source = "voteResult.user.id", target = "userId")
    @Mapping(source = "voteResult.voteResultSet", target = "voteResultSet")
    @Mapping(source = "voteResult.voteResultSet.id", target = "voteResultSet.voteResultId")
    VoteDataDisplayDto toDtoDisplay(VoteResult voteResult);


}
