import React from "react";
import '../App.css';

function Metodos({id, value, onChange}){
    return(
        <div className='row'>
          <div className='col-auto'><h2>Metodo: </h2></div>
          <div className='col-auto'>
            <input 
              type="text"
              placeholder='Metodo'
              value={value}
              onChange={e => onChange(id, e.target.value)}></input></div>
        </div>
    )
}
export default Metodos;