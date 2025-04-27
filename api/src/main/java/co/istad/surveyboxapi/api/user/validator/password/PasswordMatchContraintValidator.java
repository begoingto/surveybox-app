package co.istad.surveyboxapi.api.user.validator.password;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.beans.BeanWrapperImpl;

public class PasswordMatchContraintValidator implements ConstraintValidator<PasswordMatch, Object> {
    private String pwd;
    private String cpd;
    private String message;

    @Override
    public void initialize(PasswordMatch constraintAnnotation) {
        this.pwd = constraintAnnotation.password();
        this.cpd=constraintAnnotation.confirmPassword();
        this.message = constraintAnnotation.message();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        Object passwordVal= new BeanWrapperImpl(value).getPropertyValue(this.pwd);
        Object confirmVal=new BeanWrapperImpl(value).getPropertyValue(this.cpd);
        boolean isValid=false;
        if(passwordVal!=null){
            isValid=passwordVal.equals(confirmVal);
        }
        if(!isValid){
            context.disableDefaultConstraintViolation();

            context.buildConstraintViolationWithTemplate(this.message)
                    .addPropertyNode(this.pwd)
                    .addConstraintViolation();
            context.buildConstraintViolationWithTemplate(this.message)
                    .addPropertyNode(this.cpd)
                    .addConstraintViolation();

        }

        return isValid;
    }
}
