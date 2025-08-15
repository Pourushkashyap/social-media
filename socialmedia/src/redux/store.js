import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/userslice.jsx"

export const store = configureStore({
    reducer:{
        user:userReducer
    }
})