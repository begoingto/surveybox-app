package co.istad.surveyboxapi.api.questiontemplate;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@AllArgsConstructor
@Getter
@Setter
@RequiredArgsConstructor
@Table(name = "question_templates")
public class QuestionTemplate {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(name = "parent_id",nullable = true)
    private Long parentId;
}
