package co.istad.surveyboxapi.api.feedback.web;// FeedbackMapper.java

import co.istad.surveyboxapi.api.feedback.Feedback;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface FeedbackMapper {

  @Select("SELECT f.* FROM feedbacks" +
          " f JOIN (SELECT feedback_by, MAX(rating) " +
          "AS max_rating FROM feedbacks GROUP BY feedback_by) t" +
          " ON f.feedback_by = t.feedback_by AND f.rating = t.max_rating LIMIT 4")
  List<Feedback> findHighestRatedFeedbacks();

}