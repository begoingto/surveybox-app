package co.istad.surveyboxapi.api.voteresultset;

import co.istad.surveyboxapi.api.question.Question;
import co.istad.surveyboxapi.api.vote.Vote;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "vote_result_set")
public class VoteResultSet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String value;
    private String image;
    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "vote_id")
    private Vote vote;
    public void setQuestion(Vote vote) {
        this.vote = vote;
    }
}
