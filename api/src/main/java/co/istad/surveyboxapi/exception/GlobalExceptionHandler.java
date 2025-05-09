package co.istad.surveyboxapi.exception;

import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;


@ControllerAdvice
public class GlobalExceptionHandler {
	
	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<?> handleConstraintViolationException(ConstraintViolationException e){
		ErrorResponse errorResponse = new ErrorResponse(HttpStatus.BAD_REQUEST.getReasonPhrase(), e.getMessage());
		return ResponseEntity.status(HttpStatus.BAD_REQUEST)
				.body(errorResponse);
	}
	
	@ExceptionHandler(ApiExceptionResponseMessage.class)
	public ResponseEntity<?> handleHttpClientError(ApiExceptionResponseMessage e){
		ErrorResponse errorResponse = new ErrorResponse(e.getStatus().getReasonPhrase(), e.getMessage());
		return ResponseEntity.status(e.getStatus())
				.body(errorResponse);
	}
	
	

}
