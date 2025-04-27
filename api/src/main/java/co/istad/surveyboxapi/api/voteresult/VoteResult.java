package co.istad.surveyboxapi.api.voteresult;

import co.istad.surveyboxapi.api.user.User;
import co.istad.surveyboxapi.api.vote.Vote;
import co.istad.surveyboxapi.api.voteresultset.VoteResultSet;
import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "vote_result")
public class VoteResult {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "vote_id")
    private Vote vote;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
    @ManyToOne
    @JoinColumn(name = "vote_result_id")
    private VoteResultSet voteResultSet;
    private String email;
    private String username;

}
