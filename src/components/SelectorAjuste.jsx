import React, { useState } from 'react';
import TipoGestion from './TipoGestion';
import { dinamica, getProcesos } from '../utils/logica_dinamica'

const SelectorAjuste = () => {
    const [ajuste, setAjuste] = useState('primer')
    const [vista, setVista] = useState(true)

    const cambio = (e) => {
        setAjuste(e.target.value)
    }

    const aplicar = () => {
        setVista(!vista)
    }

    return (
        <div>
            {vista && (
                <div className='cont'>
                    <h2>Algoritmo de memoria Dinamica sin compacatación</h2>
                    <span>Ajuste actual: {ajuste}</span>
                    <select name="ajuste" onChange={cambio} defaultValue="primer">
                        <option value="primer">Primer ajuste</option>
                        <option value="mejor">Mejor ajuste</option>
                        <option value="peor">Peor ajuste</option>
                    </select>
                    <button onClick={aplicar} className='my-button'>Usar Ajuste</button>
                </div>
            )}
            {!vista && (
                <TipoGestion algoritmo={dinamica} ajuste={ajuste} procesos_cargados={getProcesos}></TipoGestion>
            )}
        </div>
    );
};

export default SelectorAjuste;