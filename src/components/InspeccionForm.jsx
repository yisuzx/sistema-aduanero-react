
import React, { useState } from 'react';
import sagService from '../services/sagService';

const InspeccionForm = () => {
  const [formData, setFormData] = useState({
    producto: '',
    origen: '',
    fechaInspeccion: new Date().toISOString().split('T')[0],
    inspector: '',
    resultado: 'APROBADO',
    observaciones: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (mensaje) setMensaje('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensaje('');

    if (!formData.producto || !formData.origen) {
      setMensaje("Producto y Origen son requeridos.");
      setIsLoading(false);
      return;
    }

    try {
      const result = await sagService.registrarInspeccion(formData);
      setMensaje(result.mensaje + ` (ID: ${result.idInspeccion})`);
    } catch (error) {
      setMensaje('Error en el registro SAG: ' + (error.message || 'Error desconocido'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-with-nav">
      <div className="form-content">
        <div className="form-box">
          <h1 className="form-title">Registro de Inspección SAG</h1>
          <p className="form-subtitle">Servicio Agrícola y Ganadero</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Producto a Inspeccionar</label>
              <input type="text" name="producto" value={formData.producto} onChange={handleInputChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">País de Origen</label>
              <input type="text" name="origen" value={formData.origen} onChange={handleInputChange} className="form-input" required />
            </div>
            <div className="form-group">
              <label className="form-label">Resultado</label>
              <select name="resultado" value={formData.resultado} onChange={handleInputChange} className="form-input">
                <option value="APROBADO">Aprobado</option>
                <option value="RECHAZADO">Rechazado</option>
                <option value="CUARENTENA">A Cuarentena</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Observaciones</label>
              <textarea name="observaciones" value={formData.observaciones} onChange={handleInputChange} className="form-textarea" />
            </div>

            <button type="submit" disabled={isLoading} className="btn-card">
              {isLoading ? 'Registrando...' : 'Registrar Inspección'}
            </button>
            {mensaje && <div className={`form-message ${mensaje.includes('éxito') ? 'success' : 'error'}`}>{mensaje}</div>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default InspeccionForm;