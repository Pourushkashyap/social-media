import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    posts: [],   // sabhi posts store karne ke liye
  },
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload); // ek nayi post add
    },
    deletePost: (state, action) => {
      state.posts = state.posts.filter(
        (post) => post._id !== action.payload  // id ke basis pe delete
      );
    },
    updatePost: (state, action) => {
      const { _id, newData } = action.payload;
      const index = state.posts.findIndex((post) => post._id === _id);
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...newData };
      }
    },
    setPosts: (state, action) => {
      state.posts = action.payload; // backend se fetch karke set karne ke liye
    },
  },
});

export const { addPost, deletePost, updatePost, setPosts } = postSlice.actions;
export default postSlice.reducer;
