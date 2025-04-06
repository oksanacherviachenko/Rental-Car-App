// src/pages/CarDetailsPage/CarDetailsPage.jsx
// src/pages/CarDetailsPage/CarDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { fetchCarById } from '../../services/api';
import RentalModal from '../../components/RentalModal/RentalModal';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { formatNumber } from '../../utils/formatNumber';
import styles from './CarDetailsPage.module.css';

const CarDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const initialCar = location.state?.car;

  const [car, setCar] = useState(initialCar || null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialCar) return;

    const loadCar = async () => {
      try {
        setError(false); // Скидаємо помилку перед новим запитом
        const data = await fetchCarById(id);
        setCar(data);
      } catch (err) {
        console.error('Failed to load car:', err);
        setError(true);
      }
    };

    loadCar();
  }, [id, initialCar]);

  if (error) return <NotFoundPage />;
  if (!car) return null;

  const {
    img,
    brand,
    model,
    yea: year,
    rentalPrice,
    address,
    id: carId,
    type,
    fuelConsumption,
    engineSize,
    mileage,
    description,
    rentalConditions,
    accessories,
    functionalities,
  } = car;

  const [city, country] = address?.split(', ').slice(1) || [];

  return (
    <section className={styles.detailsContainer}>
      <div className={styles.imageSection}>
        <img src={img} alt={`${brand} ${model}`} className={styles.image} />
        <RentalModal />
      </div>

      <div className={styles.contentSection}>
        <h2 className={styles.title}>
          {brand} <span className={styles.model}>{model}</span>, {year}
        </h2>

        <p className={styles.subtitle}>
          {city} | {country} | Id: {carId} | Year: {year} | Mileage: {formatNumber(mileage)} km | Price: ${rentalPrice}
        </p>

        <p className={styles.description}>{description}</p>

        <div>
          <h3 className={styles.sectionTitle}>Rental Conditions:</h3>
          <ul className={styles.iconList}>
            {rentalConditions.map((cond, i) => (
              <li key={i}>
                <svg><use href="/icons.svg#icon-check-circle" /></svg>
                {cond}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={styles.sectionTitle}>Car Specifications:</h3>
          <ul className={styles.specsList}>
            <li>
              <svg><use href="/icons.svg#icon-calendar" /></svg>
              Year: {year}
            </li>
            <li>
              <svg><use href="/icons.svg#icon-car" /></svg>
              Type: {type}
            </li>
            <li>
              <svg><use href="/icons.svg#icon-fuel-pump" /></svg>
              Fuel Consumption: {fuelConsumption}
            </li>
            <li>
              <svg><use href="/icons.svg#icon-gear" /></svg>
              Engine Size: {engineSize}
            </li>
          </ul>
        </div>

        <div>
          <h3 className={styles.sectionTitle}>Accessories and functionalities:</h3>
          <ul className={styles.iconList}>
            {[...accessories, ...functionalities].map((item, i) => (
              <li key={i}>
                <svg><use href="/icons.svg#icon-check-circle" /></svg>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CarDetailsPage;











