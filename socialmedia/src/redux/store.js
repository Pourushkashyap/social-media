import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../feature/userslice.jsx"
import postReducer from "../feature/postslice.js"
export const store = configureStore({
    reducer:{
        user:userReducer,
        post:postReducer
    }
})