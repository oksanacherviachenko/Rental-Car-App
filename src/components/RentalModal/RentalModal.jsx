// src/components/RentalModal/RentalModal.jsx
// src/components/RentalModal/RentalModal.jsx
import React, { useState } from 'react';
import styles from './RentalModal.module.css';

const RentalModal = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    comment: '',
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = e => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.date) {
      alert('Please fill all required fields (*)');
      return;
    }

    // емуляція успішної відправки форми
    setIsSuccess(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', date: '', comment: '' });
      setIsSuccess(false);
    }, 2000);
  };

  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Book your car now</h3>
      <p className={styles.formText}>Stay connected! We are always ready to help you.</p>

      {isSuccess ? (
        <p className={styles.success}>🎉 Your booking was successful!</p>
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
          <input
            type="date"
            name="date"
            placeholder="Booking date*"
            value={formData.date}
            onChange={handleChange}
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

