import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './reservas.module.css';

const Reservas = () => {
  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().substr(0, 10);
    const url = `https://barber-production-1d18.up.railway.app/api/reservas2/dia-actual`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Filtrar reservas vencidas
        const now = new Date();
        const fiveMinutesAgo = new Date(now - 5 * 60 * 1000); // 5 minutos atrás
        
        const reservasFiltradas = data.filter(reserva => {
          const fechaHoraReserva = new Date(reserva.fecha_hora);
          return fechaHoraReserva >= fiveMinutesAgo;
        });

        // Ordenar reservas por hora
        reservasFiltradas.sort((a, b) => {
          const horaA = new Date(a.fecha_hora).getTime();
          const horaB = new Date(b.fecha_hora).getTime();
          return horaA - horaB;
        });

        setReservas(reservasFiltradas);
      });
  }, []);

  return (
    <div className={styles['home-page']}>
      <div>
        <h3>Reservas de hoy</h3>
        <table className={styles['reservas-table']}>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Fecha y Hora</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva, index) => (
              <tr key={reserva.id} className={index === 0 ? styles['highlighted-row'] : ''}>
                <td>{reserva.nombre}</td>
                <td>{reserva.fecha_hora}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Link to="/card">
        <buttonq className={styles['buttonq']}>Atras</buttonq>
      </Link>
    </div>
  );
};

export default Reservas;
