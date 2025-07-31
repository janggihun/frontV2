import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/UserSlice.Jsx";



export default configureStore({
    reducer: {
        User: userReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});