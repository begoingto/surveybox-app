package co.istad.surveyboxapi.api.voteresult.constraint;

import co.istad.surveyboxapi.api.response.constrant.SurveyResponseSubmitConstraintValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Constraint(validatedBy = VoteResponseSubmitConstraintValidator.class)
@Retention(RUNTIME)
@Target(ElementType.TYPE)
public @interface VoteResponseSubmitConstraint {
    String message() default "The vote option is REQUIRED than required name and email.";

    Class<?>[] groups() default { };

    Class<? extends Payload>[] payload() default { };

    String userId() default "userId";

    String surveyId() default "voteId";
    String email() default "email";

    String username() default "username";

    @Target({ ElementType.TYPE })
    @Retention(RUNTIME)
    @Documented
    @interface List {
        VoteResponseSubmitConstraint[] value();
    }
}
