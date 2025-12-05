import api from './api';

const dashboardService = {
  getDashboard: async (tipo) => {
    const response = await api.get(`/dashboard/${tipo}`);
    return response.data;
  },

  getReportes: async (params) => {
    const response = await api.get('/reportes', { params });
    return response.data;
  },

  generarReporteReal: async (tipoReporte) => {
    try {
      const response = await api.post('/reportes/generar', { 
        tipo: tipoReporte,
        titulo: "Reporte Generado " + new Date().toLocaleDateString()
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default dashboardService;