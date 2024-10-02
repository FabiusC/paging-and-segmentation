import { useState } from "react";
import '../styles/Cargador.css';
import { useProceso } from "./TipoGestion";
import { llamarLocalStorage } from "../utils/data";
import Swal from 'sweetalert2'

const Cargador = () => {
  const itemExistente = localStorage.getItem('data');

  if (itemExistente === null) {
    llamarLocalStorage()
  } 
  const data = JSON.parse(localStorage.getItem('data'))
  const [datos] = useState(data)
  const { proceso, setProceso } = useProceso()

  // definimos las funciones
  const info = (value, e) => {
    Swal.fire({
      title: `Información (${value['nombre']})`,
      text: `.text: ${value['text']} | .data: ${value['data']} | .bss: ${value['bss']}`,
      icon: "question",
      confirmButtonColor: "#333",
      buttonsStyling: false,
      iconColor: "#a52a2a",
      footer: "Recuerde que el stack es de: <strong>65536 Bytes</strong>,<br> mientras que el heap es de: <strong>131072 Bytes</strong>."
    });
  }

  function add(index) {
    let name = data[index].nombre
    let val = data[index].text + data[index].data + data[index].bss + 65536 + 131072 //heap y stack
    const nuevo = {
      ...proceso,
    }
    nuevo[name] = val
    setProceso(nuevo)
  }

  return (
    <div className="procesos">
      {datos.map((child, index) => {
        return (
          <div key={child.nombre} className="elemento">
            <p>{`${child.nombre}: ${child.text + child.data + child.bss + 65536 + 131072}B`}</p>
            <div className="column">
              <button type="button" onClick={(e) => { info(child, e) }}>Info</button>
              <button onClick={() => { add(index) }}>Agregar</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Cargador;