import React, { useState } from 'react';
import contactService from '../services/contactServices';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    asunto: '',
    mensaje: '',
    tipoConsulta: 'general'
  });
  const [mensaje, setMensaje] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (mensaje) {
      setMensaje('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!formData.asunto.trim()) newErrors.asunto = 'El asunto es requerido';
    if (!formData.mensaje.trim()) newErrors.mensaje = 'El mensaje es requerido';
    
    if (formData.email && !formData.email.includes('@')) {
      newErrors.email = 'Email inválido';
    }

    if (formData.telefono && !/^\d{9,12}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'Teléfono inválido (9 a 12 dígitos)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    console.log("Iniciando envío del formulario...");

    setIsLoading(true);

    if (!validateForm()) {
      setMensaje('Por favor, corrija los errores del formulario.');
      setIsLoading(false);
      return;
    }

    try {

      console.log("Enviando datos al backend:", formData);
      const respuesta = await contactService.enviarMensaje(formData);
      console.log("Respuesta del servidor:", respuesta);

      setMensaje('¡Mensaje enviado exitosamente! Nos contactaremos con usted pronto.');
      
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        asunto: '',
        mensaje: '',
        tipoConsulta: 'general'
      });

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setMensaje(
        typeof error === 'string' 
          ? error 
          : 'Error al conectar con el servidor. Intente nuevamente.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-with-nav">
      <div className="form-content">
        <div className="form-box">
          <div>
            <h1 className="form-title">Contacto</h1>
            <p className="form-subtitle">Sistema Aduanero - Paso Los Libertadores</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="nombre" className="form-label form-label-required">
                    Nombre Completo
                  </label>
                  <input 
                    type="text" 
                    id="nombre" 
                    name="nombre" 
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ingrese su nombre completo"
                    disabled={isLoading}
                    className={`form-input ${errors.nombre ? 'error' : ''}`}
                  />
                  {errors.nombre && (
                    <div className="form-error"> {errors.nombre}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email" className="form-label form-label-required">
                    Email
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Ingrese su email"
                    disabled={isLoading}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                  />
                  {errors.email && (
                    <div className="form-error"> {errors.email}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="telefono" className="form-label">
                    Teléfono
                  </label>
                  <input 
                    type="tel" 
                    id="telefono" 
                    name="telefono" 
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="Ingrese su teléfono"
                    disabled={isLoading}
                    className={`form-input ${errors.telefono ? 'error' : ''}`}
                  />
                  {errors.telefono && (
                    <div className="form-error"> {errors.telefono}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="tipoConsulta" className="form-label">
                    Tipo de Consulta
                  </label>
                  <select 
                    id="tipoConsulta" 
                    name="tipoConsulta" 
                    value={formData.tipoConsulta}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="form-input"
                  >
                    <option value="general">Consulta General</option>
                    <option value="importacion">Importación</option>
                    <option value="exportacion">Exportación</option>
                    <option value="tramites">Trámites Aduaneros</option>
                    <option value="problema">Problema Técnico</option>
                    <option value="sugerencia">Sugerencia</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="asunto" className="form-label form-label-required">
                Asunto
              </label>
              <input 
                type="text" 
                id="asunto" 
                name="asunto" 
                value={formData.asunto}
                onChange={handleInputChange}
                placeholder="Ingrese el asunto de su consulta"
                disabled={isLoading}
                className={`form-input ${errors.asunto ? 'error' : ''}`}
              />
              {errors.asunto && (
                <div className="form-error"> {errors.asunto}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="mensaje" className="form-label form-label-required">
                Mensaje
              </label>
              <textarea 
                id="mensaje" 
                name="mensaje" 
                value={formData.mensaje}
                onChange={handleInputChange}
                placeholder="Describa su consulta o mensaje en detalle..."
                disabled={isLoading}
                rows="6"
                className={`form-textarea ${errors.mensaje ? 'error' : ''}`}
              />
              {errors.mensaje && (
                <div className="form-error"> {errors.mensaje}</div>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="form-button"
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="loading-spinner"></div>
                  Enviando...
                </div>
              ) : (
                'Enviar Mensaje'
              )}
            </button>
            
            {mensaje && (
              <div className={`form-message ${mensaje.includes('éxito') ? 'success' : 'error'}`}>
                {mensaje}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '25px' }}>
              <div className="contact-info">
                <h4 style={{ color: '#1e3c72', marginBottom: '15px' }}>Información de Contacto</h4>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Teléfono:</strong> +56 9 1234 5678
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Email:</strong> contacto@sistemaduanero.cl
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Dirección:</strong> Paso Internacional Los Libertadores, Los Andes
 
                </p>
                <p style={{ margin: '5px 0', color: '#666' }}>
                  <strong>Horario:</strong> Lunes a Viernes 8:00 - 18:00 hrs
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;