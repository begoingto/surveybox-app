package co.istad.surveyboxapi.api.survey;

import co.istad.surveyboxapi.api.survey.web.FilterDto;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.jdbc.SQL;

@Slf4j
public class SurveyProvider {
    private final String TABLE = "surveys";

    public String buildInsertSurveySql(){
        return new SQL(){{
            INSERT_INTO(TABLE);
            VALUES("title","#{s.title}");
            VALUES("description","#{s.description}");
            VALUES("start_date","#{s.startDate}");
            VALUES("end_date","#{s.endDate}");
            VALUES("survey_option","#{s.surveyOption}");
            VALUES("cover","#{s.cover}");
            VALUES("qr_code","#{s.qrCode}");
            VALUES("msg_welcome","#{s.msgWelcome}");
            VALUES("msg_success","#{s.msgSuccess}");
            VALUES("display_question","#{s.displayQuestion}");
            VALUES("icon_success","#{s.iconSuccess}");
            VALUES("icon_welcome","#{s.iconWelcome}");
            VALUES("created_by","#{s.createdBy}");
            VALUES("uuid","#{s.uuid}");
            VALUES("created_at","#{s.dateCreated}");
        }}.toString();
    }

    public String buildSelectSql(@Param("f") FilterDto filterDto){
        return new SQL(){{
            SELECT("*");
            FROM(TABLE);
            if (filterDto.getCreatedBy()!=null){
                WHERE("created_by=#{f.createdBy}");
            }
            if(!filterDto.getTitle().isEmpty()){
                WHERE("title LIKE CONCAT('%',#{f.title},'%')");
            }
            if(filterDto.getStatus() != null){
                WHERE("status=#{f.status}");
            }
            if(filterDto.getSurveyOption() != null){
                WHERE("survey_option=#{f.surveyOption}");
            }
            if (!filterDto.getSortBy().isEmpty() && !filterDto.getSortDirection().isEmpty()){
                ORDER_BY(filterDto.getSortBy()+" "+filterDto.getSortDirection());
            }else {
                ORDER_BY("id DESC");
            }
        }}.toString();
    }

    public String buildSelectByUserSql(@Param("id") Long id, @Param("f") FilterDto filterDto){
        return new SQL(){{
            SELECT("*");
            FROM(TABLE);
            WHERE("created_by=#{id}");
            if(!filterDto.getTitle().isEmpty()){
                WHERE("title LIKE CONCAT('%',#{f.title},'%')");
            }
            if(filterDto.getStatus() != null){
                WHERE("status=#{f.status}");
            }
            if(filterDto.getSurveyOption() != null){
                WHERE("survey_option=#{f.surveyOption}");
            }
            if (!filterDto.getSortBy().isEmpty() && !filterDto.getSortDirection().isEmpty()){
                ORDER_BY(filterDto.getSortBy()+" "+filterDto.getSortDirection());
            }else {
                ORDER_BY("id DESC");
            }
        }}.toString();
    }

    public String buildUpdateSurveyQuestionSql(){
        return new SQL(){{
            UPDATE(TABLE);
            SET("survey_question=CAST(#{s} AS JSON)");
            WHERE("id=#{id}");
        }}.toString();
    }

    public String buildSelectByIdSql(){
        return new SQL(){{
            SELECT("*");
            FROM(TABLE);
            WHERE("id=#{id}");
        }}.toString();
    }

    public String buildUpdateInfoSurveySql(){
        return new SQL(){{
            UPDATE(TABLE);
            SET("title=#{s.title},description=#{s.description},survey_option=#{s.surveyOption},cover=#{s.cover},msg_welcome=#{s.msgWelcome},msg_success=#{s.msgSuccess},display_question=#{s.displayQuestion},icon_success=#{s.iconSuccess},icon_welcome=#{s.iconWelcome},start_date=#{s.startDate},end_date=#{s.endDate}");
            WHERE("id=#{id}");
        }}.toString();
    }

    public String buildSurveyResponseBySurveyIdSql(){
        return new SQL(){{
            SELECT("*");
            FROM("responses");
            WHERE("survey_id=#{id}");
        }}.toString();
    }
}
