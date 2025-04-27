import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const fetchSurveyQuestions = createAsyncThunk('responses/fetchSurveyQuestions', async ({uuid}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/surveys/uuid/${uuid}`)
    return await response.json()
})

const responsesSlice = createSlice({
    name: 'responses',
    initialState: {
        questions: null,
        status: 'idle', // idle, loading, succeeded, failed
        error: null
    },
    reducers: {
        // right now we don't have any actions because we're using createAsyncThunk
    },
    extraReducers(builder) {
        builder.addCase(fetchSurveyQuestions.pending, (state, action) => {
            state.status = 'loading'
        })
            .addCase(fetchSurveyQuestions.fulfilled, (state, action) => {
                const { data } = action.payload
                state.status = 'success'
                state.questions = data
            })
            .addCase(fetchSurveyQuestions.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })
    }
})

// export actions
export const { } = responsesSlice.actions

// export reducer
export default responsesSlice.reducer

// export selectors
export const selectResponseSurveyQuestions = state => state.responses.questions
export const selectResStatus = state => state.responses.status
export const selectResError = state => state.responses.error