//src/redux/cars/carsSlice.jsx
import { createSlice } from '@reduxjs/toolkit';
import { fetchCars, fetchCarById } from './operations';

const initialState = {
  items: [],                // Список усіх авто
  selectedCar: null,        // Для деталей окремого авто
  isLoading: false,
  error: null,
  filters: {
    brand: '',
    price: '',
    mileageFrom: '',
    mileageTo: '',
  },
  favorites: [],            // Масив ID обраних авто
  page: 1,                  // Поточна сторінка для пагінації
  hasMore: true,            // Чи є ще авто для підвантаження
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
    setPage(state, action) {
      state.page = action.payload;
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

  const newItems = action.payload.cars || [];

  // Перевірка: чи є ще машини
  state.hasMore = newItems.length === 12;

  if (state.page === 1) {
    state.items = newItems;
  } else {
    state.items = [...state.items, ...newItems];
  }

  console.log('✅ Авто збережено у Redux:', state.items);
})
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCarById.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.selectedCar = null;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedCar = action.payload;
      })
      .addCase(fetchCarById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setFilters,
  resetFilters,
  toggleFavorite,
  loadFavoritesFromStorage,
  setPage,
} = carsSlice.actions;

export default carsSlice.reducer;




