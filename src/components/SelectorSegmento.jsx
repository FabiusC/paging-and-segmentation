import React, { useState } from 'react';
import TipoContigua from './contigua/TipoContigua';
import Swal from 'sweetalert2';
import { segmentacion, eliminarProceso, setter } from '../utils/logica_segmentacion'

const SelectorSegmento = () => {
    const [control, setControl] = useState(false)
    const [segmentos, setsegmentos] = useState(8)
    const [ajuste, setAjuste] = useState('primer')
    const [inicio, setinicio] = useState()


    const cambio = (e) => {
        setAjuste(e.target.value)
    }

    const change = (e) => {
        setsegmentos(e.target.value)
    }


    const cambiar = (e) => {
        if (segmentos > 0 && segmentos <= 11) {
            setinicio(setter(parseInt(segmentos)))
            setControl(true)
        }
        else {
            Swal.fire({
                title: 'Error!!',
                icon: "error",
                text: 'El valor agregado para segmentos no está permitido por desición del programador',
                confirmButtonColor: '#333'
            })
        }
    }

    return (
        <div>
            {!control && (
                <div className='cont'>
                    <h2>Algoritmo de memoria con segmentacion</h2>
                    <span>offset: {Math.pow(2, 24 - segmentos)}</span>
                    <div>
                        <span>Valor de segmento: &nbsp;&nbsp;&nbsp;</span>
                        <input type='number' className='entrada' value={segmentos} onChange={change}></input>
                    </div>

                    <span>Ajuste actual: {ajuste}</span>
                    <select name="ajuste" onChange={cambio} defaultValue="primer">
                        <option value="primer">Primer ajuste</option>
                        <option value="mejor">Mejor ajuste</option>
                        <option value="peor">Peor ajuste</option>
                    </select>
                    <button onClick={cambiar}>Seleccionar segmentos</button>
                </div>
            )}
            {control && (<TipoContigua carga={segmentacion} descarga={eliminarProceso} ajuste={ajuste} nombre={'offset'} inicio={inicio} nombreT={['Tabla de bloques libres','Inicio | Fin | Fin - Inicio <br>']} nombreTa={['Tabla de procesos','Segmentos | Segmentos Bin | Inicio Decimal | Inicio Hex | Limite | Permisos <br>']}></TipoContigua>)}
        </div>
    );
};

export default SelectorSegmento;