import api from './api';

const documentosService = {
  getDocumentos: async () => {
    try {
      const response = await api.get('/documentos');
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },

  uploadDocumento: async (formData) => {
    try {
      const response = await api.post('/documentos/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default documentosService;