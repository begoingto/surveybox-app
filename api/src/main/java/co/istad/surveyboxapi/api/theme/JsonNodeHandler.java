package co.istad.surveyboxapi.api.theme;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter
public class JsonNodeHandler implements AttributeConverter<JsonNode, String> {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(JsonNode jsonNode) {
        try {
            return MAPPER.writeValueAsString(jsonNode);
        } catch (Exception ex) {
            throw new RuntimeException("Error converting JsonNode to String: " + ex.getMessage(), ex);
        }
    }

    @Override
    public JsonNode convertToEntityAttribute(String str) {
        try {
            return MAPPER.readTree(str);
        } catch (Exception ex) {
            throw new RuntimeException("Error converting String to JsonNode: " + ex.getMessage(), ex);
        }
    }
}