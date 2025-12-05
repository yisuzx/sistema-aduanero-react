import api from './api';

const contactService = {
  enviarMensaje: async (formData) => {
    try {
      const response = await api.post('/contact', formData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  }
};

export default contactService;