package co.istad.surveyboxapi.api.question;

import co.istad.surveyboxapi.api.answerset.AnswerSet;
import co.istad.surveyboxapi.api.category.Category;
import co.istad.surveyboxapi.api.user.User;
import co.istad.surveyboxapi.base.AuditEntity;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "questions")
public class Question extends AuditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;
    @Column(name = " question_type")
    @Enumerated(EnumType.STRING)
    private QuestionType  questionType;
    @Column(name = "answer_template")
    private String answerTemplate;
    private String layout;
    private boolean required;
    @ManyToOne
    @JoinColumn(name = "created_by",nullable = false)
    private User user;
    @OneToMany(mappedBy = "questions", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<AnswerSet> answerSet = new ArrayList<>();

    public void addAnswerSet(AnswerSet answerSet) {
        this.answerSet.add(answerSet);
        answerSet.setQuestion(this);
    }

    private String answerOption;
}

