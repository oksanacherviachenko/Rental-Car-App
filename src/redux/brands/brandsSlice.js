// src/redux/brands/brandsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Thunk для отримання брендів авто
export const fetchBrands = createAsyncThunk(
  'brands/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/cars', { params: { page: 1, limit: 100 } });

      console.log('✅ /cars response:', response.data);

      const carsArray = response.data.cars || [];

      // 🔍 Перевіримо, що всередині
      console.log('📦 Приклад авто:', carsArray[0]);

      // 🔁 Правильне поле — `brand`, а не `make`
      const uniqueBrands = [...new Set(carsArray.map(car => car.brand))].sort();
      console.log('✅ uniqueBrands:', uniqueBrands);

      return uniqueBrands;
    } catch (error) {
      console.error('❌ fetchBrands error:', error);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice для зберігання брендів
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
        console.log('✅ Brands saved to Redux:', action.payload);
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default brandsSlice.reducer;





