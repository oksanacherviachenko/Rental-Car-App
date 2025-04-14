// src/redux/prices/pricesSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Статичний список цін — рекомендоване рішення
const initialState = {
  items: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
};

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {},
});

export default pricesSlice.reducer;


