// src/components/CarCard/CarCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import FavoriteButton from '../FavoriteButton/FavoriteButton';
import styles from './CarCard.module.css';
import { formatNumber } from '../../utils/formatNumber';

const CarCard = ({ car }) => {
  const {
    id,
    brand,
    model,
    rentalPrice,
    address,
    rentalCompany,
    type,
    mileage,
    img,
    yea: year, 
  } = car;

  const city = address?.split(', ')[1] || '';
  const country = address?.split(', ')[2] || '';

  return (
    <li className={styles.card}>
      <div className={styles.imageWrapper}>
        <FavoriteButton carId={id} />
        <img src={img} alt={`${brand} ${model}`} className={styles.image} />
      </div>

      <div className={styles.info}>
        <div className={styles.top}>
          <h3 className={styles.title}>
            {brand} <span className={styles.model}>{model}</span>, {year}
          </h3>
          <span className={styles.price}>${rentalPrice}</span>
        </div>

        <ul className={styles.details}>
          <li>{city}</li>
          <li className={styles.divider}>|</li>
          <li>{country}</li>
          <li className={styles.divider}>|</li>
          <li>{rentalCompany}</li>
          <li className={styles.divider}>|</li>
          <li>{type}</li>
          <li className={styles.divider}>|</li>
          <li>{formatNumber(mileage)} km</li>
        </ul>

        <Link
          to={`/catalog/${id}`}
          state={{ car }} 
          className={styles.button}
        >
          Read more
        </Link>
      </div>
    </li>
  );
};

export default CarCard;



