import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardService from '../services/dashboardsService';

const DashboardPDI = ({ user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    controlesHoy: 0,
    documentosVerificados: 0,
    reportesGenerados: 0,
    consultasRealizadas: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await dashboardService.getDashboard('pdi');
        if (data.stats) {
            setStats(data.stats);
        }
      } catch (error) {
        console.error("Error cargando dashboard PDI:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="text-center mt-5">Cargando panel...</div>;

  return (
    <div className="dashboard-container pdi-dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Bienvenido, {user?.nombre} {user?.apellido}</h1>
        <div className="user-info">
          <div className="user-avatar">
            {user?.nombre?.charAt(0)}{user?.apellido?.charAt(0)}
          </div>
          <div className="user-details">
            <h2>Personal PDI</h2>
            <span className="user-role-badge">Control Fronterizo</span>
          </div>
        </div>
      </div>
      
      {}
      <div className="stats-container mb-4">
          <div className="row">
            <div className="col-md-3">
              <div className="stat-card">
                <h3>{stats.controlesHoy}</h3>
                <p>Ingresos Hoy</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <h3>{stats.documentosVerificados}</h3>
                <p>Total Histórico</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <h3>{stats.reportesGenerados}</h3>
                <p>Reportes Guardados</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="stat-card">
                <h3>{stats.consultasRealizadas}</h3>
                <p>Consultas</p>
              </div>
            </div>
          </div>
        </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Control Fronterizo</h3>
            <p className="card-description">Gestión de ingreso y salida de personas</p>
          </div>
          <div className="card-actions">
            <button className="btn-card" onClick={() => navigate('/pdi-form')}>
              Acceder
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Verificación Documental</h3>
            <p className="card-description">Validación de documentos de viajeros</p>
          </div>
          <div className="card-actions">
            <button className="btn-card" onClick={() => navigate('/verificacion')}>
              Verificar
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Reportes</h3>
            <p className="card-description">Generar snapshots históricos</p>
          </div>
          <div className="card-actions">
            <button className="btn-card" onClick={() => navigate('/reportes')}>
              Generar
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Consultas</h3>
            <p className="card-description">Consultas especiales de seguridad</p>
          </div>
          <div className="card-actions">
            <button className="btn-card" onClick={() => navigate('/consultas-pdi')}>
              Consultar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPDI;