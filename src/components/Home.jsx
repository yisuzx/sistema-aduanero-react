import { Link } from "react-router-dom";
import Service from "./Service";

function Home() {
    return (
        <div className="home-container">
            {}
            <section className="hero-section">
                <div className="mountain-background"></div>
                <div className="container">
                    <div className="row justify-content-center text-center">
                        <div className="col-lg-8 hero-content">
                            <h1 className="system-title">SISTEMA ADUANERO</h1>
                            <div className="border-animation"></div>
                            <p className="system-subtitle mt-3">
                                Gestión eficiente y segura de operaciones aduaneras
                            </p>
                            
                            <div className="hero-buttons">
                                <Link to="/login" className="btn-hero-primary">
                                    Ingresar al Sistema
                                </Link>
                                <Link to="/contact" className="btn-hero-secondary">
                                    Más Información
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {}
            <Service />
        </div>
    );
}

export default Home;