function Navbar({ currentView, onNavigate }) {
    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div className="container">
                <span className="navbar-brand">
                    Sistema Aduanero
                </span>
                
                <button 
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarAduanero"
                    aria-controls="navbarAduanero"
                    aria-expanded="false"
                    aria-label="Toggle navegacion"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarAduanero">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <button 
                                className={`nav-link btn btn-link ${currentView === 'home' ? 'active' : ''}`}
                                onClick={() => onNavigate('home')}
                                style={{ border: 'none', background: 'none', color: 'inherit' }}
                            >
                                Inicio
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link btn btn-link ${currentView === 'login' ? 'active' : ''}`}
                                onClick={() => onNavigate('login')}
                                style={{ border: 'none', background: 'none', color: 'inherit' }}
                            >
                                Login
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link btn btn-link ${currentView === 'register' ? 'active' : ''}`}
                                onClick={() => onNavigate('register')}
                                style={{ border: 'none', background: 'none', color: 'inherit' }}
                            >
                                Registro
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link btn btn-link ${currentView === 'contact' ? 'active' : ''}`}
                                onClick={() => onNavigate('contact')}
                                style={{ border: 'none', background: 'none', color: 'inherit' }}
                            >
                                Contacto
                            </button>
                        </li>
                        <li className="nav-item">
                            <button 
                                className={`nav-link btn btn-link ${currentView === 'pdi' ? 'active' : ''}`}
                                onClick={() => onNavigate('pdi')}
                                style={{ border: 'none', background: 'none', color: 'inherit' }}
                            >
                                PDI
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;