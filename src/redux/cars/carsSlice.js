import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, fetchCarById } from './operations';

const initialState = {
  items: [],
  selectedCar: null,
  isLoading: false,
  error: null,
  filters: {
    brand: '',
    price: '',
    mileageFrom: '',
    mileageTo: '',
  },
  favorites: [],
};

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters(state) {
      state.filters = initialState.filters;
    },
    toggleFavorite(state, action) {
      const carId = action.payload;
      if (state.favorites.includes(carId)) {
        state.favorites = state.favorites.filter(id => id !== carId);
      } else {
        state.favorites.push(carId);
      }
    },
    loadFavoritesFromStorage(state, action) {
      state.favorites = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCars.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.selectedCar = action.payload;
      });
  },
});

export const {
  setFilters,
  resetFilters,
  toggleFavorite,
  loadFavoritesFromStorage,
} = carsSlice.actions;

export default carsSlice.reducer;
