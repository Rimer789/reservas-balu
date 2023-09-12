import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (usuario === 'administrador' && contrasena === 'admin12345') {
      window.location.href = '/funciones';
    } else if(usuario === 'barber1' && contrasena === 'barber') {
      window.location.href = '/reservas1'; 
    }else if(usuario === 'barber2' && contrasena === 'barber') {
      window.location.href = '/reservas2'; 
    }else if(usuario === 'barber3' && contrasena === 'barber') {
      window.location.href = '/reservas3'; 
    } else {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="form">
        <div>
          <label className="label">Usuario:</label>
          <input
          className="input"
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
          />
        </div>
        <div>
          <label className="label">Contraseña:</label>
          <input
          className="input"
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
          />
        </div>
        <div>
          <button type="submit" className="button2">Login</button>
        </div>
        <Link to='/'>
          <button className='button'>atras</button>
        </Link>
      </form>


    </div>
  );
};

export default Login;
