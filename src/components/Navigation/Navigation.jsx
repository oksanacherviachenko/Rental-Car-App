//src/components/Navigation/Navigation.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoDark}>Rental</span>
          <span className={styles.logoBlue}>Car</span>
        </NavLink>

        <nav className={styles.nav}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.link}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={({ isActive }) => isActive ? styles.active : styles.link}>
            Catalog
          </NavLink>
        </nav>

        {/* Бургер */}
        <div className={styles.burger} onClick={toggleMenu}>
          <span />
          <span />
          <span />
        </div>

        {/* Мобільне меню */}
        <div className={`${styles.mobileNav} ${isOpen ? styles.showNav : ''}`}>
          <NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.link} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/catalog" className={({ isActive }) => isActive ? styles.active : styles.link} onClick={closeMenu}>
            Catalog
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Navigation;



