package co.istad.surveyboxapi.api.response.constrant;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Constraint(validatedBy = SurveyResponseSubmitConstraintValidator.class)
@Retention(RUNTIME)
@Target(ElementType.TYPE)
public @interface SurveyResponseSubmitConstraint {
    String message() default "The survey option is REQUIRED than required name and email.";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };

    String userId() default "userId";

    String surveyId() default "surveyId";
    String email() default "email";

    String username() default "username";

    @Target({ ElementType.TYPE })
    @Retention(RUNTIME)
    @Documented
    @interface List {
        SurveyResponseSubmitConstraint[] value();
    }
}
