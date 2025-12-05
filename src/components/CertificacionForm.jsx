import React, { useState } from 'react';
import sagService from '../services/sagService';
import { useNavigate } from 'react-router-dom';

const CertificacionForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    producto: '',
    origen: '',
    tipo: 'Fitosanitario', 
    observaciones: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [certificado, setCertificado] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMensaje('');
    setCertificado(null);

    try {
      const result = await sagService.emitirCertificado(formData);
      setCertificado(result); 
      setMensaje('Certificado emitido exitosamente.');
    } catch (error) {
      setMensaje('Error: ' + (error.message || 'No se pudo emitir el certificado'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-with-nav">
      <div className="form-content">
        <div className="form-box">
          <h1 className="form-title">Emisión de Certificados</h1>
          <p className="form-subtitle">Servicio Agrícola y Ganadero</p>
          
          {!certificado ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Producto</label>
                <input 
                  type="text" name="producto" 
                  value={formData.producto} onChange={handleInputChange} 
                  className="form-input" required placeholder="Ej: Manzanas, Trigo..." 
                />
              </div>
              <div className="form-group">
                <label className="form-label">País de Origen/Destino</label>
                <input 
                  type="text" name="origen" 
                  value={formData.origen} onChange={handleInputChange} 
                  className="form-input" required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Tipo de Certificado</label>
                <select name="tipo" value={formData.tipo} onChange={handleInputChange} className="form-input">
                  <option value="Fitosanitario">Fitosanitario</option>
                  <option value="Zoosanitario">Zoosanitario</option>
                  <option value="Origen">Origen</option>
                </select>
              </div>

              <button type="submit" disabled={isLoading} className="form-button">
                {isLoading ? 'Emitiendo...' : 'Emitir Certificado'}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <div className="alert alert-success p-4 border rounded">
                <h3 className="text-success mb-3">Certificado Generado</h3>
                <p><strong>N° Certificado:</strong> {certificado.numero}</p>
                <p><strong>Producto:</strong> {certificado.producto}</p>
                <p><strong>Válido Hasta:</strong> {new Date(certificado.validoHasta).toLocaleDateString()}</p>
                <button 
                  className="btn btn-primary mt-3" 
                  onClick={() => { setCertificado(null); setFormData({producto:'', origen:'', tipo:'Fitosanitario'}); }}
                >
                  Emitir Otro
                </button>
                <button 
                  className="btn btn-outline-secondary mt-3 ms-2"
                  onClick={() => navigate('/dashboard-sag')}
                >
                  Volver al Panel
                </button>
              </div>
            </div>
          )}
          
          {mensaje && !certificado && (
            <div className="form-message error mt-3">{mensaje}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificacionForm;