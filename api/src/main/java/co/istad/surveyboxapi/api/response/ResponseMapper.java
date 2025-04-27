package co.istad.surveyboxapi.api.response;

import co.istad.surveyboxapi.api.response.web.ResponseSurveyDto;
import co.istad.surveyboxapi.util.JsonTypeHandler;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;
import java.util.List;

@Mapper
@Repository
public interface ResponseMapper {
    @InsertProvider(type = ResponseProvider.class, method = "buildInsertResponseSql")
    @Options(useGeneratedKeys = true, keyColumn = "id", keyProperty = "id")
    void insertResponse(@Param("r") Response response);

   @SelectProvider(type = ResponseProvider.class, method = "buildBySurveyIdSql")
   @Results(id = "responseSurveyMap" ,value = {
      @Result(column = "id",property = "id"),
      @Result(column = "answer" ,property = "answer")
   })
   List<ResponseSurveyDto> getBySurveyId(@Param("surveyId") Long surveyId);
}
