import React from "react";
import { Link } from "react-router-dom";
import styles from './funcion.module.css';

const Funcion =()=> {
    return(
        <div className="container"> 
        <p className={styles['titulo']}>enviar comunicado</p>
        <Link to='/comunicado'>
            <button className={styles['buttonL']}>comunicado</button>
        </Link>
        
        <p className={styles['titulo']}>ver mis reservas  </p>
        <Link to='/reservas'>
            <button className={styles['buttonL']}>mis reservas</button>
        </Link>
       
         </div>
    );
}
export default Funcion;