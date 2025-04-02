import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCredits } from '../../services/api';
import styles from './MovieCast.module.css';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    fetchMovieCredits(movieId)
      .then(data => setCast(data))
      .catch(console.error);
  }, [movieId]);

  if (cast.length === 0) {
    return <p className={styles.noCast}>No cast information available.</p>;
  }

  return (
    <div className={styles.castContainer}>
      <ul className={styles.castList}>
        {cast.map(actor => (
          <li key={actor.id} className={styles.castItem}>
            <img
              src={
                actor.profile_path
                  ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                  : 'https://via.placeholder.com/200x300?text=No+Image'
              }
              alt={actor.name}
              className={styles.actorPhoto}
            />
            <p className={styles.actorName}>{actor.name}</p>
            <p className={styles.actorRole}>
              {actor.character ? `as ${actor.character}` : 'Role unknown'}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;

