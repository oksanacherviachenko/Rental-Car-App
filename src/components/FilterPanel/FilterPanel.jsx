// src/components/FilterPanel/FilterPanel.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands } from '../../redux/brands/brandsSlice';
import { fetchPrices } from '../../redux/prices/pricesSlice';
import { setFilters, setPage } from '../../redux/cars/carsSlice';
import { fetchCars } from '../../redux/cars/operations';
import styles from './FilterPanel.module.css';
import { formatNumber } from '../../utils/formatNumber';

const FilterPanel = () => {
  const dispatch = useDispatch();
  const brands = useSelector(state => state.brands.items);
  const isLoadingBrands = useSelector(state => state.brands.isLoading);
  const prices = useSelector(state => state.prices.items);

  const [brand, setBrand] = useState('');
  const [rentalPrice, setRentalPrice] = useState('');
  const [mileageFrom, setMileageFrom] = useState('');
  const [mileageTo, setMileageTo] = useState('');
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);

  useEffect(() => {
    if (brands.length === 0) {
      dispatch(fetchBrands());
    }
    dispatch(fetchPrices());
  }, [dispatch, brands.length]);

  const handleSubmit = e => {
    e.preventDefault();
    const filters = {
      brand,
      rentalPrice,
      mileageFrom: mileageFrom.replace(/\s/g, ''),
      mileageTo: mileageTo.replace(/\s/g, '')
    };
    dispatch(setFilters(filters));
    dispatch(setPage(1));
    dispatch(fetchCars());
  };

  const handleMileageInput = setter => e => {
    const rawValue = e.target.value.replace(/\D/g, '');
    if (!isNaN(rawValue)) setter(rawValue);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}> {/* 👈 new wrapper for horizontal alignment */}
        <label className={styles.label}>
          Car brand
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={brand}
              onChange={e => setBrand(e.target.value)}
              onFocus={() => setIsBrandOpen(true)}
              onBlur={() => setIsBrandOpen(false)}
              disabled={isLoadingBrands}
            >
              <option value="">Choose a brand</option>
              {brands.map((make, index) => (
                <option key={index} value={make}>{make}</option>
              ))}
            </select>
            <svg className={styles.icon}>
              <use href={`/icons.svg#${isBrandOpen ? 'icon-done-active' : 'icon-done-default'}`} />
            </svg>
          </div>
        </label>

        <label className={styles.label}>
          Price/ 1 hour
          <div className={styles.selectWrapper}>
            <select
              className={styles.select}
              value={rentalPrice}
              onChange={e => setRentalPrice(e.target.value)}
              onFocus={() => setIsPriceOpen(true)}
              onBlur={() => setIsPriceOpen(false)}
            >
              <option value="">Choose a price</option>
              {prices.map((price, index) => (
                <option key={index} value={price}>${price}</option>
              ))}
            </select>
            <svg className={styles.icon}>
              <use href={`/icons.svg#${isPriceOpen ? 'icon-done-active' : 'icon-done-default'}`} />
            </svg>
          </div>
        </label>

        <label className={styles.label}>
          Сar mileage / km
          <div className={styles.mileageWrapper}>
            <input
              className={styles.input}
              type="text"
              value={formatNumber(mileageFrom)}
              onChange={handleMileageInput(setMileageFrom)}
              placeholder="From"
            />
            <span className={styles.separator}>|</span>
            <input
              className={styles.input}
              type="text"
              value={formatNumber(mileageTo)}
              onChange={handleMileageInput(setMileageTo)}
              placeholder="To"
            />
          </div>
        </label>

        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.button}>Search</button>
        </div>
      </div>
    </form>
  );
};

export default FilterPanel;














