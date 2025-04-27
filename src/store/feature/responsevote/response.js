import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchVote = createAsyncThunk('responses/fetchVote', async ({uuid}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/votes/uuid/${uuid}`)
    return await response.json()
})


const responsesVoteSlice = createSlice({
    name: 'responsesVote',
    initialState: {
        vote: null,
        status: 'idle', // idle, loading, succeeded, failed
        error: null
    },
    reducers: {
        // right now we don't have any actions because we're using createAsyncThunk
    },
    extraReducers(builder) {
        builder.addCase(fetchVote.pending, (state, action) => {
            state.status = 'loading'
        })
            .addCase(fetchVote.fulfilled, (state, action) => {
                const { data } = action.payload
                state.status = 'success'
                state.vote = data
            })
            .addCase(fetchVote.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })
    }
})

// export actions
export const { } = responsesVoteSlice.actions

// export reducer
export default responsesVoteSlice.reducer

// export selectors
export const selectResponseVote = state => state.responsesVote.vote

export const selectResStatus = state => state.responsesVote.status
export const selectResError = state => state.responsesVote.error