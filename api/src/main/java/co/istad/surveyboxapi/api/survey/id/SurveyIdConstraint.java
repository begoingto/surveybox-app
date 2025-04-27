package co.istad.surveyboxapi.api.survey.id;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = SurveyIdConstraintValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.METHOD})
public @interface SurveyIdConstraint {
    String message() default "The survey id field is not valid.";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
