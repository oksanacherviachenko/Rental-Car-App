// src/components/CarCard/CarCard.jsx

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './CarCard.module.css';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

const CarCard = ({ car }) => {
  const {
    id,
    make,
    model,
    year,
    rentalPrice,
    address,
    rentalCompany,
    type,
    mileage,
    accessories,
    img,
  } = car;

  // Виведення пробігу з пробілом між тисячами
  const formattedMileage = mileage.toLocaleString('en-US');

  return (
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={img} alt={`${make} ${model}`} className={styles.image} />
        <FavoriteButton carId={id} />
      </div>

      <div className={styles.info}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            {make} <span>{model}</span>, {year}
          </h2>
          <p className={styles.price}>{rentalPrice}</p>
        </div>

        <p className={styles.description}>
          {address.split(', ').slice(1, 3).join(' • ')} • {rentalCompany} • {type} • {formattedMileage} km • {accessories[0]}
        </p>

        <Link to={`/catalog/${id}`} className={styles.readMoreBtn}>
          Read more
        </Link>
      </div>
    </li>
  );
};

CarCard.propTypes = {
  car: PropTypes.shape({
    id: PropTypes.string.isRequired,
    make: PropTypes.string.isRequired,
    model: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    rentalPrice: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    rentalCompany: PropTypes.string,
    type: PropTypes.string,
    mileage: PropTypes.number.isRequired,
    accessories: PropTypes.arrayOf(PropTypes.string),
    img: PropTypes.string,
  }).isRequired,
};

export default CarCard;
