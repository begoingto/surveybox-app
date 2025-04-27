import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

export const submitSurveyQuestions = createAsyncThunk('submitSurvey/submitSurveyQuestions', async ({id,data}) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/responses/${id}`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return await response.json()
})

const submitSurveySlice = createSlice({
    name: 'submitSurvey',
    initialState: {
        survey: null,
        status: 'idle', // idle, loading, succeeded, failed
        error: null,
        validates: []
    },
    reducers: {
        // add actions validates
        addValidates(state, action) {
            state.validates = action.payload
        },
        removeValidateByQuestionId(state, action) {
            const { id } = action.payload
            state.validates = state.validates.filter(validate => validate.id !== id)
        }
    },
    extraReducers(builder) {
        builder.addCase(submitSurveyQuestions.pending, (state, action) => {
            state.status = 'loading'
        })
            .addCase(submitSurveyQuestions.fulfilled, (state, action) => {
                const { data } = action.payload
                if (action.payload?.errors){
                    state.status = 'failed'
                    state.error = action.payload
                }else {
                    state.status = 'success'
                    state.questions = data
                }
            })
            .addCase(submitSurveyQuestions.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error
            })
    }
})

// export actions
export const {
    addValidates,
    removeValidateByQuestionId
} = submitSurveySlice.actions

// export reducer
export default submitSurveySlice.reducer

// export selectors
export const selectSubmitSurvey = state => state.submitSurvey.survey
export const selectValidatesSurvey = state => state.submitSurvey.validates
// export const selectValidatesSurveyByQuestionId = (state, id) => state.submitSurvey.validates.find(v => v.id === id)
export const selectSubSurveyStatus = state => state.submitSurvey.status
export const selectSubSurveyError = state => state.submitSurvey.error