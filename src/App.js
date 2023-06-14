import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import Card from './components/card/Card.js';
import Inicio from './components/inicio/inicio.js';
import Reservas from './components/ver/reservas.js';
import Registro from './components/reserva/registro.js';
import Reservas1 from './components/ver/reservas1.js';
import Registro1 from './components/reserva/registro1.js';
import Reservas2 from './components/ver/reservas2.js';
import Registro2 from './components/reserva/registro2.js';
import Reservas3 from './components/ver/reservas3.js';
import Registro3 from './components/reserva/registro3.js';

function App() {
  return (
    <div className="background">
      <Router>
      <Routes>
      <Route  path="/" element={<Inicio/>} />
      <Route path="/card" element={<Card/>} />
      <Route path='/reservas' element={<Reservas/>}/>
      <Route path='/registro' element={<Registro/>}/>
      <Route path='/reservas1' element={<Reservas1/>}/>
      <Route path='/registro1' element={<Registro1/>}/>
      <Route path='/reservas2' element={<Reservas2/>}/>
      <Route path='/registro2' element={<Registro2/>}/>
      <Route path='/reservas3' element={<Reservas3/>}/>
      <Route path='/registro3' element={<Registro3/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
