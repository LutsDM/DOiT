import { INewPost, IUpdatePost } from '@/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';

type ApiError = {
  message: string;
  status?: number;
  data?: unknown;
};

const handleApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message || error.message,
      status: error.response?.status,
      data: error.response?.data
    };
  }
  
  if (error instanceof Error) {
    return { message: error.message };
  }
  
  return { message: 'Unknown API error' };
};

export const loadPosts = createAsyncThunk(
  'posts/loadPosts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleApiError(error));
    }
  }
);

export const getPostById = createAsyncThunk(
  'posts/getPostById',
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleApiError(error));
    }
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (post: INewPost, thunkAPI) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', post);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleApiError(error));
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (post: IUpdatePost, thunkAPI) => {
    try {
      const { id, ...data } = post;
      const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(handleApiError(error));
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/deletePost',
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      return id; // Возвращаем ID удаленного поста
    } catch (error) {
      return thunkAPI.rejectWithValue(handleApiError(error));
    }
  }
);