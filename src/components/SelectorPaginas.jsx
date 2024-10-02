import React, { useState } from 'react';
import TipoContigua from './contigua/TipoContigua';
import Swal from 'sweetalert2';
import { paginacion, eliminar_proceso_paginacion, setter } from '../utils/paginacion'

const SelectorPaginas = () => {
    const [control, setControl] = useState(false)
    const [paginas, setPaginas] = useState(8)
    const [inicio, setinicio] = useState()


    const change = (e) => {
        setPaginas(e.target.value)
    }


    const cambiar = (e) => {
        if (paginas > 0 && paginas <= 11) {
            setinicio(setter(parseInt(paginas)))
            setControl(true)
        }
        else {
            Swal.fire({
                title: 'Error!!',
                icon: "error",
                text: 'El valor agregado para paginas no está permitido por desición del programador',
                confirmButtonColor: '#333'
            })
        }
    }

    return (
        <div>
            {!control && (
                <div className='cont'>
                    <h2>Algoritmo de memoria con paginación</h2>
                    <span>cantidad de marcos: {Math.pow(2, paginas)}</span>
                    <div>
                        <span>Valor de paginas &nbsp;&nbsp;&nbsp; </span>
                        <input type='number' className='entrada' value={paginas} onChange={change}></input>
                    </div>
                    <button onClick={cambiar}>Seleccionar paginas</button>
                </div>
            )}
            {control && (<TipoContigua carga={paginacion} descarga={eliminar_proceso_paginacion} nombre={"marcos"} inicio={inicio} nombreT={['Tabla de marcos','marco | PID <br>']} nombreTa={['Tabla de paginas',"nombre-proceso | páginas | marco <br>"]}></TipoContigua>)}
        </div>
    );
};

export default SelectorPaginas;