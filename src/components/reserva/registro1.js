import React from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useFormik } from 'formik';

const Registro = () => {
  const Registrarse = async (e) => {
    const fecha = moment(values.fecha).format('YYYY-MM-DD');
    const hora = values.hora;
    const fechaHora = moment(`${fecha} ${hora}`, 'YYYY-MM-DD HH:mm').tz('America/La_Paz').format();
    const datos = new FormData();
    datos.append('nombre', values.nombre);
    datos.append('fecha_hora', fechaHora);
    axios.get('https://backend12.000webhostapp.com/verificarI.php?fecha_hora=' + fechaHora)
      .then((response) => {
        if (response.data.existe) {
          alert('Ya existe una reserva con la misma fecha y hora. Por favor, elige otra fecha y hora.');
        } else {
          axios.post('https://backend12.000webhostapp.com/reservarI.php', datos)
            .then(() => {
              window.location.reload();
            })
            .catch((error) => {
              console.error(error);
              alert('Error al agregar la reserva. Por favor, intenta nuevamente.');
            });
        }
      });
  };

  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      nombre: '',
      startDate: new Date(),
      hora: '8:00',
    },
    onSubmit: (values, { setSubmitting }) => {
      const formattedDate = format(values.startDate, 'MM/dd/yyyy HH:mm');
      console.log({ ...values, startDate: formattedDate });
      Registrarse();
      setSubmitting(true);
    },
  });

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: '24px',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {
      marginBottom: '10px',
    },
    input: {
      padding: '5px',
      marginBottom: '10px',
    },
    button: {
      padding: '10px 20px',
      backgroundColor: 'blue',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginBottom: '10px',
    },
    link: {
      textDecoration: 'none',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Bienvenidos a la Barbería</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Nombre:
          <br />
          <input
            type="text"
            id="nombre"
            placeholder="Nombres"
            value={values.nombre}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>
        <br />
        <label style={styles.label}>Fecha:</label>
        <input
          type="date"
          name="fecha"
          value={moment(values.fecha).format('YYYY-MM-DD')}
          onChange={handleChange}
          min={moment().format('YYYY-MM-DD')}
          required
          style={styles.input}
        />
        <label style={styles.label}>Hora:</label>
        <select name="hora" value={values.hora} onChange={handleChange} style={styles.input}>
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

        <button type="submit" style={styles.button}>
          Reservar
        </button>
      </form>
      <br />
      <Link to="/card" style={styles.link}>
        <button style={styles.button}>Atrás</button>
      </Link>
    </div>
  );
};

export default Registro;
