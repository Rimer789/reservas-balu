import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from '../inicio/inicio.module.css';

const Reservas = () => {
    const [reservas, setReservas] = useState([]);

    useEffect(() => {
      const today = new Date().toISOString().substr(0, 10);
      const url = `http://localhost/balu_reservas/api.php?fecha=${today}`;
      fetch(url)
        .then(response => response.json())
        .then(data => setReservas(data));
    }, []);

  return (
    <div className={styles['home-page']}>
      <div>
              <h2>Reservas de hoy</h2>
              <ul>
                {reservas.map(reserva => (
                  <li key={reserva.id}>
                    {reserva.nombre} - {reserva.fecha_hora}
                  </li>
                ))}
              </ul>
            </div>
            <Link to="/card">
          <button >Atras</button>
        </Link>
    </div>
  );
};

export default Reservas;
