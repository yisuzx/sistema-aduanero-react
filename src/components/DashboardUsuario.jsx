import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboardService from '../services/dashboardsService';
import tramitesService from '../services/tramitesService';

const DashboardUsuario = ({ user }) => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    tramitesPendientes: 0,
    tramitesAprobados: 0,
    documentosPendientes: 0,
    alertas: 0
  });

  const [tramitesRecientes, setTramitesRecientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const dashboardData = await dashboardService.getDashboard('usuario');
      if (dashboardData.stats) {
        setStats(dashboardData.stats);
      }

      const listaTramites = await tramitesService.getTramites();
      const ultimos = Array.isArray(listaTramites) 
        ? listaTramites.sort((a, b) => new Date(b.fechaCreacion) - new Date(a.fechaCreacion)).slice(0, 5) 
        : [];
      
      setTramitesRecientes(ultimos);

    } catch (error) {
      console.error('Error cargando datos del usuario:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Cargando tu panel...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container user-general-dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1 className="dashboard-title">
            Hola, {user?.nombre} {user?.apellido}
          </h1>
          <div className="user-info">
            <div className="user-avatar">
              {user?.nombre?.charAt(0)}{user?.apellido?.charAt(0)}
            </div>
            <div className="user-details">
              <h2>Usuario Aduanero</h2>
              <span className="user-role-badge">Importación / Exportación</span>
            </div>
          </div>
        </div>
      </div>
      
      {}
      <div className="stats-container mb-4">
        <div className="row">
          <div className="col-md-3">
            <div className="stat-card">
              <h3 className="text-warning">{stats.tramitesPendientes}</h3>
              <p>Trámites Pendientes</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card">
              <h3 className="text-success">{stats.tramitesAprobados}</h3>
              <p>Trámites Aprobados</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card">
              <h3 className="text-primary">{stats.documentosPendientes}</h3>
              <p>Documentos</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stat-card">
              <h3 className="text-danger">{stats.alertas}</h3>
              <p>Alertas / Rechazados</p>
            </div>
          </div>
        </div>
      </div>
      
      {}
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Mis Trámites</h3>
            <p className="card-description">Revisa el estado de tus solicitudes en curso</p>
          </div>
          <div className="card-actions">
            <button className="btn-card" onClick={() => navigate('/tramites')}>
              Ver Historial
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Nuevo Trámite</h3>
            <p className="card-description">Inicia una nueva solicitud de importación</p>
          </div>
          <div className="card-actions">
            <button className="btn-card" onClick={() => navigate('/nuevo-tramite')}>
              Crear Solicitud
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Documentos</h3>
            <p className="card-description">Sube facturas, certificados y manifiestos</p>
          </div>
          <div className="card-actions">
            <button className="btn-card" onClick={() => navigate('/documentos')}>
              Gestión Documental
            </button>
          </div>
        </div>
        
        <div className="dashboard-card">
          <div className="card-header">
            <h3 className="card-title">Reportes</h3>
            <p className="card-description">Estadísticas de tus operaciones</p>
          </div>
          <div className="card-actions">
            <button className="btn-card" onClick={() => navigate('/reportes')}>
              Ver Reportes
            </button>
          </div>
        </div>
      </div>

      {}
      <div className="container mt-5">
        <div className="card shadow-sm">
          <div className="card-body">
            <h4 className="card-title text-primary mb-3">Actividad Reciente</h4>
            
            {tramitesRecientes.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>N° Trámite</th>
                      <th>Tipo</th>
                      <th>Estado</th>
                      <th>Fecha Ingreso</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tramitesRecientes.map((tramite) => (
                      <tr key={tramite.id}>
                        <td className="fw-bold">{tramite.numero || `TR-${tramite.id}`}</td>
                        <td>{tramite.tipo}</td>
                        <td>
                          <span className={`badge ${
                            tramite.estado === 'APROBADO' ? 'bg-success' :
                            tramite.estado === 'PENDIENTE' ? 'bg-warning text-dark' :
                            'bg-danger'
                          }`}>
                            {tramite.estado}
                          </span>
                        </td>
                        <td>{tramite.fechaCreacion ? new Date(tramite.fechaCreacion).toLocaleDateString() : '-'}</td>
                        <td>
                            <button className="btn btn-sm btn-outline-primary" onClick={() => navigate('/tramites')}>
                                Detalle
                            </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="alert alert-info text-center m-0">
                No tienes trámites recientes. ¡Crea uno nuevo!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUsuario;