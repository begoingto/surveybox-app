package co.istad.surveyboxapi.api.question;

import co.istad.surveyboxapi.api.question.web.QuestionFilters;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.builder.annotation.ProviderMethodResolver;
import org.apache.ibatis.jdbc.SQL;

public class QuestionProvider implements ProviderMethodResolver {
    public String findAll(@Param("f") QuestionFilters filters) {
        return new SQL(){{
            SELECT("*");
            FROM("questions");
            if (filters.createdBy()!=null){
                WHERE("created_by=#{f.createdBy}");
            }
            if (!filters.name().isEmpty()){
                WHERE("name LIKE CONCAT('%',#{f.name},'%')");
            }
            if (filters.categoryId()!=null){
                WHERE("category_id=#{f.categoryId}");
            }
            if (!filters.questionType().isEmpty()){
                WHERE("question_type=#{f.questionType}");
            }
            if (!filters.sortBy().isEmpty() && !filters.sortDirection().isEmpty()){
                ORDER_BY(filters.sortBy()+" "+filters.sortDirection());
            }else {
                ORDER_BY("created_at DESC");
            }
        }}.toString();
    }
}
