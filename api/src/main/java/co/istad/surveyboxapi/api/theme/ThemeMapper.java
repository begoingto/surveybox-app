package co.istad.surveyboxapi.api.theme;

import co.istad.surveyboxapi.api.survey.web.CreatedByDto;
import co.istad.surveyboxapi.util.JsonNodeHandler;
import org.apache.ibatis.annotations.*;

@Mapper
public interface ThemeMapper {

    @InsertProvider(type = ThemeProvider.class, method = "buildInsertTheme")
    @Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
    void insertTheme(@Param("s") Theme theme);
    @Select("SELECT id, name, theme, created_at, updated_at FROM themes WHERE id = #{id}")
    @Results(id = "surveyUserResult", value = {
            @Result(column = "id",property = "id"),
            @Result(column = "name", property = "name"),
           // @Result(column = "theme",property = "theme"),
            @Result(column = "created_by",property = "createdBy", javaType = CreatedByDto.class, one = @One(select = "loadUserSurvey")),
    })
    Theme findById(Long id);

    @Select("SELECT id,first_name,last_name,email FROM users WHERE id=#{id} LIMIT 1")
    @Results(id = "surveyUserResult1", value = {
            @Result(column = "id",property = "id"),
            @Result(column = "first_name", property = "firstName"),
            @Result(column = "last_name", property = "lastName"),
            @Result(column = "email", property = "email")
    })
    CreatedByDto loadUserSurvey(Long id);

}
