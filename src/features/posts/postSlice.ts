import { createSlice } from '@reduxjs/toolkit';

const initialState: TypeForState = {
  posts: [],
  isLoading: false,
  error: null,
};

export const postSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(thunkName.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(thunkName.fulfilled, (state, action) => {
        state.isLoading = false
        state.products = action.payload;
      })
      .addCase(thunkName.rejected, (state, action) => {
        state.isLoading = false
        state.values = []
        state.error = action.payload as string
      })
  },
});

export default postSlice;
export const { } = postSlice.actions