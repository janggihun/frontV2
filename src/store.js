import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/UserSlice.Jsx";
import naviReducer from "./store/NaviSlice.Jsx";
import dataReducer from "./store/DataSlice.Jsx";



export default configureStore({
    reducer: {
        User: userReducer,
        Navi: naviReducer,
        Data: dataReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});