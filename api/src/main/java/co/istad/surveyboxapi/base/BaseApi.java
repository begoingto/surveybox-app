package co.istad.surveyboxapi.base;

import co.istad.surveyboxapi.api.auth.web.AuthMeDto;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
public record BaseApi<T>(
        String message,
        Integer code,
        Boolean status,
        LocalDateTime timeStamp,
        T data
) {

}
