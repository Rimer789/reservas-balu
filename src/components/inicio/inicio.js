import React from 'react';
import { Link } from 'react-router-dom';
import styles from './inicio.module.css';

const Inicio = () => {
  return (
    <div className={styles['home-page']}>
      <div className={styles.content}>
        <h1>Bienvenidos a la Barbería</h1>
        <Link to="/card">
          <button className={styles['button']}>Reserva tu turno</button>
        </Link>
      </div>
    </div>
  );
};

export default Inicio;
