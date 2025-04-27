import { createSlice } from '@reduxjs/toolkit';

const personalInfoSlice = createSlice({
    name: 'personalInfo',
    initialState: {
        personalInfo: {
            email: null,
        },
    },
    reducers: {
        setPersonalInfo: (state, action) => {
            state.personalInfo = action.payload;
        },
        setEmail: (state, action) => {
            state.personalInfo.email = action.payload.email;
        },

    },
});

export const { setPersonalInfo, setEmail } = personalInfoSlice.actions;
export default personalInfoSlice.reducer;
export const selectPersonalInfo = (state) => state.personalInfo;
