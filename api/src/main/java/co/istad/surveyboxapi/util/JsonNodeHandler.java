package co.istad.surveyboxapi.util;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.ibatis.jdbc.SQL;
import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;

import java.io.IOException;
import java.sql.*;


// used for insertion and also mapping with the list of object as well.   h
public class JsonNodeHandler implements TypeHandler<JsonNode> {
    private static final ObjectMapper objectMapper = new ObjectMapper();
    @Override
    public void setParameter(PreparedStatement ps, int i, JsonNode parameter, JdbcType jdbcType) throws SQLException {
        if(parameter == null){
            ps.setNull(i, Types.OTHER, "json");
        }else {
            ps.setObject(i,parameter.toString(), Types.OTHER);
        }
    }

    @Override
    public JsonNode getResult(ResultSet rs, String columnName) throws SQLException {
        try{

            String json = rs.getString(columnName);
            return json!= null ? objectMapper.readTree(json):
                    null;

        }catch (IOException ex ){
            throw new SQLException("failed to convert the JSON String to  jsonNode", ex );
        }

    }

    @Override
    public JsonNode getResult(ResultSet rs, int columnIndex) throws SQLException {

        try{
            String json = rs.getString(columnIndex);
            return json!= null ? objectMapper.readTree(json) : null;
        }catch (Exception ex ){
            throw new SQLException("Failed to convert JSON String to jsonNode ", ex );
        }

    }

    @Override
    public JsonNode getResult(CallableStatement cs, int columnIndex) throws SQLException {

        try{
            String json = cs.getString(columnIndex);
            return json!=null ? objectMapper.readTree(json) : null;
        }catch (IOException ex ){
            throw new SQLException("failed to convert JSON String to JsonNode ", ex);
        }

    }
}
