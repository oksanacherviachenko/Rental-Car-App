import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Find your perfect rental car</h1>
        <p className={styles.subtitle}>Reliable and budget-friendly rentals for any journey</p>
        <button
          className={styles.ctaButton}
          onClick={() => navigate('/catalog')}
        >
          View Catalog
        </button>
      </div>
    </section>
  );
};

export default HomePage;


