import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadPosts = createAsyncThunk(
  '/posts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
