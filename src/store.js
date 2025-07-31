import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/UserSlice.Jsx";
import naviReducer  from "./store/NaviSlice.Jsx";



export default configureStore({
    reducer: {
        User: userReducer,
        Navi: naviReducer,

    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});