package co.istad.surveyboxapi.api.user.validator.active;

import co.istad.surveyboxapi.api.user.validator.role.RoleIdConstraintValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = ActiveConstraintValidator.class)
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD, ElementType.METHOD})
public @interface ActiveConstraint {
    String message() default "The account have been disabled.";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };
}
