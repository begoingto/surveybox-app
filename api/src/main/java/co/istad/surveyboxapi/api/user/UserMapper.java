package co.istad.surveyboxapi.api.user;


import co.istad.surveyboxapi.api.auth.AuthProvider;
import co.istad.surveyboxapi.api.auth.Role;
import co.istad.surveyboxapi.api.survey.Survey;
import co.istad.surveyboxapi.api.user.web.CreateUser;
import co.istad.surveyboxapi.api.user.web.GetUserDto;
import co.istad.surveyboxapi.util.JsonTypeHandler;
import com.fasterxml.jackson.databind.JsonNode;
import org.apache.ibatis.annotations.*;
import java.util.List;
import java.util.Optional;

@Mapper

public interface UserMapper {
    @Update("UPDATE users SET is_active=#{isActive} WHERE id=#{id}")
    Boolean updateStatus(@Param("id") Long id,@Param("isActive") Boolean isActive);

    @Select("SELECT * FROM users WHERE id=#{id} LIMIT 1")
    Optional<User> findUserId(Long id);

    @SelectProvider(type = UserProvider.class, method = "buildSelectSql")
    @Results(id = "userResult", value = {
            @Result(column = "id",property = "id"),
            @Result(column = "first_name",property = "firstName"),
            @Result(column = "last_name",property = "lastName"),
            @Result(column = "is_active",property = "isActive"),
            @Result(column = "created_at",property = "createdAt"),
            @Result(column = "social_media", property = "socialMedias"),
            @Result(column = "id",property = "roles",many = @Many(select = "loadUserRoles"))
    })
    List<GetUserDto> select();


    @InsertProvider(type = UserProvider.class,method = "buildInsertSql")
    @Options(useGeneratedKeys = true, keyColumn = "id", keyProperty = "id")
    void insert(@Param("u") User user);


    @Select("SELECT EXISTS(SELECT * FROM roles WHERE id=#{roleId})")
    boolean checkRoleId(Long roleId);

    @Select("SELECT EXISTS(SELECT * FROM users WHERE id=#{id})")
    boolean checkUserId(Long id);

    @Select("SELECT EXISTS(SELECT * FROM users WHERE email=#{email} AND is_active=TRUE)")
    boolean checkUserActive(String email);


    @Insert("INSERT INTO users (first_name, last_name, gender, email, phone, dob, address, company, is_active, social_media, password) " +
            "VALUES (#{user.firstName}, #{user.lastName}, #{user.gender}, #{user.email}, #{user.phone}, #{user.dob}, " +
            "#{user.address}, #{user.company}, #{user.isActive}, #{user.socialMedias, jdbcType=OTHER,typeHandler=co.istad.surveyboxapi.util.JsonNodeHandler}, #{user.password})")
    void insertUser(@Param("user") CreateUser createUser);

    @SelectProvider(type = AuthProvider.class, method = "buildLoadUserRolesSql")
    @Results(id = "roleResult", value = {
            @Result(column = "id",property = "id"),
            @Result(column = "id",property = "authorities",many = @Many(select = "loadUserAuthorities"))
    })
    List<Role> loadUserRoles(@Param("id") Integer id);

    @SelectProvider(type = AuthProvider.class, method = "buildLoadUserAuthoritiesSql")
    List<Authority> loadUserAuthorities(Integer id);
}
