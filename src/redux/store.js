import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/authReducer";
import { dashboardReducer } from "./reducers/dashboardReducer";

export const store = configureStore({
    reducer: {
        authReducer,
        dashboardReducer
    },
});