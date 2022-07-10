import {createSlice} from "@reduxjs/toolkit";

export const loadingSlices = createSlice({
    name: 'loading',
    initialState: {
        isLoading: false
    },
    reducers: {
        changeLoading(state) {
            state.isLoading = !state.isLoading;
        }
    }
})

export const {changeLoading} = loadingSlices.actions

export default loadingSlices.reducer