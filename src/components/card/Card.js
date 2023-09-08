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
        <h4 class="card-header">Balu Barber</h4>
        <img className="card-image" src={image1} />
      </button>
      </Link>
      <Link to="/reservas">
          <buttona className='buttona'>Mis reservas</buttona>
        </Link>
        </div>
        
       <div className='card-containe'>
        <Link to="/registro1">
      <button className="card" >
        <h4 class="card-header" >Jhon Barber</h4>
        <img className="card-image" src={image2} />
      </button>
      </Link>
      <Link to="/reservas1">
      <buttona className='buttona'>Mis reservas</buttona>
        </Link>
        </div>
        <div className='card-containe'>
        <Link to="/registro2">
      <button className="card" >
        <h4 class="card-header" >Negro Barber</h4>
        <img className="card-image" src={image3} />
      </button>
      </Link>
      <Link to="/reservas2">
      <buttona className='buttona'>Mis reservas</buttona>
        </Link>
        </div>
        <div className='card-containe'>
        <Link to="/registro3">
      <button className="card" >
        <h4 class="card-header" >Tika Barber</h4>
        <img className="card-image" src={image3} />
      </button>
      </Link>
      <Link to="/reservas3">
      <buttona className='buttona'>Mis reservas</buttona>
        </Link>
        <br/>
        <br/>
        <Link to='/'>
      <buttona2 className='buttona2'> atras</buttona2>
       </Link>
    </div>
    </div>
    </div>
    
  );
}


export default Card;
