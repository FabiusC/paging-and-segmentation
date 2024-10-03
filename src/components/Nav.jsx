import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import '../styles/index.css';
import '../styles/Nav.css';
import Adder from './Adder';
import SelectorPaginas from './SelectorPaginas';
import SelectorSegmento from './SelectorSegmento';

const Nav = () => {
    return (
        <div>
            <Router>
                <nav>
                    <h1>Gestión de memoria</h1>
                    <ul>
                        <li><Link className='link' to="/">Agregar</Link></li>
                        <li><Link className='link' to="/paginacion">Paginación</Link></li>
                        <li><Link className='link' to="/segmentacion">Segmentación</Link></li>
                    </ul>
                </nav>
                <Routes>
                    <Route path='/' element={<Adder></Adder>}></Route>
                    <Route path="/paginacion" element={<SelectorPaginas></SelectorPaginas>}></Route>
                    <Route path="/segmentacion" element={<SelectorSegmento></SelectorSegmento>}></Route>
                </Routes>

            </Router>
        </div>
    );
};

export default Nav;