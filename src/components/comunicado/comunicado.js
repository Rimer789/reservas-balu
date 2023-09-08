import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
   
      <div>
        <textarea
          placeholder="Escribe tu comunicado aquí"
          value={nuevoComunicado}
          onChange={(e) => setNuevoComunicado(e.target.value)}
        />
        <button onClick={crearComunicado}>Publicar Comunicado</button>
      </div>
      <div>
        <h3>Comunicados Recientes</h3>
        <ul>
          {comunicados.map((comunicado) => (
            <li key={comunicado.id}>
              {comunicado.descripcion}
              <button onClick={() => eliminarComunicado(comunicado.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Comunicado;
