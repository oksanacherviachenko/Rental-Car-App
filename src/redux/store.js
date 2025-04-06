// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import carsReducer from './cars/carsSlice';
import brandsReducer from './brands/brandsSlice';
import pricesReducer from './prices/pricesSlice'; 

export const store = configureStore({
  reducer: {
    cars: carsReducer,
    brands: brandsReducer,
    prices: pricesReducer, 
  },
});






