import { createSlice } from "@reduxjs/toolkit";

export const dataSlice = createSlice({
    name: "data", // 해당 페이지에서 사용하는 전체 map
    initialState: {},
    reducers: {
        initData: (state, action) => {
            state.value = action.payload;
        },

        updateData: (state, action) => {
            state.value = action.payload;
        }
    },
});
export const { initData, updateData } = dataSlice.actions;
export default dataSlice.reducer;