package co.istad.surveyboxapi.api.voteresultset;

import co.istad.surveyboxapi.api.voteresult.VoteResult;
import co.istad.surveyboxapi.api.voteresultset.web.VoteResultDataDisplay;
import co.istad.surveyboxapi.api.voteresultset.web.VoteResultSetDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface VoteResultSetMapper {

    VoteResultSetMapper INSTANCE = Mappers.getMapper(VoteResultSetMapper.class);
    @Mapping(target = "image", source = "image")
    @Mapping(target = "vote.id", source = "voteId")
    VoteResultSet toEntity(VoteResultSetDto voteResultSetDto);

    @Mapping(target = "image", source = "image")
    @Mapping(target = "voteId", source = "vote.id")
    VoteResultSetDto toDto(VoteResultSet voteResultSet);

}

