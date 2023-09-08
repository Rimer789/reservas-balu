import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from './inicio.module.css';
import { FcCollect } from "react-icons/fc";

const Inicio = () => {
  const [comunicados, setComunicados] = useState([]);
  const ubicacionGoogleMaps = 'https://www.google.com/maps/place/-17.544119,-65.836120';
  useEffect(() => {
    // Obtener los comunicados existentes al cargar el componente
    obtenerComunicados();
  }, []);

  const obtenerComunicados = async () => {
    try {
      const response = await axios.get('https://barber-production-1d18.up.railway.app/api/comunicados');
      setComunicados(response.data);
    } catch (error) {
      console.error('Error al obtener comunicados:', error);
    }
  };

  return (
    <div className={styles['home-page']}>
      <div className={styles.content}>
        <h1>
          Bienvenidos a la Barbería
        </h1>
        <Link to="/card">
          <button className={styles['button']}>Reserva tu turno</button>
        </Link>
        
      
       <h2>
          estamos ubicados
          <a href={ubicacionGoogleMaps} target="_blank" rel="noopener noreferrer">
          <div>  
            <FcCollect />
          </div>
        </a>
        </h2>
        
      </div>
      <div>
      <div>
        <h3>Comunicados Recientes</h3>
        <ul>
          {comunicados.map((comunicado) => (
            <li key={comunicado.id}>
              {comunicado.descripcion}
             
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
};

export default Inicio;

