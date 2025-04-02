import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Loader from './components/Loader/Loader';

// Сторінки RentalCar
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const CatalogPage = lazy(() => import('./pages/CatalogPage/CatalogPage'));
const CarDetailsPage = lazy(() => import('./pages/CarDetailsPage/CarDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

// 🔄 Компоненти з Movie-проєкту, залишаємо закоментованими на майбутнє (можеш видалити пізніше)
// const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
// const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
// const MovieCast = lazy(() => import('./components/MovieCast/MovieCast'));
// const MovieReviews = lazy(() => import('./components/MovieReviews/MovieReviews'));

function App() {
  return (
    <>
      <Navigation />
      <div style={{ paddingTop: '60px' }}>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/catalog" element={<CatalogPage />} />
            <Route path="/catalog/:id" element={<CarDetailsPage />} />
            <Route path="*" element={<NotFoundPage />} />

            {/* 🔄 Закоментовано на випадок майбутнього розширення */}
            {/* <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route> */}
          </Routes>
        </Suspense>
      </div>
    </>
  );
}

export default App;




