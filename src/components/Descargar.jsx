import { useProceso } from "./TipoGestion";
import '../styles/Cargador.css';

const Descargar = () => {
    const { proceso, setProceso } = useProceso()

    const eliminarProceso = (element) => {
        let obj = { ...proceso }
        delete obj[element]
        setProceso(obj)
    }

    return (
        <div className="procesos">
            {Object.keys(proceso).map((child) => {
                return (
                    <div key={child} className="elemento">
                        <p>{child}</p>
                        <button type="button" onClick={() => { eliminarProceso(child) }}>eliminar proceso</button>
                    </div>
                )
            })}
        </div>
    );
};

export default Descargar;