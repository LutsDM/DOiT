import { INewPost } from '@/types';
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
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (post: INewPost, thunkAPI) => {
    try {
      const response = await axios.post(`https://jsonplaceholder.typicode.com/posts`, post);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);