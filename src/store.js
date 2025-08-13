import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./store/UserSlice.Jsx";
import naviReducer from "./store/NaviSlice.Jsx";
import dataReducer from "./store/DataSlice.Jsx";
import LoadingReducer from "./store/LoadingSlice.jsx";



export default configureStore({
    reducer: {
        User: userReducer,
        Navi: naviReducer,
        Data: dataReducer,
        Loading: LoadingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});