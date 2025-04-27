package co.istad.surveyboxapi.api.vote.web;

import lombok.Data;

@Data
public class VoteResultData {
    private int id;
    private String title;
    private int voteResultId;
    private String value;
    private int voteCount;
    private double votePercentage;
    private double totalVote;


    public VoteResultData() {
        // no-args constructor
    }


    public VoteResultData(String title ,int id, int voteResultId, String value, int voteCount, double votePercentage) {
        this.id=id;
        this.title = title;
        this.value = value;
        this.voteCount = voteCount;
        this.votePercentage = votePercentage;
        this.voteResultId=voteResultId;
    }
}

