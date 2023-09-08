import React, { useState } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import './registro.css';

const Registro = () => {
  // Obtén la hora actual en la zona horaria de La Paz
  const horaActualEnLaPaz = moment().tz('America/La_Paz').format('HH:mm');

  const [disponible, setDisponible] = useState(true);

  const verificarDisponibilidad = async (values) => {
    const fecha = moment(values.fecha).format('YYYY-MM-DD');
    const hora = values.hora;
    const fechaHora = moment(`${fecha} ${hora}`, 'YYYY-MM-DD HH:mm').tz('America/La_Paz').format();

    // Compara la fecha seleccionada con la fecha actual en La Paz
    if (moment(fechaHora).isBefore(moment().tz('America/La_Paz').format('YYYY-MM-DD HH:mm'))) {
      alert('No puedes seleccionar horas pasadas.');
      return;
    }

    try {
      const response = await axios.get(`https://barber-production-1d18.up.railway.app/api/reservas2/disponibilidad?fecha_hora=${fechaHora}`);
      console.log('Respuesta de verificación:', response.data);

      const esDisponible = response.data.disponible; // Guarda el valor en una variable temporal

      setDisponible(esDisponible); // Actualiza disponible
      console.log(esDisponible);

      if (!esDisponible) {
        console.log('Llegué a este punto'); // Agrega esto antes de la alerta
        alert('Ya existe una reserva con la misma fecha y hora. Por favor, elige otra fecha y hora.');

      } else {
        // Si está disponible, puedes continuar con el proceso de registro
        registrarReserva(values);
      }
    } catch (error) {
      console.error('Error al verificar la disponibilidad de reserva:', error);
    }
  };

  const registrarReserva = async (values) => {
    const fecha = moment(values.fecha).format('YYYY-MM-DD');
    const hora = values.hora;
    const fechaHora = moment(`${fecha} ${hora}`, 'YYYY-MM-DD HH:mm:ss').tz('America/La_Paz').format('YYYY-MM-DD HH:mm:ss');
    const datos = {
      nombre: values.nombre,
      fecha_hora: fechaHora,
    };

    try {
      const response = await axios.post('https://barber-production-1d18.up.railway.app/api/reservas2', datos);
      console.log(response.data);
      alert('Reserva creada con éxito');

      // Restablece los valores del formulario o redirige al usuario
      // Por ejemplo, puedes redirigir al usuario a otra página después del registro
      // history.push('/otra-pagina');
    } catch (error) {
      console.error('Error al agregar la reserva:', error);
      alert('Ya existe otra reserva para este horario');
    }
  };

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      nombre: '',
      fecha: moment().format('YYYY-MM-DD'), // Configura la fecha inicial como la fecha actual
      hora: '08:00',
    },
    onSubmit: (values, { setSubmitting }) => {
      verificarDisponibilidad(values);
      setSubmitting(true);
    },
  });

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <label className="label">Nombre:</label>
        <input
          type="text"
          id="nombre"
          placeholder="Nombres"
          name="nombre"
          value={values.nombre}
          onChange={handleChange}
          required
          className="input"
        />
        <label className="label">Fecha:</label>
        <input
          type="date"
          name="fecha"
          value={values.fecha}
          onChange={handleChange}
          min={moment().format('YYYY-MM-DD')} // Configura la fecha mínima como la fecha actual
          required
          className="input"
        />
        <label className="label">Hora:</label>
        <select name="hora" value={values.hora} onChange={handleChange} className="input">
          <option value="08:00">8:00 am</option>
          <option value="08:30">8:30 am</option>
          <option value="09:00">9:00 am</option>
          <option value="09:30">9:30 am</option>
          <option value="10:00">10:00 am</option>
          <option value="10:30">10:30 am</option>
          <option value="11:00">11:00 am</option>
          <option value="11:30">11:30 am</option>
          <option value="12:00">12:00 pm</option>
          <option value="12:30">12:30 pm</option>
          <option value="13:30">1:30 pm</option>
          <option value="14:00">2:00 pm</option>
          <option value="14:30">2:30 pm</option>
          <option value="15:00">3:00 pm</option>
          <option value="15:30">3:30 pm</option>
          <option value="16:00">4:00 pm</option>
          <option value="16:30">4:30 pm</option>
          <option value="17:00">5:00 pm</option>
          <option value="17:30">5:30 pm</option>
          <option value="18:00">6:00 pm</option>
          <option value="18:30">6:30 pm</option>
          <option value="19:00">7:00 pm</option>
          <option value="19:30">7:30 pm</option>
          <option value="20:00">8:00 pm</option>
        </select>
        <button type="submit" className="button2">
          Reservar
        </button>
      </form>
      <br />
      <Link to="/card" className="link">
        <button1 className="button1">Atrás</button1>
      </Link>
    </div>
  );
};

export default Registro;
