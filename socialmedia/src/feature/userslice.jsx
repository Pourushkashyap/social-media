import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
    name:"user",
    initialState:{
        user:null
    },
    reducers:{
        storedetail:(state,action) =>{
            state.user = action.payload;
        }
    }
})

export const {storedetail} = userslice.actions

export default userslice.reducer