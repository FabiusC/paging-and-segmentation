import '../../styles/Tabla.css';
import { useTablaContigua } from "./TipoContigua";

const TablaContigua = ({nombre}) => {
    const { Tablacon } = useTablaContigua()
    return (
        <div className='tabla'>
            <table>
                <tbody>
                    <tr>
                        <th>PID</th>
                        <th>inicio</th>
                        <th>final</th>
                        <th>{nombre}</th>
                    </tr>
                    {Tablacon && Tablacon.map((child, index) => (
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

export default TablaContigua;