import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../styles/Esfija.css';
import Cargador from './Cargador';
import Tabla from './Tabla';
import { options } from '../utils/stack_bar';
import React, { useState, createContext, useContext, useEffect } from 'react';
import Descargar from './Descargar';
import { color } from '../utils/color';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ProcesoContext = createContext();

export const useProceso = () => {
    return useContext(ProcesoContext);
};

const TablaContext = createContext();

export const useTabla = () => {
    return useContext(TablaContext);
};

const TipoGestion = ({ algoritmo, ajuste, procesos_cargados }) => {
    const [proceso, setProceso] = useState({});
    const [tablacon, setTabla] = useState([]);
    const [operacion, setOperacion] = useState(true);
    const [chart, setChart] = useState({
        labels: ['Memoria 16 Mb'],
        datasets: []
    });

    const generarDataset = () => {
        let objeto = [];
        for (let index = 0; index < tablacon.length; index++) {
            const element = tablacon[index];
            if (element[0] !== undefined) {
                objeto.push({
                    label: element[0],
                    data: [element[2] - element[1]],
                    backgroundColor: color(index),
                });
            } else {
                objeto.push({
                    label: element[0],
                    data: [element[2] - element[1]],
                    backgroundColor: `rgba(255, 255, 255, 0)`,
                    borderColor: `rgb(0,0,0,0.5)`,
                    borderWidth: 1,
                });
            }
        }
        return objeto;
    };

    const cambiarOperacion = () => {
        setOperacion(!operacion);
    };

    useEffect(() => {
        let auxTabla;
        if (ajuste !== undefined) {
            auxTabla = algoritmo(proceso, ajuste);
        } else {
            auxTabla = algoritmo(proceso);
        }
        setTabla(Array.from(auxTabla));
    }, [proceso, algoritmo, ajuste]);

    useEffect(() => {
        let datos = {
            ...chart,
            datasets: generarDataset(),
        };
        setChart(datos);
        if (operacion) {
            if (JSON.stringify(procesos_cargados()) !== JSON.stringify(Object.keys(proceso))) {
                for (let index = 0; index < Object.keys(proceso).length; index++) {
                    if (!procesos_cargados().includes(Object.keys(proceso)[index])) {
                        const a = proceso;
                        delete a[Object.keys(proceso)[index]];
                        setProceso(a);
                    }
                }
            }
        }
    }, [tablacon]);

    return (
        <div className="fija">
            <div className="left-section">
                <div className="info">
                    {operacion && <button className="cambio" onClick={cambiarOperacion}>Eliminar Procesos</button>}
                    {!operacion && <button className="cambio" onClick={cambiarOperacion}>Añadir Procesos</button>}
                    <ProcesoContext.Provider value={{ proceso, setProceso }}>
                        {operacion && <Cargador />}
                        {!operacion && <Descargar />}
                    </ProcesoContext.Provider>
                </div>
                <div className="tabla">
                    <TablaContext.Provider value={{ tablacon }}>
                        <Tabla />
                    </TablaContext.Provider>
                </div>
            </div>
            <div className="right-section">
                <div className="chart-container">
                    <Bar options={options} data={chart} />
                </div>
            </div>
        </div>
    );
};

export default TipoGestion;
