import React, { useState } from 'react';
import TipoGestion from './TipoGestion';
import { setter_particion, estaticas_fija, getProcesos} from '../utils/logica_estatica_fija'
import '../styles/Particionador.css'

const ParticionadorFijo = () => {
    const [particion, setParticion] = useState(false)
    const [tamanio, setTamanio] = useState(1048576)

    const change = (e) => {
        setTamanio(e.target.value)
    }

    const cambiar = (e) => {
        setter_particion(tamanio)
        setParticion(!particion)
    }
    return (
        <div className='principal'>
            {!particion && (
                <div className='cont'>
                    <div>
                        <h2>Algoritmo de memoria estática con partición fija</h2>
                        <span>El siguiente input te permite definir el tamaño de la particion</span>
                    </div>
                    <input type="number" name='tamanio' onChange={change} value={tamanio} className='entrada' />
                    <button onClick={cambiar} className='my-button'>Definir partición</button>
                </div>
            )}
            {particion && (
                <TipoGestion algoritmo={estaticas_fija} procesos_cargados={getProcesos}></TipoGestion>
            )}
        </div>
    );
};

export default ParticionadorFijo;