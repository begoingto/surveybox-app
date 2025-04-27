package co.istad.surveyboxapi.api.answerset;

import co.istad.surveyboxapi.api.question.Question;
import co.istad.surveyboxapi.base.AuditEntity;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "answer_set")
public class AnswerSet extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String img;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id")
    private Question questions;

    public Object getQuestion() {
        return null;
    }
    public void setQuestion(Question question) {
        this.questions = question;
    }
}
