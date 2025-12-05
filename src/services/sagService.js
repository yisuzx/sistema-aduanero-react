import api from './api';

const sagService = {
  registrarInspeccion: async (datos) => {
    try {
      const response = await api.post('/sag/inspeccion', datos);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  emitirCertificado: async (datos) => {
    try {
      const response = await api.post('/sag/certificacion', datos);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  gestionarCuarentena: async (datos) => {
    try {
      const response = await api.post('/sag/cuarentena', datos);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getCuarentenas: async () => {
    try {
      const response = await api.get('/sag/cuarentena');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getReportesSAG: async () => {
    try {
      const response = await api.get('/sag/reportes');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default sagService;