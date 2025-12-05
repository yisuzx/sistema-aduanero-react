import React, { useState, useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import dashboardService from '../services/dashboardsService';

Chart.register(...registerables);

const DashboardReportes = ({ user }) => {
  const [reportType, setReportType] = useState('todos');
  const [dateRange, setDateRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [reportData, setReportData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const chartRef = useRef(null);
  const pieChartRef = useRef(null);

  useEffect(() => {
    fetchReportData();
  }, []);

  useEffect(() => {
    if (reportData && !isLoading) {
      createCharts(reportData);
    }
  }, [reportData, isLoading]);

  const fetchReportData = async (e) => {
    if(e) e.preventDefault();
    setIsLoading(true);
    
    try {
      const params = {};
      if (dateRange.startDate) params.fechaInicio = dateRange.startDate;
      if (dateRange.endDate) params.fechaFin = dateRange.endDate;
      
      const data = await dashboardService.getReportes(params);
      setReportData(data);
      
    } catch (error) {
      console.error('Error cargando reportes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generarReporteActual = async () => {
    setIsLoading(true);
    try {
        await dashboardService.generarReporteReal("MENSUAL"); 
        
        alert("¡Reporte generado con el estado actual de la base de datos!");
        fetchReportData(); 

    } catch (error) {
        alert("Error al generar reporte: " + error);
    } finally {
        setIsLoading(false);
    }
  };

  const handleExportReport = () => {
    if (!reportData) return;
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `reportes-${user?.tipo || 'general'}.json`;
    link.click();
  };

  const createCharts = (data) => {
    if (chartRef.current) chartRef.current.destroy();
    if (pieChartRef.current) pieChartRef.current.destroy();

    const labels = Object.keys(data.datosGrafico || {});
    const values = Object.values(data.datosGrafico || {});

    const chartLabels = labels.length ? labels : ["Sin Datos"];
    const chartValues = labels.length ? values : [0];

    const ctx = document.getElementById('reportesChart');
    if (ctx) {
      chartRef.current = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Total'],
          datasets: [{
            label: 'Reportes Encontrados',
            data: [data.estadisticas?.total || 0],
            backgroundColor: 'rgba(30, 60, 114, 0.7)',
            borderColor: 'rgba(30, 60, 114, 1)',
            borderWidth: 1,
            maxBarThickness: 60 
          }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: 'Volumen de Reportes' }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1 
                    }
                }
            }
        }
      });
    }

    const pieCtx = document.getElementById('estadosChart');
    if (pieCtx) {
      pieChartRef.current = new Chart(pieCtx, {
        type: 'pie',
        data: {
          labels: chartLabels,
          datasets: [{
            data: chartValues,
            backgroundColor: [
              '#0d6efd', 
              '#198754', 
              '#ffc107', 
              '#dc3545',
              '#6610f2'
            ]
          }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            plugins: {
                title: { display: true, text: 'Tipos de Reporte' }
            }
        }
      });
    }
  };

  if (isLoading) {
    return (
      <div className="dashboard-container text-center py-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Procesando...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container reportes-dashboard">
      <div className="dashboard-header mb-4">
        <div className="header-content">
          <h1 className="dashboard-title text-primary">Reportes del Sistema</h1>
          <p className="dashboard-subtitle">Visualización estadística por perfil</p>
        </div>
      </div>

      <div className="container mt-4">
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="card-title text-primary mb-4">Filtros</h5>
            <form onSubmit={fetchReportData}>
              <div className="row g-3">
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="form-label">Tipo</label>
                    <select className="form-select" value={reportType} onChange={(e) => setReportType(e.target.value)}>
                      <option value="todos">Todos</option>
                      <option value="diario">Diario</option>
                      <option value="mensual">Mensual</option>
                    </select>
                  </div>
                </div>
                
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="form-label">Desde</label>
                    <input type="date" className="form-control"
                      value={dateRange.startDate}
                      onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="col-md-3">
                  <div className="form-group">
                    <label className="form-label">Hasta</label>
                    <input type="date" className="form-control"
                      value={dateRange.endDate}
                      onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                    />
                  </div>
                </div>

                <div className="col-md-3 d-flex align-items-end gap-2">
                  <button type="submit" className="btn btn-primary w-100">
                    Filtrar
                  </button>
                  <button type="button" className="btn btn-success w-100" onClick={handleExportReport}>
                    Exportar
                  </button>
                </div>
              </div>
              
              <div className="row mt-3">
                <div className="col-12">
                    <button 
                      type="button" 
                      className="btn btn-warning w-100 fw-bold" 
                      onClick={generarReporteActual}
                    >
                      📸 Generar Reporte Actual (Snapshot)
                    </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-8 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-3 text-muted">Historial de Generación</h6>
                <div style={{ height: '300px', width: '100%' }}>
                  <canvas id="reportesChart"></canvas>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h6 className="card-subtitle mb-3 text-muted">Distribución por Tipo</h6>
                <div style={{ height: '300px', width: '100%' }}>
                  <canvas id="estadosChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-primary mb-4">Detalle de Reportes</h5>
            {reportData?.reportes && reportData.reportes.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Título</th>
                      <th>Tipo</th>
                      <th>Fecha Generación</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportData.reportes.map((report, index) => (
                      <tr key={report.id || index}>
                        <td>{index + 1}</td>
                        <td>{report.titulo}</td>
                        <td><span className="badge bg-info">{report.tipo}</span></td>
                        <td>{new Date(report.fechaGeneracion).toLocaleString()}</td>
                        <td>
                            <button className="btn btn-sm btn-outline-primary" onClick={() => alert(report.contenido)}>
                                Ver Datos
                            </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-5 text-muted">
                No hay reportes generados. Utiliza el botón "Generar Reporte Actual".
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardReportes;