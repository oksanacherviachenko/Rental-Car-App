// src/pages/CatalogPage/CatalogPage.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCars } from '../../redux/cars/operations';
import { setPage } from '../../redux/cars/carsSlice';

import CarCard from '../../components/CarCard/CarCard';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import FilterPanel from '../../components/FilterPanel/FilterPanel';
import LoadMore from '../../components/Pagination/LoadMore';

import styles from './CatalogPage.module.css';

const CatalogPage = () => {
  const dispatch = useDispatch();

  // Витягуємо дані зі стану Redux
  const cars = useSelector(state => state.cars.items);
  const isLoading = useSelector(state => state.cars.isLoading);
  const error = useSelector(state => state.cars.error);
  const page = useSelector(state => state.cars.page);
  const hasMore = useSelector(state => state.cars.hasMore); // ➕ нове

  // Завантаження авто при відкритті сторінки або зміні сторінки
  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch, page]);

  // Обробник кліку по Load More
  const handleLoadMore = () => {
    dispatch(setPage(page + 1));
  };

  return (
    <div className={styles.catalog}>
      <h1 className={styles.title}>Catalog</h1>

      <FilterPanel />

      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {!isLoading && !error && Array.isArray(cars) && cars.length > 0 && (
        <>
          <ul className={styles.carList}>
            {cars.map(car => (
              <CarCard key={car.id} car={car} />
            ))}
          </ul>

          {hasMore ? (
            <LoadMore onClick={handleLoadMore} />
          ) : (
            <p className={styles.endMessage}>
              No more cars available{cars.length > 0 ? ' for current filters.' : '.'}
            </p>
          )}
        </>
      )}

      {!isLoading && !error && Array.isArray(cars) && cars.length === 0 && (
        <p>No cars found.</p>
      )}
    </div>
  );
};

export default CatalogPage;


