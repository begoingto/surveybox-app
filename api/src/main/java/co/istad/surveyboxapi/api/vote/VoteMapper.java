package co.istad.surveyboxapi.api.vote;

import co.istad.surveyboxapi.api.vote.web.VoteDto;
import co.istad.surveyboxapi.api.voteresultset.VoteResultSet;
import co.istad.surveyboxapi.api.voteresultset.web.VoteResultSetDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

import java.util.List;

@Mapper(componentModel = "spring")
public interface VoteMapper {
    VoteMapper INSTANCE= Mappers.getMapper(VoteMapper.class);
     VoteDto toDTO(Vote vote);
     Vote toEntity(VoteDto voteDTO);
    List<VoteDto>toDtoList(List<Vote>votes);
    List<Vote>toEntityListVote(List<VoteDto>voteDtos);
    @Mapping(target = "voteId",source = "vote.id")
    VoteResultSetDto toDTO(VoteResultSet voteResultSet);
    VoteResultSet toEntity(VoteResultSetDto voteResultSetDTO);
    List<VoteResultSetDto> toDTOList(List<VoteResultSet> voteResultSets);
    List<VoteResultSet> toEntityList(List<VoteResultSetDto> voteResultSetDTOs);
    @Mapping(target = "voteResultSets", ignore = true)
    void updateFromDto(VoteDto voteDto, @MappingTarget Vote vote);
}
