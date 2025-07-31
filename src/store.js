import { configureStore } from "@reduxjs/toolkit";
import { useReducer } from "./store/UserSlice.Jsx";


export default configureStore({
    reducer: {
        User: useReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});