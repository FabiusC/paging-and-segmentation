import '../styles/Tabla.css';
import { useTabla } from "./TipoGestion";

const Tabla = () => {
    const { tablacon } = useTabla()

    return (
        <div className='tabla'>
            <table>
                <tbody>
                    <tr>
                        <th>PID</th>
                        <th>inicio</th>
                        <th>final</th>
                    </tr>
                    {tablacon && tablacon.map((child, index) => (
                        <tr key={index}>
                            <td>{child[0]}</td>
                            <td>{child[1]}</td>
                            <td>{child[2]}</td>
                            <td>{child[3]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Tabla;