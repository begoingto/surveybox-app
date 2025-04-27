package co.istad.surveyboxapi.api.survey.web;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class SurveyQuestion implements Serializable {
    private ArrayList<QuestionSurveyDto> questions;
}
