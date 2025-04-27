import { createSlice } from "@reduxjs/toolkit";

const voteSlice = createSlice({
    name: 'vote',
    initialState: {
        vote: null,
        isLoading: true,
        voteResultSets: [],
    },
    reducers: {
        addVote(state, action) {
            state.vote = action.payload;
        },
        setIsLoading(state, action) {
            state.isLoading = action.payload;
        },
        addVoteResultSets(state, action) {
            state.voteResultSets = action.payload;
        },
        addVoteResultSet(state, action) {
            state.voteResultSets.push(action.payload);
        },
        removeVoteResultSet(state, action) {
            const index = action.payload;
            state.voteResultSets = state.voteResultSets.filter((item, i) => i !== index);
        },
        editVoteResultSet(state, action) {
            const { index, value } = action.payload;
            state.voteResultSets[index].value = value;
        },
    }
});

export const {
    addVote,
    addVoteResultSets,
    addVoteResultSet,
    setIsLoading,
    removeVoteResultSet,
    editVoteResultSet,
} = voteSlice.actions;

export default voteSlice.reducer;

export const selectVote = state => state.vote.vote;
export const selectIsLoading = state => state.vote.isLoading;
export const selectVoteResultSets = state => state.vote.voteResultSets;
