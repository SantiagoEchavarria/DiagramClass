import React from "react";
import '../App.css';

function Atributos({id, value, onChange}){
    return(
        <div className='row'>
          <div className='col-auto'><h2>Atributo: </h2></div>
          <div className='col-auto'>
            <input type='text' 
            placeholder='Atributo'
            value={value}
            onChange={e => onChange(id, e.target.value)}></input></div>
        </div>
    )
}
export default Atributos;