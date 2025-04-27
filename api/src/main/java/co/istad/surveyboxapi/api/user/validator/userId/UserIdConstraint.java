package co.istad.surveyboxapi.api.user.validator.userId;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = UserIdConstraintValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.METHOD})
public @interface UserIdConstraint {
    String message() default "The user id field is not valid.";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
