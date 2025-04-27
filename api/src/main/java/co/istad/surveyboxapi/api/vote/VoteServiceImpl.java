package co.istad.surveyboxapi.api.vote;

import co.istad.surveyboxapi.api.auth.Role;
import co.istad.surveyboxapi.api.auth.web.AuthMeDto;
import co.istad.surveyboxapi.api.user.User;
import co.istad.surveyboxapi.api.user.UserRepository;
import co.istad.surveyboxapi.api.vote.enumop.Choosing;
import co.istad.surveyboxapi.api.vote.enumop.VoteOption;
import co.istad.surveyboxapi.api.vote.web.VoteDto;
import co.istad.surveyboxapi.api.voteresultset.VoteResultSet;
import co.istad.surveyboxapi.api.voteresultset.VoteResultSetRepository;
import co.istad.surveyboxapi.api.voteresultset.web.VoteResultSetDto;
import co.istad.surveyboxapi.exception.ResourceNotFoundException;
import co.istad.surveyboxapi.exception.ResourceNotFoundExceptionUuid;
import co.istad.surveyboxapi.security.currentuser.IAuthenticationFacade;
import co.istad.surveyboxapi.util.PageUtils;
import co.istad.surveyboxapi.util.QRCodeGenerator;
import com.google.zxing.WriterException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class VoteServiceImpl implements VoteService {
    private final VoteRepository voteRepository;
    private final VoteMapper voteMapper;
    private final JdbcTemplate jdbcTemplate;
    private final VoteResultSetRepository voteResultSetRepository;
    private final IAuthenticationFacade iAuthenticationFacade;
    private final UserRepository userRepository;
    private final QRCodeGenerator qrCodeGenerator;

    @Override
    public VoteDto CreateVote(VoteDto voteDTO) {
        UUID uuid = UUID.randomUUID();
        voteDTO.setUuid(uuid.toString());
        try {
            String qrCode = qrCodeGenerator.generateQRCodePathVote(voteDTO.getUuid());
            voteDTO.setQrCode(qrCode);
        } catch (WriterException | IOException e) {
            throw new RuntimeException(e);
        }
        AuthMeDto authMeDto=iAuthenticationFacade.getAuthMeDto();
        User user = userRepository.findById(authMeDto.id())
                .orElseThrow(() -> new ResourceNotFoundException("User", authMeDto.id()));

        Vote vote = voteMapper.toEntity(voteDTO);
        vote.setUser(user);
        vote.setCreateAt(new Date());
        for (VoteResultSet voteResultSet : vote.getVoteResultSets()) {
            voteResultSet.setVote(vote);
        }
        vote = voteRepository.save(vote);
        return voteMapper.toDTO(vote);

    }

    private void setQuestionCreatedBy(Vote vote) {
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        User user = new User();
        user.setId(authMeDto.id());
        user.setFirstName(authMeDto.firstName());
        user.setLastName(authMeDto.lastName());
        user.setEmail(authMeDto.email());
        vote.setUser(user);
    }
    @Override
    public Vote getVoteById(Long id) {
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();

        Vote vote = voteRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vote", id));

        if (!vote.getUser().getId().equals(authMeDto.id())) {
            throw new ResourceNotFoundException("You are not authorized to access this question.",id);
        }

        return vote;
    }

    @Override
    public Map<String, Object> deleteVoteById(Long id) {
        if (id == null || id <= 0) {
            throw new IllegalArgumentException("The given id must not be null or negative");
        }
        Vote vote = getVoteById(id);
        setQuestionCreatedBy(vote);
        for (VoteResultSet voteResultSet : vote.getVoteResultSets()) {
            voteResultSet.setVote(null);
            voteResultSetRepository.delete(voteResultSet);
        }
        voteRepository.delete(vote);
        Map<String, Object> response = new HashMap<>();
        response.put("id", vote.getId());
        response.put("title", vote.getTitle());
        return response;
    }

    @Override
    public Page<Vote> getAllVote(Map<String, String> params) {
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        var roles = authMeDto.roles().stream().map(Role::getName).toList();
        if (roles.contains("ADMIN")) {
            Pageable pageable = PageUtils.getPageableWithSort(params, Sort.by(Sort.Direction.DESC, "id"));
            return voteRepository.findAll(pageable);
        } else {
            Pageable pageable = PageUtils.getPageableWithSort(params, Sort.by(Sort.Direction.DESC, "id"));
            Specification<Vote> userSpec = (root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("user").get("id"), authMeDto.id());
            return voteRepository.findAll(userSpec, pageable);
        }
    }


    @Override
    @Transactional
    public VoteDto update(Long id, VoteDto voteDto) {

        Vote vote = getVoteById(id);
        vote.setTitle(voteDto.getTitle());
        vote.setVoteOption(VoteOption.valueOf(voteDto.getVoteOption()));
        vote.setChoosing(Choosing.valueOf(voteDto.getChoosing()));
        vote.setStatus(voteDto.getStatus());

// Update the VoteResultSet entities
        if (voteDto.getVoteResultSets() != null) {
            for (VoteResultSetDto voteResultSetDto : voteDto.getVoteResultSets()) {
                if (voteResultSetDto.getId() != null) {
                    // Update an existing VoteResultSet entity
                    Optional<VoteResultSet> voteResultSetOptional = voteResultSetRepository.findById(voteResultSetDto.getId());
                    if (voteResultSetOptional.isPresent()) {
                        VoteResultSet voteResultSet = voteResultSetOptional.get();
                        voteResultSet.setValue(voteResultSetDto.getValue());
                        voteResultSet.setImage(voteResultSetDto.getImage());
                    }
                } else {
                    // Create a new VoteResultSet entity
                    VoteResultSet voteResultSet = new VoteResultSet();
                    voteResultSet.setValue(voteResultSetDto.getValue());
                    voteResultSet.setImage(voteResultSetDto.getImage());
                    voteResultSet.setVote(vote);
                    vote.addVoteResulSet(voteResultSet);
                }
            }
        }

        setQuestionCreatedBy(vote);
        voteRepository.save(vote);

        return voteMapper.toDTO(vote);
    }
    public List<Map<String, Object>> getVoteResultsList() {
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        String sql = "SELECT v.title, v.id, vrs.image, vs.vote_result_id, vrs.value, COUNT(vs.id) AS vote_count," +
                "  COUNT(vs.id) * 100.0 / SUM(COUNT(vs.id)) OVER (PARTITION BY v.id) AS vote_percentage" +
                " FROM votes v" +
                " JOIN vote_result vs ON vs.vote_id = v.id" +
                " JOIN vote_result_set vrs ON vs.vote_result_id = vrs.id" +
                " WHERE v.created_by = ?" +  // add a WHERE clause to filter by user ID
                " GROUP BY v.title, v.id, vs.vote_result_id, vrs.value, vrs.image;";

        List<Map<String, Object>> voteResults = jdbcTemplate.query(sql, new Object[]{authMeDto.id()}, new ResultSetExtractor<List<Map<String, Object>>>() {
            @Override
            public List<Map<String, Object>> extractData(ResultSet rs) throws SQLException, DataAccessException {
                Map<Integer, Map<String, Object>> resultMap = new HashMap<>();
                while (rs.next()) {
                    int voteId = rs.getInt("id");
                    if (!resultMap.containsKey(voteId)) {
                        Map<String, Object> voteMap = new HashMap<>();
                        voteMap.put("voteId", voteId);
                        voteMap.put("title", rs.getString("title"));
                      //  voteMap.put("image",rs.getString("image"));
                        voteMap.put("result", new ArrayList<Map<String, Object>>());
                        resultMap.put(voteId, voteMap);
                    }
                    Map<String, Object> resultData = new HashMap<>();
                    resultData.put("value", rs.getString("value"));
                    resultData.put("voteCount", rs.getInt("vote_count"));
                    resultData.put("votePercentage", rs.getDouble("vote_percentage"));
                    resultData.put("image",rs.getString("image"));
                    ((List<Map<String, Object>>) resultMap.get(voteId).get("result")).add(resultData);
                }
                return new ArrayList<Map<String, Object>>(resultMap.values());
            }
        });

        return voteResults;
    }

    @Override
    public Vote getVoteByUuid(String uuid) {
      Vote votes=  voteRepository.findByUuid(uuid)
              .orElseThrow(() -> new ResourceNotFoundExceptionUuid("Vote", uuid));
      log.info(" UUid {}",votes.getUuid());
        return votes;
    }
    public Map<String, Object> getVoteResultsById(Long voteId) {
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();

        String sql = "SELECT v.title, v.id, vrs.image, vs.vote_result_id, vrs.value, " +
                "string_agg(DISTINCT vs.username, ', ') AS usernames, " +
                "string_agg(DISTINCT vs.email, ', ') AS emails, " +
                "COUNT(vs.id) AS vote_count, " +
                "COUNT(vs.id) * 100.0 / SUM(COUNT(vs.id)) OVER (PARTITION BY v.id) AS vote_percentage " +
                "FROM votes v " +
                "JOIN vote_result vs ON vs.vote_id = v.id " +
                "JOIN vote_result_set vrs ON vs.vote_result_id = vrs.id " +
                "WHERE v.created_by = ? AND v.id = ? " +
                "GROUP BY v.title, v.id, vs.vote_result_id, vrs.value, vrs.image;";

        List<Map<String, Object>> voteResults = jdbcTemplate.query(sql, new Object[]{authMeDto.id(), voteId}, new ResultSetExtractor<List<Map<String, Object>>>() {
            @Override
            public List<Map<String, Object>> extractData(ResultSet rs) throws SQLException, DataAccessException {
                List<Map<String, Object>> results = new ArrayList<>();
                while (rs.next()) {
                    Map<String, Object> result = new HashMap<>();
                    result.put("title", rs.getString("title"));
                    result.put("voteId", rs.getLong("id"));
                    result.put("image", rs.getString("image"));
                    result.put("voteResultId", rs.getLong("vote_result_id"));
                    result.put("value", rs.getString("value"));
                    result.put("usernames", rs.getString("usernames"));
                    result.put("email",rs.getString("emails"));
                    result.put("voteCount", rs.getInt("vote_count"));
                    result.put("votePercentage", rs.getDouble("vote_percentage"));
                    results.add(result);
                }
                return results;
            }
        });

        Map<String, Object> response = new HashMap<>();
        response.put("result", voteResults);
        response.put("voteId", voteId);
        response.put("title", voteResults.size() > 0 ? voteResults.get(0).get("title") : null);
        return response;
    }
}