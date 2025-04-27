import {createSlice} from "@reduxjs/toolkit";

const surveySlice = createSlice({
    name: 'survey',
    initialState: {
        survey: null,
        surveyQuestions: [],
        isLoading: true,
        duplicate: null
    },
    reducers: {
        addSurvey(state, action) {
            state.survey = action.payload
        },
        addSurveyQuestions(state, action) {
            state.surveyQuestions = action.payload
        },
        addSurveyQuestion(state, action) {
            state.surveyQuestions.push(action.payload)
        },
        removeSurveyQuestion(state, action) {
            const { id } = action.payload
            state.surveyQuestions = state.surveyQuestions.filter(question => question.id !== id)
        },
        setIsLoading: (state,action) => {
            state.isLoading = action.payload
        },
        setDuplicate: (state,action) => {
            state.duplicate = action.payload
        }
    }
})

export const {
    addSurvey,
    setIsLoading,
    addSurveyQuestions,
    addSurveyQuestion,
    removeSurveyQuestion,
    setDuplicate
} = surveySlice.actions

export default surveySlice.reducer

export const selectSurvey = state => state.survey.survey
export const selectSurveyQuestions = state => state.survey.surveyQuestions
export const selectIsLoading = state => state.survey.isLoading
export const selectDuplicateSurvey = state => state.survey.duplicate