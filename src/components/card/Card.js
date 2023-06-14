import React from 'react';
import "./card.css";
import styles from '../inicio/inicio.module.css';
import image1 from "../assets/image1.jpg"
import image2 from "../assets/image2.jpg"
import image3 from "../assets/image3.jpg"
import { Link } from 'react-router-dom';

const Card = ({ children }) => {

  return (
    <div>
    <div className='card-container'>
      <div className='card-containe'>
    <Link to="/registro">
      <button className="card">
        <h3 class="card-header">Balu Barber</h3>
        <img className="card-image" src={image1} />
      </button>
      </Link>
      <Link to="/reservas">
          <button className='buttona'>Mis reservas</button>
        </Link>
        </div>
        
       <div className='card-containe'>
        <Link to="/registro1">
      <button className="card" >
        <h3 class="card-header" >Jhon Barber</h3>
        <img className="card-image" src={image2} />
      </button>
      </Link>
      <Link to="/reservas1">
          <button className='buttona'>Mis reservas</button>
        </Link>
        </div>
        <div className='card-containe'>
        <Link to="/registro2">
      <button className="card" >
        <h3 class="card-header" >Negro Barber</h3>
        <img className="card-image" src={image3} />
      </button>
      </Link>
      <Link to="/reservas2">
          <button className='buttona'>Mis reservas</button>
        </Link>
        </div>
        <div className='card-containe'>
        <Link to="/registro3">
      <button className="card" >
        <h3 class="card-header" >Tika Barber</h3>
        <img className="card-image" src={image3} />
      </button>
      </Link>
      <Link to="/reservas3">
          <button className='buttona'>Mis reservas</button>
        </Link>
    </div>
    </div>
    <Link to='/'>
      <button className='buttona'> atras</button>
       </Link>
       <br/>
       <br/>
    </div>
    
  );
}


export default Card;
