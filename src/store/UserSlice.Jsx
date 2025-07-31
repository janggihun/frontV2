import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {},
    reducers: {
        initUserData: (state, action) => {
            state.value = action.payload;
        },
    },
});
export const { initUserData } = userSlice.actions;
export default userSlice.reducer;