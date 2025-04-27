package co.istad.surveyboxapi.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@Getter
@Setter
public class ResourceNotFoundExceptionUuid extends ApiExceptionResponseMessage{
    private String resourceName;
    private String resourceId;
    public ResourceNotFoundExceptionUuid(String resourceName, String resourceId) {
        super(HttpStatus.NOT_FOUND, String.format("%s not found for uuid=%s", resourceName, resourceId));
    }
}
