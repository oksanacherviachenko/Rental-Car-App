// src/pages/CarDetailsPage/CarDetailsPage.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchCarById } from '../../redux/cars/operations';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import RentalModal from '../../components/RentalModal/RentalModal';
import styles from './CarDetailsPage.module.css';

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const car = useSelector(state => state.cars.selectedCar);
  const isLoading = useSelector(state => state.cars.isLoading);
  const error = useSelector(state => state.cars.error);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCarById(id));
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!car) return null;

  return (
    <div className={styles.container}>
      <h1>
        {car.make} {car.model}
      </h1>

      <img src={car.img} alt={car.make} className={styles.image} />

      <div className={styles.info}>
        <p>
          <strong>Year:</strong> {car.year}
        </p>
        <p>
          <strong>Type:</strong> {car.type}
        </p>
        <p>
          <strong>Fuel:</strong> {car.fuelConsumption}
        </p>
        <p>
          <strong>Engine Size:</strong> {car.engineSize}
        </p>
        <p>
          <strong>Rental Price:</strong> {car.rentalPrice}
        </p>
        <p>
          <strong>Address:</strong> {car.address}
        </p>
        <p>
          <strong>Rental Conditions:</strong> {car.rentalConditions}
        </p>
        <p>
          <strong>Mileage:</strong> {Number(car.mileage).toLocaleString()} km
        </p>
        <p>
          <strong>Accessories:</strong> {car.accessories.join(', ')}
        </p>
        <p>
          <strong>Functionalities:</strong> {car.functionalities.join(', ')}
        </p>
      </div>

      <button className={styles.button} onClick={() => setIsModalOpen(true)}>
        Rent this car
      </button>

      {isModalOpen && (
        <RentalModal car={car} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default CarDetailsPage;



