// src/components/FavoriteButton/FavoriteButton.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../redux/cars/carsSlice';
import styles from './FavoriteButton.module.css';

const FavoriteButton = ({ carId }) => {
  const dispatch = useDispatch();
  const favorites = useSelector(state => state.cars.favorites);
  const isFavorite = favorites.includes(carId);

  const handleToggle = () => {
    dispatch(toggleFavorite(carId));
  };

  return (
    <button
      className={styles.button}
      onClick={handleToggle}
      aria-label="Toggle favorite"
    >
      <svg className={styles.icon}>
        <use
          href={`/icons.svg#${isFavorite ? 'icon-heart-active' : 'icon-heart-default'}`}
        />
      </svg>
    </button>
  );
};

FavoriteButton.propTypes = {
  carId: PropTypes.string.isRequired,
};

export default FavoriteButton;
