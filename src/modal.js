import React, { useState, useEffect } from "react";
import Atributos from "./Componentes/atributos";
import Metodos from "./Componentes/metodos";
import './modal.css';

const Modal = ({isOpen, saveNodo, nodoParaModificar, closeModal, saveAtributos, saveMetodos, saveNombre}) => {
    const [atributos, setAtributos] = useState([{id: 0, value: ""}]);
    const [idCounter, setIdCounter] = useState(1);

    const [metodos, setMetodos] = useState([{id:0, value: ""}]);
    const [idCounterMetodo, setIdCounterMetodo] = useState(1);

    const [nombre, setNombre] = useState("");


    useEffect(() => {
        if (nodoParaModificar) {
          setNombre(nodoParaModificar.nombre);
          setAtributos(nodoParaModificar.atributos);
          setMetodos(nodoParaModificar.metodos);
          setIdCounter(nodoParaModificar.atributos.length);
          setIdCounterMetodo(nodoParaModificar.metodos.length);
        } else {
          setNombre("");
          setAtributos([{ id: 0, value: "" }]);
          setMetodos([{ id: 0, value: "" }]);
          setIdCounter(1);
          setIdCounterMetodo(1);
        }
      }, [nodoParaModificar]);


    const agregarMetodo = () => {
        setMetodos([...metodos, {id: idCounterMetodo, value:""}]);
        setIdCounterMetodo(idCounterMetodo+1);
    }
    const handleMetodoChange = (id, newValue) => {
        setMetodos(metodos.map(attr =>
            attr.id === id ? {...attr, value: newValue} : attr
        )

        )
    }
    const guardarMetodos = () => {
        saveMetodos(metodos);
        console.log("Metodos guardados:", metodos);
    }



    const agregarAtributo = () => {
        setAtributos([...atributos, {id: idCounter, value:""}]);
        setIdCounter(idCounter+1);
    };

    const handleAtributoChange= (id, newValue) => {
        setAtributos(atributos.map(attr =>
            attr.id === id ? { ...attr, value: newValue} : attr
        ));
    };
    const guardarAtributos = () => {
        saveAtributos(atributos);
        console.log("Atributos guardados:", atributos);
        closeModal(); 
      };

/*
    const guardar = () => {
        saveNombre(nombre)
        guardarMetodos();
        guardarAtributos();
    }*/
   const guardar = () =>{
        saveNodo(nombre, atributos, metodos);
        closeModal();
   }

    if(!isOpen) return null;

    return (
    <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content" onClick={e => e.stopPropagation()}>

          <div className="modal-header">
            <h2>Nombre:</h2>
            <input type='text' 
            placeholder='Nombre' 
            value={nombre}
            onChange={(e) => setNombre(e.target.value)} />
          </div>

          <div className="modal-body">

            {atributos.map((attr, index) => (
                <Atributos 
                key={attr.id}
                id={attr.id}
                value={attr.value}
                onChange={handleAtributoChange} />
            ))}
            <button onClick={agregarAtributo}>Agregar atributos</button>
            
            {metodos.map((attr, index) => (
                <Metodos 
                key={attr.id}
                id={attr.id}
                value={attr.value}
                onChange={handleMetodoChange}/>
            ))}
            <button onClick={agregarMetodo}>Agregar métodos</button>
          
          </div>

          <div className="modal-footer">
          <button onClick={guardar}>Guardar</button>
            <button onClick={closeModal}>Salir</button>
          </div>
          
        </div>
    </div>
    );
}
export default Modal;