import {createSlice} from "@reduxjs/toolkit";

export const collapsedSlice = createSlice({
    name: 'collapsed',
    initialState: {
        isCollapsed: false
    },
    reducers: {
        changeCollapsed(state) {
            state.isCollapsed = !state.isCollapsed
        }
    }
})

export const {changeCollapsed} = collapsedSlice.actions

export default collapsedSlice.reducer