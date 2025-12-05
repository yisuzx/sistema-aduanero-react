import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Navigation = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const getDashboardPath = () => {
        if (!user) return '/login';
        switch(user.tipo) {
            case 'pdi': return '/dashboard-pdi';
            case 'sag': return '/dashboard-sag';
            default: return '/dashboard-usuario';
        }
    };

    return (
        <header className="navigation-header">
            <div className="nav-container">
                <Link to="/" className="nav-brand">Sistema Aduanero</Link>
                <nav>
                    <ul className="nav-menu">
                        {}
                        <li className="nav-item">
                            <NavLink to="/" className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`} end>Inicio</NavLink>
                        </li>

                        {}
                        {user && (
                            <li className="nav-item">
                                <NavLink to="/reportes" className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                                    <AssessmentIcon style={{ marginRight: '5px', fontSize: '18px' }} />
                                    Reportes
                                </NavLink>
                            </li>
                        )}

                        {}
                        {user ? (
                           
                            <>
                                <li className="nav-item">
                                    <span className="nav-button user-welcome" style={{ cursor: 'default' }}>
                                        Hola, {user.nombre}
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <NavLink to={getDashboardPath()} className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>
                                        Mi Panel
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className="nav-button logout-btn"
                                        onClick={() => onLogout(navigate)}
                                    >
                                        Cerrar Sesión
                                    </button>
                                </li>
                            </>
                        ) : (
                          
                            <>
                                <li className="nav-item">
                                    <NavLink to="/login" className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>Login</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/register" className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>Registro</NavLink>
                                </li>
                            </>
                        )}

                        {}
                        <li className="nav-item">
                            <NavLink to="/contact" className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>Contacto</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/pdi-form" className={({ isActive }) => `nav-button ${isActive ? 'active' : ''}`}>Control PDI</NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Navigation;