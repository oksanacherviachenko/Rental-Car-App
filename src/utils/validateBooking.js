// src/utils/validateBooking.js

export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const validateBookingForm = ({ name, email, dateFrom, dateTo }) => {
  if (!name || !email || !dateFrom || !dateTo) {
    return 'Please fill all required fields (*)';
  }

  if (new Date(dateFrom) > new Date(dateTo)) {
    return 'End date must be after start date';
  }

  if (new Date(dateFrom) < new Date(getTodayDate())) {
    return 'Start date cannot be in the past';
  }

  return null;
};
