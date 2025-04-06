// src/redux/brands/brandsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

export const fetchBrands = createAsyncThunk(
  'brands/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/cars', { params: { page: 1, limit: 100 } });

      const carsArray = response.data.cars || [];

      const uniqueBrands = [...new Set(carsArray.map(car => car.brand))].sort();

      return uniqueBrands;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const brandsSlice = createSlice({
  name: 'brands',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBrands.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default brandsSlice.reducer;





