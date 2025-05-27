import { IPostState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import { getPostById, loadPosts } from "./postsActions";

const initialState: IPostState = {
  posts: [],
  isLoading: false,
  error: "",
  currentPost: null,
};

export const postSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {
    clearCurrentPost(state) {
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.isLoading = false;
        state.posts = [];
        state.error = action.payload as string;
      })
      .addCase(getPostById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentPost = action.payload;
      })
       .addCase(getPostById.rejected, (state, action) => {
        state.isLoading = false;
        state.currentPost = null;
        state.error = action.payload as string;
      })
  },
});


export default postSlice;
export const {} = postSlice.actions;
