// src/pages/CatalogPage/CatalogPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations';
import CarCard from '../../components/CarCard/CarCard';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();

  // Отримання даних з Redux
  const cars = useSelector(state => state.cars.items);
  const isLoading = useSelector(state => state.cars.isLoading);
  const error = useSelector(state => state.cars.error);

  // Завантаження авто при відкритті сторінки
  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div className={styles.catalog}>
      <h1 className={styles.title}>Catalog</h1>

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && Array.isArray(cars) && cars.length > 0 && (
        <ul className={styles.carList}>
          {cars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </ul>
      )}

      {!isLoading && !error && Array.isArray(cars) && cars.length === 0 && (
        <p>No cars found.</p>
      )}
    </div>
  );
};

export default CatalogPage;

