import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchMoviesByQuery } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import styles from './MoviesPage.module.css';

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return; 

    setIsLoading(true);
    setError(null);

    fetchMoviesByQuery(query)
      .then(setMovies)
      .catch(err => {
        console.error('Error fetching movies:', err.message);
        setError('Failed to fetch movies. Please try again.');
      })
      .finally(() => setIsLoading(false));
  }, [query]);

  const handleSearch = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const queryInput = form.elements.query.value.trim();

    if (queryInput) {
      setSearchParams({ query: queryInput });
    } else {
      setSearchParams({});
    }

    form.reset();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSearch} className={styles.form}>
        <input
          type="text"
          name="query"
          defaultValue={query}
          placeholder=""
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Search</button>
      </form>
      {isLoading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!isLoading && !error && <MovieList movies={movies} />}
    </div>
  );
}

export default MoviesPage;


