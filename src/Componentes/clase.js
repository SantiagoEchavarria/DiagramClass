import React, { useRef, useState } from 'react';
import '../App.css';



function Clase({id, nombre, atributos, metodos, onModify, onMove}) {
  const containerRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [bounds] = useState({ minX: 0, minY: 0, maxX: 1280, maxY: 720 });


  const handleMouseDown = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
        // Calcular la nueva posicion
        let newX = e.clientX - offset.x;
        let newY = e.clientY - offset.y;

        if (newX < bounds.minX) newX = bounds.minX;
        if (newX > bounds.maxX) newX = bounds.maxX;
        if (newY < bounds.minY) newY = bounds.minY;
        if (newY > bounds.maxY) newY = bounds.maxY;
  
        setPosition({ x: newX, y: newY });
      }
    };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      
      ref={containerRef}
      style={{ left: `${position.x}px`, top: `${position.y}px`, position: 'absolute', cursor: 'move' }}
     
    >


      <div className="col-12" id='borde'
       onMouseDown={handleMouseDown}
       onMouseMove={handleMouseMove}
       onMouseUp={handleMouseUp}>clase: {nombre}</div>
      
      <div className="col-12" id='borde'
       onMouseDown={handleMouseDown}
       onMouseMove={handleMouseMove}
       onMouseUp={handleMouseUp}>

        atributos: {atributos.map((attr, index) => (
          <div key={attr.id} className='atributo'>
            <p>{attr.value}</p>
         </div>
        ))}
        </div>
      <div className="col-12" id='borde'
       onMouseDown={handleMouseDown}
       onMouseMove={handleMouseMove}
       onMouseUp={handleMouseUp}>
        
        metodos: {metodos.map((attr, index) => (
          <div key={attr.id} className='atributo'>
            <p>{attr.value}</p>
          </div>
        )
        )}</div>
      
      <button onClick={onModify}>...</button>
    </div>
  );
}

export default Clase;
