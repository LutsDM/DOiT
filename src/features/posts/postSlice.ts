import { IPostState } from '@/types';
import { createSlice } from '@reduxjs/toolkit';
import { loadPosts } from './postsActions';

const initialState: IPostState = {
  posts: [],
  isLoading: false,
  error: "",
};

export const postSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loadPosts.fulfilled, (state, action) => {
        state.isLoading = false
        state.posts = action.payload;
      })
      .addCase(loadPosts.rejected, (state, action) => {
        state.isLoading = false
        state.posts = []
        state.error = action.payload as string
      })
  },
});

export default postSlice;
export const { } = postSlice.actions