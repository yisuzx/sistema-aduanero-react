import React, { useState } from 'react';
import pdiService from '../services/pdiServices';

const PDIForm = () => {
  const [formData, setFormData] = useState({
    nombreCompleto: '',
    rut: '',
    nacionalidad: '',
    paisProcedencia: '',
    paisDestino: '',
    motivoViaje: 'turismo',
    medioTransporte: 'automovil',
    fechaIngreso: '',
    fechaSalida: '',
    documentos: [],
    observaciones: ''
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

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      documentos: checked 
        ? [...prev.documentos, value]
        : prev.documentos.filter(doc => doc !== value)
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombreCompleto.trim()) newErrors.nombreCompleto = 'El nombre completo es requerido';
    if (!formData.rut.trim()) newErrors.rut = 'El RUT es requerido';
    if (!formData.nacionalidad.trim()) newErrors.nacionalidad = 'La nacionalidad es requerida';
    if (!formData.paisProcedencia.trim()) newErrors.paisProcedencia = 'El país de procedencia es requerido';
    if (!formData.paisDestino.trim()) newErrors.paisDestino = 'El país de destino es requerido';
    if (!formData.fechaIngreso) newErrors.fechaIngreso = 'La fecha de ingreso es requerida';
    
    if (formData.rut && !/^\d{7,8}-[\dkK]$/.test(formData.rut)) {
      newErrors.rut = 'RUT inválido (Formato: 12345678-9)';
    }

    if (formData.documentos.length === 0) {
      newErrors.documentos = 'Seleccione al menos un documento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setMensaje('Por favor, corrija los errores del formulario.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await pdiService.registrarControl(formData);
      
      setMensaje(result.mensaje || '¡Formulario PDI enviado exitosamente!');

      setFormData({
        nombreCompleto: '',
        rut: '',
        nacionalidad: '',
        paisProcedencia: '',
        paisDestino: '',
        motivoViaje: 'turismo',
        medioTransporte: 'automovil',
        fechaIngreso: '',
        fechaSalida: '',
        documentos: [],
        observaciones: ''
      });

    } catch (error) {
      setMensaje(typeof error === 'string' ? error : 
                  error.message || 'Error al enviar el formulario. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-with-nav">
      <div className="form-content">
        <div className="form-box">
          <div>
            <h1 className="form-title">Control Fronterizo PDI</h1>
            <p className="form-subtitle">Policía de Investigaciones de Chile - Paso Los Libertadores</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombreCompleto" className="form-label form-label-required">
                Nombre Completo
              </label>
              <input 
                type="text" 
                id="nombreCompleto" 
                name="nombreCompleto" 
                value={formData.nombreCompleto}
                onChange={handleInputChange}
                placeholder="Ingrese nombre y apellido completo"
                disabled={isLoading}
                className={`form-input ${errors.nombreCompleto ? 'error' : ''}`}
              />
              {errors.nombreCompleto && (
                <div className="form-error"> {errors.nombreCompleto}</div>
              )}
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="rut" className="form-label form-label-required">
                    RUT / Número de Pasaporte
                  </label>
                  <input 
                    type="text" 
                    id="rut" 
                    name="rut" 
                    value={formData.rut}
                    onChange={handleInputChange}
                    placeholder="Ej: 12345678-9"
                    disabled={isLoading}
                    className={`form-input ${errors.rut ? 'error' : ''}`}
                  />
                  {errors.rut && (
                    <div className="form-error"> {errors.rut}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="nacionalidad" className="form-label form-label-required">
                    Nacionalidad
                  </label>
                  <input 
                    type="text" 
                    id="nacionalidad" 
                    name="nacionalidad" 
                    value={formData.nacionalidad}
                    onChange={handleInputChange}
                    placeholder="Ingrese su nacionalidad"
                    disabled={isLoading}
                    className={`form-input ${errors.nacionalidad ? 'error' : ''}`}
                  />
                  {errors.nacionalidad && (
                    <div className="form-error"> {errors.nacionalidad}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="paisProcedencia" className="form-label form-label-required">
                    País de Procedencia
                  </label>
                  <input 
                    type="text" 
                    id="paisProcedencia" 
                    name="paisProcedencia" 
                    value={formData.paisProcedencia}
                    onChange={handleInputChange}
                    placeholder="País desde donde ingresa"
                    disabled={isLoading}
                    className={`form-input ${errors.paisProcedencia ? 'error' : ''}`}
                  />
                  {errors.paisProcedencia && (
                    <div className="form-error"> {errors.paisProcedencia}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="paisDestino" className="form-label form-label-required">
                    País de Destino
                  </label>
                  <input 
                    type="text" 
                    id="paisDestino" 
                    name="paisDestino" 
                    value={formData.paisDestino}
                    onChange={handleInputChange}
                    placeholder="País hacia donde se dirige"
                    disabled={isLoading}
                    className={`form-input ${errors.paisDestino ? 'error' : ''}`}
                  />
                  {errors.paisDestino && (
                    <div className="form-error">{errors.paisDestino}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="motivoViaje" className="form-label">
                    Motivo del Viaje
                  </label>
                  <select 
                    id="motivoViaje" 
                    name="motivoViaje" 
                    value={formData.motivoViaje}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="form-input"
                  >
                    <option value="turismo">Turismo</option>
                    <option value="negocios">Negocios</option>
                    <option value="estudios">Estudios</option>
                    <option value="trabajo">Trabajo</option>
                    <option value="transito">Tránsito</option>
                    <option value="residente">Residente</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="medioTransporte" className="form-label">
                    Medio de Transporte
                  </label>
                  <select 
                    id="medioTransporte" 
                    name="medioTransporte" 
                    value={formData.medioTransporte}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="form-input"
                  >
                    <option value="automovil">Automóvil</option>
                    <option value="bus">Bus</option>
                    <option value="moto">Motocicleta</option>
                    <option value="bicicleta">Bicicleta</option>
                    <option value="pie">A pie</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="fechaIngreso" className="form-label form-label-required">
                    Fecha de Ingreso
                  </label>
                  <input 
                    type="date" 
                    id="fechaIngreso" 
                    name="fechaIngreso" 
                    value={formData.fechaIngreso}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className={`form-input ${errors.fechaIngreso ? 'error' : ''}`}
                  />
                  {errors.fechaIngreso && (
                    <div className="form-error"> {errors.fechaIngreso}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="fechaSalida" className="form-label">
                    Fecha de Salida Estimada
                  </label>
                  <input 
                    type="date" 
                    id="fechaSalida" 
                    name="fechaSalida" 
                    value={formData.fechaSalida}
                    onChange={handleInputChange}
                    disabled={isLoading}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label form-label-required">
                Documentos Presentados
              </label>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    value="pasaporte" 
                    checked={formData.documentos.includes('pasaporte')}
                    onChange={handleCheckboxChange}
                    disabled={isLoading}
                  />
                  Pasaporte
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    value="cedula" 
                    checked={formData.documentos.includes('cedula')}
                    onChange={handleCheckboxChange}
                    disabled={isLoading}
                  />
                  Cédula de Identidad
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    value="visa" 
                    checked={formData.documentos.includes('visa')}
                    onChange={handleCheckboxChange}
                    disabled={isLoading}
                  />
                  Visa
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    value="licencia" 
                    checked={formData.documentos.includes('licencia')}
                    onChange={handleCheckboxChange}
                    disabled={isLoading}
                  />
                  Licencia de Conducir
                </label>
                <label className="checkbox-label">
                  <input 
                    type="checkbox" 
                    value="otros" 
                    checked={formData.documentos.includes('otros')}
                    onChange={handleCheckboxChange}
                    disabled={isLoading}
                  />
                  Otros Documentos
                </label>
              </div>
              {errors.documentos && (
                <div className="form-error"> {errors.documentos}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="observaciones" className="form-label">
                Observaciones
              </label>
              <textarea 
                id="observaciones" 
                name="observaciones" 
                value={formData.observaciones}
                onChange={handleInputChange}
                placeholder="Observaciones adicionales..."
                disabled={isLoading}
                rows="4"
                className="form-textarea"
              />
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="form-button"
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="loading-spinner"></div>
                  Procesando...
                </div>
              ) : (
                'Registrar Ingreso'
              )}
            </button>
            
            {mensaje && (
              <div className={`form-message ${mensaje.includes('éxito') ? 'success' : 'error'}`}>
                {mensaje}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '25px' }}>
              <div className="pdi-info">
                <h4 style={{ color: '#1e3c72', marginBottom: '15px' }}>Información PDI</h4>
                <p style={{ margin: '5px 0', color: '#666', fontSize: '0.9rem' }}>
                  <strong>Horario de Atención:</strong> 24/7
                </p>
                <p style={{ margin: '5px 0', color: '#666', fontSize: '0.9rem' }}>
                  <strong>Teléfono Emergencias:</strong> 134
                </p>
                <p style={{ margin: '5px 0', color: '#666', fontSize: '0.9rem' }}>
                  <strong>Email:</strong> pdi@investigaciones.cl
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PDIForm;