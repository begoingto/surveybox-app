import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    voteResultSets: [],
};

export const sbscVoteSettingSlice = createSlice({
    name: 'sbscVoteSetting',
    initialState,
    reducers: {
        addVoteSet: (state, action) => {
            const { value, image } = action.payload;
            state.voteResultSets.push({ value, image });
        },
    },
});

export const { addVoteSet } = sbscVoteSettingSlice.actions;

export default sbscVoteSettingSlice.reducer;

export const selectVoteResultSets = state => state.voteResultSets


