import { createSlice } from "@reduxjs/toolkit";

export const LoadingSlice = createSlice({
    name: "loading",
    initialState: { value: false },
    reducers: {
        openLoading: (state, action) => {
            state.value = true;
        },
        closeLoading: (state, action) => {
            state.value = false;
        },
    },
});
export const { openLoading, closeLoading } = LoadingSlice.actions;
export default LoadingSlice.reducer;
