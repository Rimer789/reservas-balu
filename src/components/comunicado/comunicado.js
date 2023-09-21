import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './comunicado.module.css';
import { Link } from 'react-router-dom';

const Comunicado = () => {
  const [comunicados, setComunicados] = useState([]);
  const [nuevoComunicado, setNuevoComunicado] = useState('');

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

  const crearComunicado = async () => {
    try {
      const response = await axios.post('https://barber-production-1d18.up.railway.app/api/comunicado', {
        descripcion: nuevoComunicado,
      });

      // Actualizar la lista de comunicados con el nuevo comunicado
      setComunicados([...comunicados, response.data]);

      // Limpiar el campo de texto después de crear el comunicado
      setNuevoComunicado('');
    } catch (error) {
      console.error('Error al crear comunicado:', error);
    }
  };

  const eliminarComunicado = async (id) => {
    try {
      await axios.delete(`https://barber-production-1d18.up.railway.app/api/comunicado/${id}`);
      // Filtrar los comunicados para eliminar el que corresponde al ID
      setComunicados(comunicados.filter((comunicado) => comunicado.id !== id));
    } catch (error) {
      console.error('Error al eliminar comunicado:', error);
    }
  };

  return (
    <div className={styles['container']}>
      <div className={styles['input-container']}>
        <textarea
          className={styles['text-area']}
          placeholder="Escribe tu comunicado aquí"
          value={nuevoComunicado}
          onChange={(e) => setNuevoComunicado(e.target.value)}
        />
        <button className={styles['button']} onClick={crearComunicado}>
          Publicar Comunicado
        </button>
        <br />
      </div>
      <div className={styles['comunicados-container']}>
        <table className={styles['comunicados-table']}>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Función</th>
            </tr>
          </thead>
          <tbody>
            {comunicados.map((comunicado) => (
              <tr key={comunicado.id} >
                <td>{comunicado.descripcion}</td>
                <td>
                  <button
                    className={styles['eliminar-button']}
                    onClick={() => eliminarComunicado(comunicado.id)}
                  >
                    Eliminar
                  </button>
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


      <Link to='/funciones'>
        <button className={styles['buttons']}>atras</button>
      </Link>
    </div>

  );
};

export default Comunicado;