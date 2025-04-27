package co.istad.surveyboxapi.api.survey;

import co.istad.surveyboxapi.api.survey.web.*;
import co.istad.surveyboxapi.util.JsonTypeHandler;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Mapper
@Repository
public interface SurveyMybatisMapper {

    @Update("UPDATE surveys SET status = CASE WHEN #{status} = TRUE THEN TRUE ELSE FALSE END WHERE id=#{id}")
    Boolean updateStatus(@Param("id") Long id,@Param("status") Boolean status);

    @InsertProvider(type = SurveyProvider.class, method = "buildInsertSurveySql")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    void insertSurvey(@Param("s") Survey survey);


    @UpdateProvider(type = SurveyProvider.class,method = "buildUpdateSurveyQuestionSql")
    void insertSurveyQuestion(@Param("id") Long id, @Param("s") String survey);

    @SelectProvider(type = SurveyProvider.class, method = "buildSelectSql")
    @Results(id = "surveyResult", value = {
            @Result(column = "id",property = "id"),
            @Result(column = "title",property = "title"),
            @Result(column = "description",property = "description"),
            @Result(column = "survey_option",property = "surveyOption"),
            @Result(column = "cover",property = "cover"),
            @Result(column = "qr_code",property = "qrCode"),
            @Result(column = "display_question",property = "displayQuestion"),
            @Result(column = "icon_welcome",property = "iconWelcome"),
            @Result(column = "icon_success",property = "iconSuccess"),
            @Result(column = "created_by",property = "createdBy", javaType = CreatedByDto.class, one = @One(select = "loadUserSurvey")),
            @Result(column = "id",property = "answered", javaType = ArrayList.class, many = @Many(select = "loadSurveyResponse")),
            @Result(column = "survey_question",property = "surveyQuestions",typeHandler = JsonTypeHandler.class)
    })
    List<SurveyResponse> select(@Param("f") FilterDto filterDto);

    @SelectProvider(type = SurveyProvider.class, method = "buildSelectByUserSql")
    @Results(id = "surveyResult2", value = {
            @Result(column = "id",property = "id"),
            @Result(column = "title",property = "title"),
            @Result(column = "description",property = "description"),
            @Result(column = "survey_option",property = "surveyOption"),
            @Result(column = "cover",property = "cover"),
            @Result(column = "qr_code",property = "qrCode"),
            @Result(column = "display_question",property = "displayQuestion"),
            @Result(column = "icon_welcome",property = "iconWelcome"),
            @Result(column = "icon_success",property = "iconSuccess"),
            @Result(column = "start_date",property = "startDate"),
            @Result(column = "end_date",property = "endDate"),
            @Result(column = "created_at",property = "dateCreated"),
            @Result(column = "msg_success",property = "msgSuccess"),
            @Result(column = "msg_welcome",property = "msgWelcome"),
            @Result(column = "status",property = "status"),
            @Result(column = "uuid",property = "uuid"),
            @Result(column = "created_by",property = "createdBy", javaType = CreatedByDto.class, one = @One(select = "loadUserSurvey")),
            @Result(column = "id",property = "answered", many = @Many(select = "loadSurveyResponse")),
            @Result(column = "survey_question",property = "surveyQuestions",typeHandler = JsonTypeHandler.class)
    })
    List<SurveyResponse> selectByUser(@Param("id") Long id,@Param("f") FilterDto filterDto);

    @SelectProvider(type = SurveyProvider.class, method = "buildSelectByIdSql")
    @ResultMap("surveyResult2")
    Optional<SurveyResponse> selectById(Long id);

    @Select("SELECT id,first_name,last_name,email FROM users WHERE id=#{id} LIMIT 1")
    @Results(id = "surveyUserResult", value = {
            @Result(column = "id",property = "id"),
            @Result(column = "first_name", property = "firstName"),
            @Result(column = "last_name", property = "lastName"),
            @Result(column = "email", property = "email")
    })
    CreatedByDto loadUserSurvey(Long id);

    @Select("SELECT * FROM surveys WHERE id=#{id} LIMIT 1")
    @ResultMap("surveyResult2")
    Optional<SurveyResponse> findSurveyById(Long id);
    @Select("SELECT * FROM surveys WHERE uuid=#{uuid} LIMIT 1")
    @ResultMap("surveyResult2")
    Optional<SurveyResponse> findSurveyByUuid(String uuid);

    @Select("SELECT * FROM surveys WHERE id=#{id} LIMIT 1")
    Optional<Survey> findSurveyId(Long id);

    @UpdateProvider(type = SurveyProvider.class,method = "buildUpdateInfoSurveySql")
    void updateInfoSurvey(@Param("id") Long id, @Param("s") SurveyDto surveyDto);

    @Select("SELECT EXISTS(SELECT * FROM surveys WHERE id=#{id})")
    boolean checkSurveyId(Long id);

    @SelectProvider(type = SurveyProvider.class, method = "buildSurveyResponseBySurveyIdSql")
    @Results(id = "surveyResultResponse",value = {
            @Result(column = "id",property = "id"),
            @Result(column = "user_id",property = "user", one = @One(select = "loadUserResponseById")),
            @Result(column = "survey_id",property = "surveyId"),
            @Result(column = "username",property = "username"),
            @Result(column = "email",property = "email"),
            @Result(column = "answer",property = "answer", typeHandler = JsonTypeHandler.class)
    })
    List<SurveyResponseAnswersDto> loadSurveyResponse(Long id);

    @Select("SELECT id,first_name,last_name,email,CONCAT(first_name,' ', last_name) AS username FROM users WHERE id=#{id} LIMIT 1")
    @Results(id = "surveyUserResultResponse", value = {
            @Result(column = "id",property = "id"),
            @Result(column = "first_name", property = "firstName"),
            @Result(column = "last_name", property = "lastName"),
            @Result(column = "email", property = "email"),
            @Result(column = "username", property = "username")
    })
    CreatedByDto loadUserResponseById(Long id);
}
