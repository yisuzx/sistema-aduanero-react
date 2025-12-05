import React, { useState, useEffect } from 'react';
import pdiService from '../services/pdiServices';

const PdiHistorial = () => {
    const [registros, setRegistros] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        cargarRegistros();
    }, []);

    const cargarRegistros = async () => {
        try {
            // Este endpoint ya lo tienes en tu PDIController (/api/pdi/registros)
            const data = await pdiService.getRegistros(); 
            // Si el backend devuelve { registros: [...] }, ajusta aquí:
            setRegistros(data.registros || data); 
        } catch (error) {
            console.error("Error al cargar historial:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-5">Cargando registros...</div>;

    return (
        <div className="dashboard-container">
            <h1 className="dashboard-title text-primary">Historial de Controles PDI</h1>
            
            <div className="table-responsive mt-4">
                <table className="table table-hover table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th>Fecha</th>
                            <th>Nombre Viajero</th>
                            <th>RUT/Pasaporte</th>
                            <th>Nacionalidad</th>
                            <th>Motivo</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {registros.length > 0 ? (
                            registros.map((reg) => (
                                <tr key={reg.id}>
                                    <td>{new Date(reg.fechaIngreso).toLocaleDateString()}</td>
                                    <td>{reg.nombreCompleto}</td>
                                    <td>{reg.rut}</td>
                                    <td>{reg.nacionalidad}</td>
                                    <td>{reg.motivoViaje}</td>
                                    <td>
                                        <span className="badge bg-success">{reg.estado || 'REGISTRADO'}</span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">No hay registros encontrados.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PdiHistorial;