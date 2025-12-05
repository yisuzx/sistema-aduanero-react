import React, { useState, useEffect } from 'react';
import tramitesService from '../services/tramitesService';
import { useNavigate } from 'react-router-dom';

const TramitesPage = () => {
    const [tramites, setTramites] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const cargarData = async () => {
            try {
                const data = await tramitesService.getTramites();
                setTramites(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
        cargarData();
    }, []);

    if (loading) return <div className="text-center mt-5">Cargando...</div>;

    return (
        <div className="dashboard-container">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="dashboard-title text-primary">Mis Trámites</h1>
                <button className="btn btn-primary" onClick={() => navigate('/nuevo-tramite')}>
                    + Nuevo Trámite
                </button>
            </div>

            {tramites.length === 0 ? (
                <div className="alert alert-warning text-center">
                    No tienes trámites registrados.
                </div>
            ) : (
                <div className="table-responsive">
                    <table className="table table-bordered table-hover">
                        <thead className="table-light">
                            <tr>
                                <th>Número</th>
                                <th>Tipo</th>
                                <th>Descripción</th>
                                <th>Estado</th>
                                <th>Fecha</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tramites.map(t => (
                                <tr key={t.id}>
                                    <td className="fw-bold">{t.numero}</td>
                                    <td>{t.tipo}</td>
                                    <td>{t.descripcion}</td>
                                    <td>
                                        <span className={`badge ${
                                            t.estado === 'APROBADO' ? 'bg-success' : 
                                            t.estado === 'PENDIENTE' ? 'bg-warning text-dark' : 'bg-danger'
                                        }`}>
                                            {t.estado}
                                        </span>
                                    </td>
                                    <td>{new Date(t.fechaCreacion).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default TramitesPage;