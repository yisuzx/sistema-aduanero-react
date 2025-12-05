import api from './api';

const pdiService = {
  registrarControl: async (formData) => {
    try {
      const response = await api.post('/pdi/registro', formData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getRegistros: async () => {
    try {
      const response = await api.get('/pdi/registros');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getVerificacion: async () => {
    try {
      const response = await api.get('/pdi/verificacion');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  getReportesPDI: async () => {
    try {
      const response = await api.get('/pdi/reportes');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  realizarConsulta: async (tipo, parametro) => {
    try {
      const response = await api.get(`/pdi/consultas?tipo=${tipo}&parametro=${parametro}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default pdiService;