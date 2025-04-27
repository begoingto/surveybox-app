package co.istad.surveyboxapi.api.user;
import org.apache.ibatis.jdbc.SQL;

public class UserProvider {
    private final String table = "users";


    public String buildSelectSql(){
        return new SQL(){{
            SELECT("*");
            FROM(table);
        }}.toString();
    }


    public String buildInsertSql(){
        return new SQL(){{
            INSERT_INTO(table);
            VALUES("first_name","#{u.firstName}");
            VALUES("last_name","#{u.lastName}");
            VALUES("gender","#{u.gender}");
            VALUES("email","#{u.email}");
            VALUES("phone","#{u.phone}");
            VALUES("dob","#{u.dob}");
            VALUES("address","#{u.address}");
            VALUES("company","#{u.company}");
            VALUES("is_active","#{u.isActive}");
            VALUES("social_media","CAST(#{u.socialMedias} AS JSON)");
            VALUES("password","#{u.password}");
//            VALUES("role_id","1");
        }}.toString();
    }
}
