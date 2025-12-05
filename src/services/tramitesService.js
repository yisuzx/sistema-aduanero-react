import api from './api';

const tramitesService = {
  getTramites: async () => {
    try {
      const response = await api.get('/tramites');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  crearTramite: async (tramiteData) => {
    try {
      const response = await api.post('/tramites', tramiteData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },


  getEstadoAduanero: async () => {
    try {
      const response = await api.get('/tramites/estado-aduanero');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default tramitesService;