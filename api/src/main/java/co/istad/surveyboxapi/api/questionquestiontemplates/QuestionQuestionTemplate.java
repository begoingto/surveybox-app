package co.istad.surveyboxapi.api.questionquestiontemplates;

import co.istad.surveyboxapi.api.question.Question;
import co.istad.surveyboxapi.api.questiontemplate.QuestionTemplate;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@RequiredArgsConstructor
@Entity
@Getter
@Setter
@Table(name = "question_question_template")
public class QuestionQuestionTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_template_id")
    private QuestionTemplate questionTemplate;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
}
