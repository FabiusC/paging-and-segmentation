import { useInformacion, useProceso, useTablaContigua } from "./TipoContigua";
import '../../styles/Cargador.css';
import { GenerarTablas } from "../../utils/logica_segmentacion";

const DescargarContigua = ({ descarga, ajuste }) => {
    const { proceso, setProceso } = useProceso()
    const { Tablacon, setTabla } = useTablaContigua()
    const { informacion, setInformacion } = useInformacion()

    const eliminarProceso = (element) => {
        let obj = proceso
        let eliminado = obj.splice(element, 1)[0]
        let nombre = Object.keys(eliminado)[0].substring(0, Object.keys(eliminado)[0].length - (2 + eliminado[Object.keys(eliminado)[0]].id.toString().length))
        eliminado = { [nombre]: eliminado[Object.keys(eliminado)[0]] }
        console.log(eliminado)

        let test = descarga(eliminado)
        if (ajuste !== undefined) {
            setTabla(Array.from(test))
            setInformacion(GenerarTablas())
        } else {
            setTabla(Array.from(test[0]))
        }

        setProceso(Array.from(obj))
    }

    return (
        <div className="procesos">
            {proceso.map((child, index) => {
                return (
                    <div key={index} className="elemento">
                        <p>{Object.keys(child)}</p>
                        <button type="button" onClick={() => { eliminarProceso(index) }}>eliminar proceso</button>
                    </div>
                )
            })}
        </div>
    );
};

export default DescargarContigua;