import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const submitVotes = createAsyncThunk('submitVote/submitVoteOption', async ({id,answers}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/vote-results/${id}/submit`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers)
    })
    return await response.json()
})

const submitVoteSlice = createSlice({
    name: 'submitVote',
    initialState: {
        vote: null,
        status: 'idle', // idle, loading, succeeded, failed
        error: null
    },
    reducers: {
        // right now we don't have any actions because we're using createAsyncThunk
    },
    extraReducers(builder) {
        builder.addCase(submitVotes.pending, (state, action) => {
            state.status = 'loading'
        })
            .addCase(submitVotes.fulfilled, (state, action) => {
                const { data } = action.payload

                if (action.payload?.errors){
                    state.status = 'failed'

                    state.error = action.payload
                }else {
                    state.status = 'success'
                    state.votes = data
                }
            })
            .addCase(submitVotes.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })
    }
})

// export actions
export const { } = submitVoteSlice.actions

// export reducer
export default submitVoteSlice.reducer

// export selectors
export const selectSubmitVote = state => state.submitVote.survey
export const selectSubVoteStatus = state => state.submitVote.status
export const selectSubVoteError = state => state.submitVote.errors