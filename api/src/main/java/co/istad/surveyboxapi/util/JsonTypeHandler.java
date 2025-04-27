package co.istad.surveyboxapi.util;
import co.istad.surveyboxapi.api.survey.web.SurveyQuestion;
import co.istad.surveyboxapi.api.user.SocialMedias;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.type.BaseTypeHandler;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.MappedTypes;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.sql.*;
import java.util.Map;

@MappedTypes({SocialMedias.class, SurveyQuestion.class})
@Slf4j
public class JsonTypeHandler extends BaseTypeHandler<Object> {

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public void setNonNullParameter(PreparedStatement ps, int i, Object parameter, JdbcType jdbcType) throws SQLException {
        try {
            String json = objectMapper.writeValueAsString(parameter);
            ps.setString(i, json);
        } catch (JsonProcessingException e) {
            throw new SQLException("Error converting object to JSON string", e);
        }
    }

    @Override
    public Object getNullableResult(ResultSet rs, String columnName) throws SQLException {
                String json = rs.getString(columnName);
                if (columnName.equals("social_media")) {
                    if (json == null || json.isEmpty()) {
                        return null;
                    }
                    try {
                        return objectMapper.readValue(json, SocialMedias.class);
                    } catch (JsonProcessingException e) {
                        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Social media is not valid JSON", e);
                    }
                }
                return parseJson(rs.getString(columnName));
    }

    @Override
    public Object getNullableResult(ResultSet rs, int columnIndex) throws SQLException {
        return parseJson(rs.getString(columnIndex));
    }

    @Override
    public Object getNullableResult(CallableStatement cs, int columnIndex) throws SQLException {
        return parseJson(cs.getString(columnIndex));
    }

    private Object parseJson(String json) throws SQLException {
        if (json == null || json.isEmpty()) {
            return null;
        }

        try {
            return objectMapper.readValue(json, Object.class); //objectMapper.readValue(json, HashMap.class);
        } catch (IOException e) {
            throw new SQLException("Error converting JSON string to object", e);
        }
    }
}
