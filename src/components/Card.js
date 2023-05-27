import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import "./card.css";
import { useFormik } from "formik";
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.jpg"
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from "date-fns";


const Card = ({ children }) => {

  const calculateTimeRange = (selectedDate) => {
    const currentDate = new Date();
    const isToday =
      selectedDate.getDate() === currentDate.getDate() &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear();
    const minTime = isToday
      ? Math.max(currentDate, new Date().setHours(8, 0))
      : new Date().setHours(8, 0);
    const maxTime = new Date().setHours(20, 0);
    if (isToday && selectedDate.getHours() < currentDate.getHours()) {
      return { minTime: null, maxTime: null };
    }
    return { minTime, maxTime };
  };

  const [reservas, setReservas] = useState([]);

  useEffect(() => {
    const today = new Date().toISOString().substr(0, 10);
    const url = `http://localhost/balu_reservas/api.php?fecha=${today}`;
    fetch(url)
      .then(response => response.json())
      .then(data => setReservas(data));
  }, []);



  const Registrarse = async (e) => {
    const fecha = moment(values.fecha).format("YYYY-MM-DD");
    const hora = values.hora;
    const fechaHora = moment(`${fecha} ${hora}`, "YYYY-MM-DD HH:mm").tz('America/La_Paz').format();
    const datos = new FormData();
    datos.append('nombre', values.nombre);
    datos.append('fecha_hora', fechaHora);

    // Realizar una verificación adicional antes de la inserción
    axios.get('http://localhost/balu_reservas/verificar.php?fecha_hora=' + fechaHora)
      .then((response) => {
        if (response.data.existe) {
          alert("Ya existe una reserva con la misma fecha y hora. Por favor, elige otra fecha y hora.");

        } else {
          // Insertar la nueva reserva
          axios.post('http://localhost/balu_reservas/reservar.php', datos)
            .then(() => {
              window.location.reload();
            })
            .catch(error => {
              console.error(error);
              alert("Error al agregar la reserva. Por favor, intenta nuevamente.");
            });
        }
      })

  };


  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      nombre: "",
      startDate: new Date(),
      hora: "8:00",
    },
    onSubmit: (values, { setSubmitting }) => {
      const formattedDate = format(values.startDate, "MM/dd/yyyy HH:mm");
      console.log({ ...values, startDate: formattedDate });
      Registrarse();
      setSubmitting(true);
    },
  });

  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const [showModal1, setShowModal1] = useState(false);

  const handleOpenModal1 = () => {
    setShowModal1(true);
  };

  const handleCloseModal1 = () => {
    setShowModal1(false);
  };
  const [showModal2, setShowModal2] = useState(false);

  const handleOpenModal2 = () => {
    setShowModal2(true);
  };

  const handleCloseModal2 = () => {
    setShowModal2(false);
  };

  const { minTime, maxTime } = calculateTimeRange(values.startDate);

  return (
    <div className='card-container'>
      <button className="card" onClick={handleOpenModal}>
        <h3 class="card-header">Balu</h3>
        <img className="card-image" src={image1} />
      </button>
      <button className="card" onClick={handleOpenModal1} >
        <h3 class="card-header" >otro</h3>
        <img className="card-image" src={image2} />
      </button>
      <button className="card" onClick={handleOpenModal2}>
        <div class="card-header" >otro2</div>
        <img className="card-image" src={image3} />
      </button>
      <button className="card" onClick={handleOpenModal2}>
        <div class="card-header" >otro3</div>
        <img className="card-image" src={image3} />
      </button>
 
      {showModal && (
        <div className="modal11">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <form onSubmit={handleSubmit}>
              <label>
                Nombre:
                <be />
                <input
                  type="text"
                  id="nombre"
                  placeholder="Nombres"
                  value={values.nombre}
                  onChange={handleChange}
                  required
                />
              </label>
              <br />
              <label>Fecha:</label>
              <input
                type="date"
                name="fecha"
                value={moment(values.fecha).format("YYYY-MM-DD")}
                onChange={handleChange}
                min={moment().format("YYYY-MM-DD")} // Permite seleccionar solo la fecha actual o posteriores
                required
              />
              <label>Hora:</label>
              <select
                name="hora"
                value={values.hora}
                onChange={handleChange}
              >
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

              <button onClick={handleSubmit} >Reservar</button>
            </form>
          </div>
        </div>
      )}
      {showModal1 && (
        <div className="modal11">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal1}>
              &times;
            </span>
            <div>
              <h1>Reservas para hoy</h1>
              <ul>
                {reservas.map(reserva => (
                  <li key={reserva.id}>
                    {reserva.nombre} - {reserva.fecha_hora}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      {showModal2 && (
        <div className="modal11">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal2}>
              &times;
            </span>
            <p>Contenido del modal aquí.3</p>
          </div>
        </div>
      )}
    </div>
  );
}


export default Card;
