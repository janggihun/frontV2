import { createSlice } from "@reduxjs/toolkit";

export const naviSlice = createSlice({
    name: "navi",
    initialState: {},
    reducers: {
        initNaviData: (state, action) => {
            state.value = action.payload;
        },
    },
});
export const { initNaviData } = naviSlice.actions;
export default naviSlice.reducer;