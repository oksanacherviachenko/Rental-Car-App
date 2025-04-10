//src/redux/cars/operations.jsx
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../services/api';

// Очищення параметрів перед запитом
const cleanParams = (params) => {
  const cleaned = {};
  for (const key in params) {
    const value = params[key];
    if (
      value !== '' &&
      value !== null &&
      value !== undefined &&
      !(typeof value === 'string' && value.trim() === '')
    ) {
      cleaned[key] = value;
    }
  }
  return cleaned;
};

// Отримання авто з урахуванням фільтрів
export const fetchCars = createAsyncThunk('cars/fetchAll', async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    const { filters, page } = state.cars;

    const rawParams = {
      page,
      limit: 12,
    };

    if (filters.brand) rawParams.brand = filters.brand;
    if (filters.rentalPrice) rawParams.rentalPrice = filters.rentalPrice;
    if (filters.mileageFrom && !isNaN(Number(filters.mileageFrom))) {
  rawParams['mileage[$gte]'] = Number(filters.mileageFrom);
}

if (filters.mileageTo && !isNaN(Number(filters.mileageTo))) {
  rawParams['mileage[$lte]'] = Number(filters.mileageTo);
}

    const params = cleanParams(rawParams);
    const response = await axios.get('/cars', { params });

    return response.data.cars;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Отримання деталей авто за ID
export const fetchCarById = createAsyncThunk('cars/fetchById', async (id, thunkAPI) => {
  try {
    const response = await axios.get(`/cars/${id}`);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});




