package co.istad.surveyboxapi.api.auth;

import co.istad.surveyboxapi.api.auth.web.UpdateAuthMe;
import co.istad.surveyboxapi.api.user.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.jdbc.SQL;

import java.util.Map;

public class AuthProvider {
    private final String TABLE = "users";
    public String buildRegisterSql(){
        return new SQL(){{
            INSERT_INTO(TABLE);
            VALUES("first_name","#{u.firstName}");
            VALUES("gender", "'Male'");
            VALUES("email","#{u.email}");
            VALUES("password","#{u.password}");
            VALUES("provider_name","#{u.providerName}");
            VALUES("updated_at","#{u.createdAt}");
            VALUES("created_at","#{u.updatedAt}");
            VALUES("is_verified","FALSE");
        }}.toString();
    }

    public String buildInsertUserGoogleSql(){
        return new SQL(){{
            INSERT_INTO(TABLE);
            VALUES("first_name","#{u.firstName}");
            VALUES("last_name","#{u.lastName}");
            VALUES("gender", "'Male'");
            VALUES("email","#{u.email}");
            VALUES("password","#{u.password}");
            VALUES("provider_account_id","#{u.providerAccountId}");
            VALUES("provider_name","#{u.providerName}");
            VALUES("is_verified","TRUE");
            VALUES("is_active","TRUE");
            VALUES("avatar","#{u.avatar}");
            VALUES("created_at","#{u.createdAt}");
            VALUES("updated_at","#{u.updatedAt}");
        }}.toString();
    }

    public String buildUpdateAuthGoogleSql(){
        return new SQL(){{
            UPDATE(TABLE);
            SET("first_name=#{u.firstName}",
                    "last_name=#{u.lastName}",
                    "avatar=#{u.avatar}","provider_account_id=#{u.providerAccountId}",
                    "provider_name=#{u.providerName}"
            );
            WHERE("email=#{u.email}");
        }}.toString();
    }

    public String buildRegisterCreateUserRoleSql(){
        return new SQL(){{
            INSERT_INTO("users_roles");
            VALUES("user_id","#{userId}");
            VALUES("role_id","#{roleId}");
        }}.toString();
    }

    public String buildUpdateVerifiedCodeSql(){
        return new SQL(){{
            UPDATE(TABLE);
            SET("verified_code=#{code}", "is_verified=FALSE", "is_active=FALSE");
            WHERE("email=#{email}");
        }}.toString();
    }

    public String buildSelectByEmailAndVerifiedCodeSql(){
        return new SQL(){{
            SELECT("*");
            FROM(TABLE);
            WHERE("email=#{email}","verified_code=#{code}");
        }}.toString();
    }

    public String buildUpdateIsVerifyStatusSql(){
        return new SQL(){{
            UPDATE(TABLE);
            SET("is_active=TRUE");
            SET("is_verified=TRUE");
            WHERE("email=#{email}","verified_code=#{code}");
        }}.toString();
    }

    public String buildLoadUserRolesSql(){
        return new SQL(){{
            SELECT("r.id,r.name");
            FROM("roles AS r");
            INNER_JOIN("users_roles as ur ON ur.role_id=r.id");
            WHERE("ur.user_id=#{id}");
        }}.toString();
    }

    public String buildLoadUserAuthoritiesSql(){
        return new SQL(){{
            SELECT("a.id,a.name");
            FROM("authorities AS a");
            INNER_JOIN("roles_authorities as ra ON ra.authority_id=a.id");
            WHERE("ra.role_id=#{id}");
        }}.toString();
    }

    public String buildPersonalInfoSql(){
        return  new SQL(){{
            UPDATE(TABLE);
            SET("phone=#{u.phone}", "dob=#{u.dob}","first_login=TRUE", "address=#{u.address}", "company=#{u.company}", "position=#{u.position}", "avatar=#{u.avatar}");
            WHERE("email=#{u.email}");
        }}.toString();
    }

    public String buildUpdatePasswordSql(){
        return new SQL(){{
            UPDATE(TABLE);
            SET("password=#{password}");
            WHERE("id=#{id}");
        }}.toString();
    }

public String buildUpdateUserProfileSql(@Param("u") User user) {
    return new SQL() {{
        UPDATE(TABLE);
        SET("first_name=#{u.firstName}",
                "last_name=#{u.lastName}",
                "phone=#{u.phone}",
                "dob=#{u.dob}",
                "gender=#{u.gender}",
                "email=#{u.email}",
                "avatar=#{u.avatar}",
                "is_verified=#{u.isVerified}",
                "verified_code=#{u.verifiedCode}",
                "is_active=#{u.isActive}",
                "address=#{u.address}",
                "company=#{u.company}",
                "position=#{u.position}",
                "social_media=CAST(#{u.socialMedias} AS JSON)"
        );
        if (user.getProviderAccountId()!=null){
            SET("provider_account_id=#{u.providerAccountId}");
        }
        if (user.getProviderName()!=null){
            SET("provide_name=#{u.providerName}");
        }
        WHERE("id=#{u.id}");
    }}.toString();
}


    public String buildUpdateEmailVerifiedCodeSql() {
        return new SQL() {{
            UPDATE(TABLE);
            SET("is_active=FALSE");
            SET("is_verified=FALSE");
            WHERE("email=#{email}");
        }}.toString();
    }
}
