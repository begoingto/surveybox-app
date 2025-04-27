package co.istad.surveyboxapi.api.auth;

import co.istad.surveyboxapi.api.auth.web.PersonalInfo;
import co.istad.surveyboxapi.api.auth.web.UpdateAuthMe;
import co.istad.surveyboxapi.api.auth.web.UserAuthGoogleDto;
import co.istad.surveyboxapi.api.user.Authority;
import co.istad.surveyboxapi.api.user.User;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Mapper
@Repository
public interface AuthMapper {
    @InsertProvider(type = AuthProvider.class, method = "buildRegisterSql")
    @Options(useGeneratedKeys = true,keyColumn = "id",keyProperty = "id")
    boolean register(@Param("u") User user);

    @Select("SELECT * FROM users WHERE email=#{e} AND is_active=TRUE")
    @Results(id = "authResult", value = {
            @Result(column = "id",property = "id"),
            @Result(column = "first_name",property = "firstName"),
            @Result(column = "last_name",property = "lastName"),
            @Result(column = "gender",property = "gender"),
            @Result(column = "auth_provider",property = "authProvider"),
            @Result(column = "is_verified",property = "isVerified"),
            @Result(column = "verified_code",property = "verifiedCode"),
            @Result(column = "first_login",property = "firstLogin"),
            @Result(column = "social_media",property = "socialMedias"),
            @Result(column = "id",property = "roles",many = @Many(select = "loadUserRoles"))
    })
    Optional<User> selectByEmail(@Param("e") String email);
    @Select("SELECT * FROM users WHERE email=#{e} AND is_active=FALSE")
    @ResultMap("authResult")
    Optional<User> selectSendMailEmail(@Param("e") String email);

    @Select("SELECT * FROM users WHERE email=#{e} AND is_active=FALSE AND is_verified=FALSE")
    @ResultMap("authResult")
    Optional<User> selectSendMailUpdateEmail(@Param("e") String email);

    @Select("SELECT * FROM users WHERE email = #{email} AND is_active = TRUE AND is_verified = TRUE")
    @ResultMap("authResult")
    Optional<User> selectSendMailEmailForgetPassword(@Param("email") String email);

    @Select("SELECT * FROM users WHERE email=#{u.email} AND is_active=TRUE AND is_verified=TRUE AND provider_account_id=#{u.providerAccountId} AND provider_name=#{u.providerName}")
    @ResultMap("authResult")
    Optional<User> selectByAuthGoogle(@Param("u") UserAuthGoogleDto authGoogleDto);

    @Select("SELECT * FROM users WHERE email = #{u.email} AND id != #{id}")
    Optional<User> selectEmailAndId(@Param("u") User user,@Param("id") Long id);


    @InsertProvider(type = AuthProvider.class, method = "buildInsertUserGoogleSql")
    @Options(useGeneratedKeys = true,keyColumn = "id",keyProperty = "id")
    void insertUserGoogle(@Param("u") User user);

    @UpdateProvider(type = AuthProvider.class, method = "buildUpdateAuthGoogleSql")
    void updateAuthGoogle(@Param("u") User user);


    @UpdateProvider(type = AuthProvider.class, method = "buildUpdateVerifiedCodeSql")
    boolean updateVerifiedCode(@Param("email") String email,@Param("code") String verifiedCode);

    @SelectProvider(type = AuthProvider.class, method = "buildSelectByEmailAndVerifiedCodeSql")
    @ResultMap("authResult")
    Optional<User> selectByEmailAndVerifiedCode(@Param("email") String email,@Param("code") String verifiedCode);

    @UpdateProvider(type = AuthProvider.class, method = "buildUpdateIsVerifyStatusSql")
    void updateIsVerifyStatus(@Param("email") String email,@Param("code") String verifiedCode);


    @Select("SELECT * FROM users WHERE email=#{e} AND is_verified=TRUE")
    @ResultMap("authResult")
    Optional<User> loadUserByUsername(@Param("e") String email);

    @SelectProvider(type = AuthProvider.class, method = "buildLoadUserRolesSql")
    @Results(id = "roleResult", value = {
           @Result(column = "id",property = "id"),
           @Result(column = "id",property = "authorities",many = @Many(select = "loadUserAuthorities"))
    })
    List<Role> loadUserRoles(@Param("id") Integer id);

    @InsertProvider(type = AuthProvider.class, method = "buildRegisterCreateUserRoleSql")
    void createUserRole(@Param("userId") Long userId, @Param("roleId") Long roleId);

    @SelectProvider(type = AuthProvider.class, method = "buildLoadUserAuthoritiesSql")
    List<Authority> loadUserAuthorities(Integer id);


    @UpdateProvider(type = AuthProvider.class, method = "buildPersonalInfoSql")
    void personalInfo(@Param("u") PersonalInfo personalInfo);

    @UpdateProvider(type = AuthProvider.class, method = "buildUpdatePasswordSql")
    void newPassword(Long id, String password);

    @UpdateProvider(type = AuthProvider.class, method = "buildUpdateUserProfileSql")
    int updateUserProfile(@Param("u") User user);


    @UpdateProvider(type = AuthProvider.class,method = "buildUpdateEmailVerifiedCodeSql")
    Boolean updateVerificationCode(@Param("email") String email);

    @Select("SELECT EXISTS(SELECT * FROM users WHERE email=#{email})")
    boolean checkUserExistByEmail(String email);

}
