//redux/prices/pricesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

export const fetchPrices = createAsyncThunk(
  'prices/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/cars', { params: { page: 1, limit: 100 } });
      const cars = response.data.cars || [];

      const uniquePrices = [...new Set(cars.map(car => Number(car.rentalPrice)))]
        .filter(Boolean)
        .sort((a, b) => a - b);

      return uniquePrices;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const pricesSlice = createSlice({
  name: 'prices',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchPrices.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchPrices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default pricesSlice.reducer;

