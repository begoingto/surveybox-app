package co.istad.surveyboxapi.api.feedback;

import co.istad.surveyboxapi.api.auth.Role;
import co.istad.surveyboxapi.api.auth.web.AuthMeDto;
import co.istad.surveyboxapi.api.feedback.web.FeedbackDto;
import co.istad.surveyboxapi.api.feedback.web.FeedbackDto1;
import co.istad.surveyboxapi.api.feedback.web.UserDto;
import co.istad.surveyboxapi.api.feedback.web.filter.FeedbackFilter;
import co.istad.surveyboxapi.api.feedback.web.spec.FeedbackSpec;
import co.istad.surveyboxapi.api.user.User;
import co.istad.surveyboxapi.security.currentuser.IAuthenticationFacade;
import co.istad.surveyboxapi.util.PageUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections4.MapUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class FeedbackServiceImpl implements FeedbackService {
    private final FeedbackRepository feedbackRepository;
    private final IAuthenticationFacade iAuthenticationFacade;
    private final FeedbackMapper feedbackMapper;
    private final JdbcTemplate jdbcTemplate;
    private final co.istad.surveyboxapi.api.feedback.web.FeedbackMapper feedbackMapper1;

    private void setQuestionCreatedBy(Feedback feedback) {
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        User user = new User();
        user.setId(authMeDto.id());
        user.setFirstName(authMeDto.firstName());
        user.setLastName(authMeDto.lastName());
        user.setEmail(authMeDto.email());
        feedback.setUser(user);
    }

    @Override
    public FeedbackDto createFeedback(FeedbackDto feedbackDto) {
        AuthMeDto authMeDto = iAuthenticationFacade.getAuthMeDto();
        var roles = authMeDto.roles().stream().map(Role::getName).toList();
        if (roles.contains("ADMIN")){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot Feedback");
        }
        Feedback feedback = feedbackMapper.toEntity(feedbackDto);
        setQuestionCreatedBy(feedback);
        feedback.setCreatedAt(LocalDateTime.now()); // Set the createdAt field to the current date and time

        feedback = feedbackRepository.save(feedback);

        return feedbackMapper.toDto(feedback);
    }
    @Override
    public Page<Feedback> getAllFeedback(Map<String,String> params) {

        Pageable pageable=PageUtils.getPageable(params);
        FeedbackFilter feedbackFilter=new FeedbackFilter();
        if(params.containsKey("feedBackId")){
            feedbackFilter.setFeedBackId(MapUtils.getLong(params,"feedBackId"));
        }
        FeedbackSpec feedbackSpec=new FeedbackSpec(feedbackFilter);
        return feedbackRepository.findAll(feedbackSpec, pageable);
    }
@Override
public List<FeedbackDto1> findHighestRatedFeedbacks() {
    String sql = "SELECT f.*, u.avatar, u.first_name, u.email, u.last_name, u.company\n" +
            "FROM feedbacks f\n" +
            "JOIN (\n" +
            "  SELECT feedback_by, MAX(created_at) AS max_created_at\n" +
            "  FROM feedbacks\n" +
            "  GROUP BY feedback_by \n" +
            ") t ON f.feedback_by = t.feedback_by AND f.created_at = t.max_created_at\n" +
            "JOIN users u ON f.feedback_by = u.id\n" +
            "ORDER BY t.max_created_at DESC\n" +
            "LIMIT 6";
    return jdbcTemplate.query(sql, (rs, rowNum) -> {
        Feedback feedback = new Feedback();
        feedback.setId(rs.getLong("id"));
        feedback.setRating(rs.getInt("rating"));
        feedback.setDescription(rs.getString("description"));
        feedback.setCreatedAt(rs.getObject("created_at", LocalDateTime.class));
        User user = new User();
        user.setId(rs.getLong("feedback_by"));
        user.setFirstName(rs.getString("first_name"));
        user.setAvatar(rs.getString("avatar"));
        user.setEmail(rs.getString("email"));
        user.setCompany(rs.getString("company"));
        user.setLastName(rs.getString("last_name"));
        feedback.setUser(user);

        FeedbackDto1 feedbackDto1 = new FeedbackDto1();
        feedbackDto1.setDescription(feedback.getDescription());
        feedbackDto1.setRating(feedback.getRating());
        feedbackDto1.setCreatedAt(feedback.getCreatedAt());

        co.istad.surveyboxapi.api.feedback.web.UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setEmail(user.getEmail());
        userDto.setAvatar(user.getAvatar());
        userDto.setCompany(user.getCompany());
        feedbackDto1.setFeedBackBy(userDto);

        return feedbackDto1;
    });
}

}



