import { createSlice } from "@reduxjs/toolkit";

const userslice = createSlice({
    name:"user",
    initialState:{
        user:null
    },
    reducers:{
        storedetail:(state,action) =>{
            state.user = action.payload;
        },
        updatefollowing: (state, action) => {
      const { targetuserid, isfollowing } = action.payload;
      if (state.user) {
        if (isfollowing) {
          // Prevent duplicates
          if (!state.user.following.includes(targetuserid)) {
            state.user.following.push(targetuserid);
          }
        } else {
          // Remove target user from following
          state.user.following = state.user.following.filter(
            (id) => id !== targetuserid
          );
        }
      }
    },
  },
});

export const {storedetail,updatefollowing} = userslice.actions

export default userslice.reducer