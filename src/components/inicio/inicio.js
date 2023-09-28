import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useSwipeable } from 'react-swipeable';
import styles from './inicio.module.css';
import { FcCollect } from "react-icons/fc";
import image0 from './image0.jpeg';
import image1 from './image1.jpeg';
import image2 from './image2.jpeg';

const images = [image0, image1, image2];

const Inicio = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipeLeft = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleSwipeRight = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

  const ubicacionGoogleMaps = 'https://www.google.com/maps/place/-17.544119,-65.836120';

  useEffect(() => {
    obtenerComunicados();

    const intervalId = setInterval(() => {
      handleSwipeRight();
    }, 4000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const [comunicados, setComunicados] = useState([]);

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
        <Link to='/login'>
          <button className={styles['buttonL']}>login</button>
        </Link>
        <div>
          <h1>MURDOCK LONDON</h1>
        </div>
        <Link to="/card">
          <button className={styles['buttone']}>Reserva tu corte</button>
        </Link>
        
        <div>
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
          <h4>Comunicados Recientes</h4>
        </div>
        <br />
        <div>
          <ul className={styles['comunicados-list']}>
            {comunicados.map((comunicado) => (
              <li className={styles['comunicado-item']} key={comunicado.id}>
                {comunicado.descripcion}
              </li>
            ))}
          </ul>
        </div><div>
          <div {...handlers}>
            <img src={images[currentIndex]} alt="Imagen actual" className={styles['image']} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
