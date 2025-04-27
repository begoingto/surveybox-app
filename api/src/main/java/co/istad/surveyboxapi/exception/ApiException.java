package co.istad.surveyboxapi.exception;

import co.istad.surveyboxapi.base.BaseError;
import org.hibernate.dialect.PostgreSQLDialect;
import org.hibernate.dialect.sequence.PostgreSQLSequenceSupport;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.server.ResponseStatusException;

import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestControllerAdvice
public class ApiException {
    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(ResponseStatusException.class)
    public BaseError<?> handleServiceException(ResponseStatusException e) {

        return BaseError.builder()
                .errors(e.getReason()).
                status(false).
                messages("Something went wrong")
                .code(e.getStatusCode().value())
                .timeStamp(LocalDateTime.now()).

                build();

    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(HttpMessageNotWritableException.class)
    public BaseError<?> handleServiceException(HttpMessageNotWritableException e) {

        return BaseError.builder()
                .errors(e.getMessage()).
                status(false).
                messages("Not Writable")
                .code(HttpStatus.BAD_REQUEST.value())
                .timeStamp(LocalDateTime.now()).

                build();

    }

    @ResponseStatus(HttpStatus.NOT_FOUND)
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public BaseError<?> handleHttpMessageNotReadableException(HttpMessageNotReadableException e) {

        return BaseError.builder()
                .errors(e.getMessage())
                .status(false)
                .messages("Enum value not correct")
                .code(HttpStatus.BAD_REQUEST.value())
                .timeStamp(LocalDateTime.now())
                .build();

    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(DataIntegrityViolationException.class)
    public BaseError<?> handleDataIntegrityViolationException(DataIntegrityViolationException e){
        return BaseError.builder()
                .errors(e.getMessage()).
                status(false)
                .messages("Something went wrong")
                .code(HttpStatus.BAD_REQUEST.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler( SQLException.class)
    public BaseError<?> emailE(SQLException e){
        return BaseError.builder()
                .errors(e.getMessage()).
                status(false)
                .messages("Something went wrong")
                .code(HttpStatus.BAD_REQUEST.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public BaseError<?> HttpRequestMethodNotSupportedException(HttpRequestMethodNotSupportedException e) {

        return BaseError.builder()
                .errors(e.getMessage()).
                status(false).
                messages("Something went wrong")
                .code(e.getStatusCode().value())
                .timeStamp(LocalDateTime.now()).
                build();

    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IllegalArgumentException.class)
    public BaseError<?> IllegalArgumentException1(IllegalArgumentException e) {

        return BaseError.builder()
                .errors(e.getMessage()).
                status(false).
                messages("Something went wrong")
                .code(HttpStatus.BAD_REQUEST.value())
                .timeStamp(LocalDateTime.now()).
                build();

    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public BaseError<?> MaxUploadSizeExceededException(MaxUploadSizeExceededException e) {

        return BaseError.builder()
                .errors(e.getMessage()).
                status(false).
                messages("Something went wrong  ")
                .code(HttpStatus.BAD_REQUEST.value())
                .timeStamp(LocalDateTime.now()).

                build();

    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public BaseError<?> handleValidationException(MethodArgumentNotValidException ex) {
        List<Map<String, String>> er = new ArrayList<>();
        for (FieldError err : ex.getFieldErrors()) {
            Map<String, String> errorsDetails = new HashMap<>();
            errorsDetails.put("name", err.getField());
            errorsDetails.put("message", err.getDefaultMessage());
            er.add(errorsDetails);

        }
        return BaseError.builder()
                .errors(er)
                .status(false)
                .messages("validation error")
                .code(HttpStatus.BAD_REQUEST.value())
                .timeStamp(LocalDateTime.now())
                .build();
    }

    @ExceptionHandler(FileNotFoundException.class)
    public String handleFileNotFoundException(FileNotFoundException ex) {
        String fileName = ex.getMessage();
        // Get the name of the file causing the exception
        if (fileName.endsWith(".exe")) {
            // Handle the exception for files with ".exe" extension
            // You can perform custom error handling or return a specific response
            return "error-page-for-exe-files";
        }
        // For other cases of FileNotFoundException, you can handle them as per your requirement
        return "generic-error-page";
    }
}
