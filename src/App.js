import './App.css';
import Clase from './Componentes/clase';
import ReactFlow, {addEdge, Background, Controls, MiniMap} from 'reactflow';
import { useState } from 'react';
import Modal from './modal';



function App() {
 
  const [nombre, setNombre] = useState("");
  const [atributos, setAtributos] = useState([]);
  const [metodos, setMetodos] = useState([]);

  const [ismodalOpen, setIsModalOpen] = useState(false);
  const [nodos, setNodos] = useState([]);
  const [nodoParaModificar, setNodoParaModificar]=useState(null);

  const handleGuardarNodo = (nombre, atributos, metodos) =>{
    
    if (nodoParaModificar !== null) {
      const nodosActualizados = nodos.map((nodo, index) =>
        index === nodoParaModificar ? { nombre, atributos, metodos } : nodo
      );
      setNodos(nodosActualizados);
    } else {
      setNodos([...nodos, { nombre, atributos, metodos }]);
    }
    setNodoParaModificar(null);
  }

  const abrirModalParaModificar = (index) => {
    setNodoParaModificar(index);
    setIsModalOpen(true);
  };

  const handleSaveNombre = (newNombre) => {
    setNombre(newNombre);
  };

  const handleSaveAtributos = (newAtributos) => {
    setAtributos(newAtributos);
  };

  const handleSaveMetodos =(newMetodos) => {
    setMetodos(newMetodos);
  };

  return (
    <div className='container'>
      <div className="col-8">
        {nodos.map((nodo, index) => (
            <Clase 
              key={index} 
              nombre={nodo.nombre} 
              atributos={nodo.atributos} 
              metodos={nodo.metodos}
              onModify={() => abrirModalParaModificar(index)} />       
        ))}
        </div>

      <div className='col-4'>
        <button  onClick={() => setIsModalOpen(true)}>Agregar Clase</button>
        <Modal 
          isOpen={ismodalOpen} 
            closeModal={() => setIsModalOpen(false)}
            saveAtributos={handleSaveAtributos}
            saveMetodos={handleSaveMetodos}
            saveNombre={handleSaveNombre}
            saveNodo={handleGuardarNodo}
            nodoParaModificar={nodoParaModificar !== null ? nodos[nodoParaModificar] : null}
            ></Modal>
      </div>

      <div>
        <button id="drawArrowButton">Dibujar flecha</button>
        
      </div>

    </div>
  );  
}

export default App;
