import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const thunkName = createAsyncThunk(
  'postsActions',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('url}');
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
