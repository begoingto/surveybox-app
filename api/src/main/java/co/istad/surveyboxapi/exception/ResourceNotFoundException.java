package co.istad.surveyboxapi.exception;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

@SuppressWarnings("serial")
@Getter
@Setter
public class ResourceNotFoundException extends ApiExceptionResponseMessage {
	
	private String resourceName;
	private Long resourceId;
	
	public ResourceNotFoundException(String resourceName, Long resourceId) {
		super(HttpStatus.NOT_FOUND, String.format("%s not found for id=%d", resourceName, resourceId));
	}
	

}
