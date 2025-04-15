// src/components/RentalModal/RentalModal.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './RentalModal.module.css';
import { validateBookingForm } from '../../utils/validateBooking';

const RentalModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dateRange: [null, null],
    comment: '',
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [startDate, endDate] = formData.dateRange;

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDateChange = range => {
    setFormData(prev => ({
      ...prev,
      dateRange: range,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const error = validateBookingForm({
      name: formData.name,
      email: formData.email,
      dateFrom: startDate,
      dateTo: endDate,
    });

    if (error) {
      alert(error);
      return;
    }

    setIsSuccess(true);
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        dateRange: [null, null],
        comment: '',
      });
      setIsSuccess(false);
    }, 2000);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Book your car now</h3>
      <p className={styles.formText}>Stay connected! We are always ready to help you.</p>

      {isSuccess ? (
        <p className={styles.success}>Your booking was successful!</p>
      ) : (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="name"
            placeholder="Name*"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email*"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <DatePicker
            selected={startDate}
            onChange={handleDateChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            placeholderText="Booking date*"
            minDate={new Date()}
            className={styles.datepicker}
            required
          />

          <textarea
            name="comment"
            placeholder="Comment"
            value={formData.comment}
            onChange={handleChange}
          />
          <button type="submit">Send</button>
        </form>
      )}
    </div>
  );
};

export default RentalModal;



