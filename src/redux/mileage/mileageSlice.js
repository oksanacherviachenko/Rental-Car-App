//src/redux/mileage/mileageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const mileageSlice = createSlice({
  name: 'mileage',
  initialState: {
    from: '',
    to: '',
  },
  reducers: {
    setMileage(state, action) {
      state.from = action.payload.from;
      state.to = action.payload.to;
    },
    resetMileage(state) {
      state.from = '';
      state.to = '';
    },
  },
});

export const { setMileage, resetMileage } = mileageSlice.actions;
export default mileageSlice.reducer;
