import React, { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../services/api';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const backLink = location.state?.from || '/movies';

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie).catch(console.error);
  }, [movieId]);

  if (!movie) return null;

  const {
    poster_path: posterPath,
    title,
    release_date: releaseDate,
    vote_average: voteAverage,
    overview,
    genres,
  } = movie;

  return (
    <div className={styles.container}>
      <Link to={backLink} className={styles.goBackButton}>
        Go back
      </Link>
      <div className={styles.movieDetails}>
        <img
          src={`https://image.tmdb.org/t/p/w500${posterPath}`}
          alt={title}
          className={styles.poster}
        />
        <div className={styles.info}>
          <h1 className={styles.title}>{title} ({releaseDate?.slice(0, 4)})</h1>
          <p className={styles.score}>User score: {Math.round(voteAverage * 10)}%</p>
          <h2>Overview</h2>
          <p className={styles.overview}>{overview}</p>
          <h2>Genres</h2>
          <p className={styles.genres}>
            {genres?.map(genre => genre.name).join(', ')}
          </p>
        </div>
      </div>
      <hr className={styles.divider} />
      <div className={styles.additionalInfo}>
        <h2>Additional information</h2>
        <ul>
          <li>
            <Link to="cast" state={{ from: backLink }}>Cast</Link>
          </li>
          <li>
            <Link to="reviews" state={{ from: backLink }}>Reviews</Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;


