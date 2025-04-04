// src/components/RentalModal/RentalModal.jsx

import React, { useState } from 'react';
import styles from './RentalModal.module.css';

const RentalModal = ({ onClose, car }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
  });

  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // проста перевірка
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please fill in all fields');
      return;
    }

    // Імітація надсилання форми
    setTimeout(() => {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose(); // закрити форму
      }, 2000);
    }, 1000);
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>×</button>

        {success ? (
          <p className={styles.success}>🎉 Your booking was successful!</p>
        ) : (
          <>
            <h2>Rent {car.make} {car.model}</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Phone:
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <button type="submit" className={styles.submitBtn}>
                Confirm Booking
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default RentalModal;
