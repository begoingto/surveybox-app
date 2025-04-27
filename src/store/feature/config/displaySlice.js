import {createSlice} from "@reduxjs/toolkit";
import {DISPLAY} from "@/lib/siteConfig";

const displaySlide = createSlice({
    name: 'display',
    initialState: {
        show: DISPLAY.grid,
    },
    reducers: {
        addDisplay(state, action) {
            state.show = action.payload
        }
    }
})

export default displaySlide.reducer

export const { addDisplay } = displaySlide.actions

export const selectDisplay = state => state.display.show