// src/components/FavoriteButton/FavoriteButton.jsx

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import {
  toggleFavorite,
  loadFavoritesFromStorage,
} from '../../redux/cars/carsSlice';
import styles from './FavoriteButton.module.css';

const FavoriteButton = ({ carId }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.cars.favorites);
  const isFavorite = favorites.includes(carId);

  // Завантажити favorites з localStorage при монтуванні
  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      dispatch(loadFavoritesFromStorage(JSON.parse(stored)));
    }
  }, [dispatch]);

  // Зберігати favorites в localStorage при зміні
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleToggle = () => {
    dispatch(toggleFavorite(carId));
  };

  return (
    <button
      className={`${styles.button} ${isFavorite ? styles.active : ''}`}
      onClick={handleToggle}
      aria-label="Toggle favorite"
    >
      {isFavorite ? '💛' : '🤍'}
    </button>
  );
};

FavoriteButton.propTypes = {
  carId: PropTypes.string.isRequired,
};

export default FavoriteButton;
