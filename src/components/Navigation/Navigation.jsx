//src/components/Navigation/Navigation.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={({ isActive }) => (isActive ? styles.active : styles.link)}
        >
          Catalog
        </NavLink>
      </nav>
    </header>
  );
}

export default Navigation;

