import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardService from '../services/dashboardsService';

const DashboardSAG = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    inspeccionesHoy: 0,
    certificadosEmitidos: 0,
    productosCuarentena: 0,
    alertasSanitarias: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await dashboardService.getDashboard('sag');
        if (data.stats) {
            setStats(data.stats);
        }
      } catch (error) {
        console.error("Error cargando dashboard SAG:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="text-center mt-5">Cargando panel...</div>;

  return (
    <div className="dashboard-container sag-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Bienvenido, {user?.nombre} {user?.apellido}</h1>
        <div className="user-info">
          <div className="user-avatar">
            {user?.nombre?.charAt(0)}{user?.apellido?.charAt(0)}
          </div>
          <div className="user-details">
            <h2>Personal SAG</h2>
            <span className="user-role-badge">Inspección Sanitaria</span>
          </div>
        </div>
      </div>

      {}
      <div className="stats-container mb-4">
          <div className="row">
            <div className="col-md-3">
              <div className="stat-card">
                <h3 className="text-success">{stats.inspeccionesHoy}</h3>
                <p>Total Inspecciones</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <h3 className="text-primary">{stats.certificadosEmitidos}</h3>
                <p>Certificados Emitidos</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <h3 className="text-warning">{stats.productosCuarentena}</h3>
                <p>En Cuarentena</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <h3 className="text-danger">{stats.alertasSanitarias}</h3>
                <p>Rechazados</p>
              </div>
            </div>
          </div>
        </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Inspección Sanitaria</h3>
            <p className="card-description">Control de productos agrícolas y animales</p>
          </div>
          <div className="card-actions">
            <button className="btn-card" onClick={() => navigate('/inspeccion')}>
              Inspeccionar
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Certificación</h3>
            <p className="card-description">Emisión de certificados fitosanitarios</p>
          </div>
          <div className="card-actions">
            <button className="btn-card" onClick={() => navigate('/certificacion')}>
              Certificar
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Cuarentena</h3>
            <p className="card-description">Gestión de productos en cuarentena</p>
          </div>
          <div className="card-actions">
            <button className="btn-card" onClick={() => navigate('/cuarentena')}>
              Gestionar
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Reportes SAG</h3>
            <p className="card-description">Historial de control sanitario</p>
          </div>
          <div className="card-actions">
            <button className="btn-card" onClick={() => navigate('/reportes')}>
              Generar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSAG;