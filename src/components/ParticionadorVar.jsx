import React, { useState } from 'react';
import TipoGestion from './TipoGestion';
import { estatica_variable, RAM, setterParticiones, getProcesos} from '../utils/logica_estatica_variable'
import '../styles/Particionador.css'

const ParticionadorVar = () => {
    const [ajuste, setAjuste] = useState('primer')
    const [vista, setVista] = useState(true)
    const [tamanio, setTamanio] = useState(0)
    const [particiones, setParticiones] = useState([])
    const [total, setTotal] = useState(RAM)

    const cambio = (e) => {
        setAjuste(e.target.value)
    }
    const change = (e) => {
        setTamanio(e.target.value)
    }
    const aplicar = () => {
        setterParticiones(particiones)
        setVista(!vista)
    }

    const add = (e) => {
        if (tamanio <= total && parseInt(tamanio) > 0) {
            let aux = particiones
            aux.push(parseInt(tamanio))
            setParticiones(aux)
            setTotal(total - tamanio)
            setTamanio(0)
        }
    }

    return (
        <div className='principal'>
            {vista && (
                <div className='flex-row'>
                    <div className='cont'>
                        <h2>Algoritmo de memoria estática con partición variable</h2>
                        <span>Memoria por asignar: {total}</span>
                        <select name="ajuste" onChange={cambio} defaultValue="primer">
                            <option value="primer">Primer ajuste</option>
                            <option value="mejor">Mejor ajuste</option>
                            <option value="peor">Peor ajuste</option>
                        </select>
                        <div>
                            <input type="number" name='tamanio' onChange={change} value={tamanio} className='entrada' />
                            <button onClick={add} className='my-button particionar'>Definir partición</button>
                        </div>
                        <button onClick={aplicar} className='my-button'>Simular</button>
                    </div>
                    <div className='tablaPa'>
                        <table>
                            <tbody>
                                <tr>
                                    <th>Tamaño de la partición</th>
                                </tr>
                                {particiones.map((child, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{child} Bytes</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                </div>

            )}
            {!vista && (
                <TipoGestion algoritmo={estatica_variable} ajuste={ajuste} procesos_cargados={getProcesos}></TipoGestion>
            )}
        </div>
    );
};

export default ParticionadorVar;