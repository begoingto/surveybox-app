package co.istad.surveyboxapi.api.vote;

import co.istad.surveyboxapi.api.user.User;
import co.istad.surveyboxapi.api.vote.enumop.Choosing;
import co.istad.surveyboxapi.api.vote.enumop.VoteOption;
import co.istad.surveyboxapi.api.voteresultset.VoteResultSet;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "votes")
public class Vote {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Integer id;
    private String title;
    @Column(length = 15)
    @Enumerated(EnumType.STRING)
    private Choosing choosing;
    private  Boolean status;
    @Column(name = "vote_option")
    @Enumerated(EnumType.STRING)
    private VoteOption voteOption;
    @ManyToOne
    @JoinColumn(name = "created_by",nullable = false)
    private User user;
    @Column(name = "create_at")
    private Date createAt;
    @Column(name = "qr_code")
    private String qrCode;
    @Column(nullable = false)
    String uuid;
    @OneToMany(mappedBy = "vote", cascade = CascadeType.ALL, orphanRemoval = true)
    List<VoteResultSet>voteResultSets=new ArrayList<>();
    public void addVoteResulSet(VoteResultSet voteResultSet) {
        this.voteResultSets.add(voteResultSet);
        voteResultSet.setVote(this);
    }


}
