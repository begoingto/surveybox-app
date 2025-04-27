import {createSlice} from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        categories: [],
    },
    reducers: {
        addCategories: (state, action) => {
            state.categories = action.payload
        },
        updateCategories: (state, action) => {
            state.categories = action.payload
        }
    },

})

// export actions
export const {addCategories,removeCategories} = categorySlice.actions

// export reducer
export default categorySlice.reducer

// export selectors
export const selectAllCategories = state => state.category.categories