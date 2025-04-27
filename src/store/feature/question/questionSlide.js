import {createSlice} from "@reduxjs/toolkit";

const questionSlide = createSlice({
    name: 'question',
    initialState: {
        existingQuestions: [],
    },
    reducers: {
        addExistingQuestions(state, action) {
            state.existingQuestions = action.payload
        }
    }
})

export default questionSlide.reducer

export const { addExistingQuestions } = questionSlide.actions

export const selectExistingQuestions = state => state.question.existingQuestions