
import React, { useState, useEffect } from 'react';
import tramitesService from '../services/tramitesService';

const EstadoAduanero = () => {
    const [estadoData, setEstadoData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEstado();
    }, []);

    const fetchEstado = async () => {
        try {
            const data = await tramitesService.getEstadoAduanero();
            setEstadoData(data);
        } catch (error) {
            console.error('Error cargando estado aduanero:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Cargando estado aduanero...</div>;
    if (!estadoData) return <div>No se pudo obtener el estado actual.</div>;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title text-primary">Consulta de Estado Aduanero</h1>
            <p className="dashboard-subtitle">Información en tiempo real de tu mercancía en la aduana.</p>

            <div className="card shadow-sm mt-4 p-4">
                <h5 className="card-title text-primary">Último Estado Registrado</h5>
                <p><strong>Estado Actual:</strong> 
                    <span className="badge bg-warning text-dark ms-2">{estadoData.estado}</span>
                </p>
                <p><strong>Aduana:</strong> {estadoData.aduana}</p>
                <p><strong>Fecha de Actualización:</strong> {new Date(estadoData.fechaActualizacion).toLocaleString()}</p>
                <div className="alert alert-info mt-3">
                    <strong>Observaciones:</strong> {estadoData.observaciones}
                </div>
            </div>
        </div>
    );
};

export default EstadoAduanero;