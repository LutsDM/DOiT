import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getPostById = createAsyncThunk(
  'posts/getPostById',
  async (id: number, thunkAPI) => {
    console.log("Thunk getPostById called with id:", id);
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      console.log("Thunk getPostById response data:", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Thunk getPostById error:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

