package co.istad.surveyboxapi.api.theme;

import org.apache.ibatis.jdbc.SQL;

public class ThemeProvider {
    private final String TABLE="themes";
    public String buildInsertTheme() {
        return new SQL() {{
            INSERT_INTO(TABLE);
            VALUES("name", "#{s.name}");
            VALUES("created_by","#{s.createdBy}");
            VALUES("theme", "#{s.theme, jdbcType=OTHER, typeHandler=co.istad.surveyboxapi.util.JsonNodeHandler}");
          //  VALUES("created_at", "#{s.createdAt}");
        }}.toString();
    }

}
