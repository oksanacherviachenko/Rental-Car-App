import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './HomePage.module.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); 
    fetchTrendingMovies()
      .then(setMovies) 
      .catch(err => {
        console.error('Error fetching trending movies:', err.message);
        setError('Failed to load trending movies. Please try again later.');
      })
      .finally(() => setIsLoading(false)); 
  }, []);

  return (
    <div className={styles.container}>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && (
        <>
          <h1>Trending Movies</h1>
          <MovieList movies={movies} />
        </>
      )}
    </div>
  );
}

export default HomePage;

