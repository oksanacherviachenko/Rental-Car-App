//src/App.jsx
import React, { Suspense, lazy, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loadFavoritesFromStorage } from './redux/cars/carsSlice';
import Navigation from './components/Navigation/Navigation';
import Loader from './components/Loader/Loader';
import styles from './App.module.css';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage'));
const CarDetailsPage = lazy(() => import('./pages/CarDetailsPage/CarDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      dispatch(loadFavoritesFromStorage(JSON.parse(stored)));
    }
  }, [dispatch]);

  return (
    <>
      <Navigation />
      <div className={styles.appWrapper}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<CarDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;





