package co.istad.surveyboxapi.api.survey.id;

import co.istad.surveyboxapi.api.survey.SurveyMybatisMapper;
import co.istad.surveyboxapi.api.user.UserMapper;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class SurveyIdConstraintValidator implements ConstraintValidator<SurveyIdConstraint,Long> {
    private final SurveyMybatisMapper surveyMybatisMapper;
    @Override
    public boolean isValid(Long id, ConstraintValidatorContext context) {
        return surveyMybatisMapper.checkSurveyId(id);
    }
}
