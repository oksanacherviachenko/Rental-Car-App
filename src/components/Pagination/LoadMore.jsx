//src/components/Pagination/LoadMore.jsx
import React from 'react';
import styles from './LoadMore.module.css';

const LoadMore = ({ onClick }) => {
  return (
    <div className={styles.wrapper}>
      <button onClick={onClick} className={styles.button}>
        Load More
      </button>
    </div>
  );
};

export default LoadMore;
