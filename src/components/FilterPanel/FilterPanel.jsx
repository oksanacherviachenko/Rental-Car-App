// src/components/FilterPanel/FilterPanel.jsx

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setFilters, setPage } from '../../redux/cars/carsSlice';
import { fetchCars } from '../../redux/cars/operations';
import styles from './FilterPanel.module.css';

const FilterPanel = () => {
  const dispatch = useDispatch();

  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [mileageFrom, setMileageFrom] = useState('');
  const [mileageTo, setMileageTo] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    const filters = {
      brand,
      price,
      mileageFrom,
      mileageTo,
    };

    // Оновлюємо фільтри
    dispatch(setFilters(filters));

    // Скидаємо сторінку до 1
    dispatch(setPage(1));

    // Завантажуємо машини з фільтрами з першої сторінки
    dispatch(fetchCars());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        Brand:
        <select value={brand} onChange={e => setBrand(e.target.value)}>
          <option value="">All</option>
          <option value="Buick">Buick</option>
          <option value="Volvo">Volvo</option>
          <option value="HUMMER">HUMMER</option>
          <option value="Subaru">Subaru</option>
          <option value="Mitsubishi">Mitsubishi</option>
          <option value="Nissan">Nissan</option>
        </select>
      </label>

      <label>
        Price:
        <select value={price} onChange={e => setPrice(e.target.value)}>
          <option value="">Any</option>
          <option value="30">Up to $30</option>
          <option value="50">Up to $50</option>
          <option value="70">Up to $70</option>
        </select>
      </label>

      <label>
        Mileage from:
        <input
          type="number"
          value={mileageFrom}
          onChange={e => setMileageFrom(e.target.value)}
          placeholder="From"
        />
      </label>

      <label>
        Mileage to:
        <input
          type="number"
          value={mileageTo}
          onChange={e => setMileageTo(e.target.value)}
          placeholder="To"
        />
      </label>

      <button type="submit">Apply Filters</button>
    </form>
  );
};

export default FilterPanel;

