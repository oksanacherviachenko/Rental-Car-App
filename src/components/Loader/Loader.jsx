import React from 'react';
import { ClipLoader } from 'react-spinners';
import styles from './Loader.module.css';

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <ClipLoader color="#ff4500" size={50} />
    </div>
  );
}

export default Loader;


