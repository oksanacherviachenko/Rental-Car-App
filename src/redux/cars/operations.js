import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api'; // axios instance

export const fetchCars = createAsyncThunk(
  'cars/fetchAll',
  async (params = {}, thunkAPI) => {
    try {
      const response = await axios.get('/cars', { params });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCarById = createAsyncThunk(
  'cars/fetchById',
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(`/cars/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
