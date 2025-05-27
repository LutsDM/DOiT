import { IPostState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createPost,
  deletePost,
  getPostById,
  loadPosts,
  updatePost,
} from "./postsActions";

const initialState: IPostState = {
  posts: [],
  isLoading: false,
  error: "",
  currentPost: null,
};

export const postSlice = createSlice({
  name: "postsSlice",
  initialState,
  reducers: {},
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
      .addCase(createPost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts.push(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(updatePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );
        if (index !== -1) {
          state.posts[index] = action.payload;
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export default postSlice;
