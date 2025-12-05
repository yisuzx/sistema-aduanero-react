import React, { useState } from 'react';
import sagService from '../services/sagService';
import { useNavigate } from 'react-router-dom';

const CuarentenaForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    producto: '',
    origen: '',
    motivo: 'Plaga sospechosa',
    observaciones: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const result = await sagService.gestionarCuarentena(formData);
      setMensaje(`Producto ingresado a cuarentena. ID: ${result.idCuarentena}`);
      
      setFormData({ producto: '', origen: '', motivo: 'Plaga sospechosa', observaciones: '' });
    } catch (error) {
      setMensaje('Error: ' + (error.message || 'Error al procesar cuarentena'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-with-nav">
      <div className="form-content">
        <div className="form-box" style={{ borderColor: '#e74c3c' }}> {}
          <h1 className="form-title text-danger">Ingreso a Cuarentena</h1>
          <p className="form-subtitle">Control Sanitario Fronterizo</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Producto Retenido</label>
              <input 
                type="text" name="producto" 
                value={formData.producto} onChange={handleInputChange} 
                className="form-input" required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Procedencia</label>
              <input 
                type="text" name="origen" 
                value={formData.origen} onChange={handleInputChange} 
                className="form-input" required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Motivo de Retención</label>
              <select name="motivo" value={formData.motivo} onChange={handleInputChange} className="form-input">
                <option value="Plaga sospechosa">Posible Plaga</option>
                <option value="Documentación incompleta">Falta Documentación</option>
                <option value="Producto prohibido">Producto Prohibido</option>
                <option value="Embalaje dañado">Embalaje Dañado / Fuga</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Detalles Adicionales</label>
              <textarea 
                name="observaciones" 
                value={formData.observaciones} onChange={handleInputChange} 
                className="form-textarea" placeholder="Describa la condición del producto..."
              />
            </div>

            <button type="submit" disabled={isLoading} className="form-button bg-danger">
              {isLoading ? 'Procesando...' : 'Confirmar Cuarentena'}
            </button>
            
            <button 
              type="button" 
              className="form-link mt-3 d-block mx-auto"
              onClick={() => navigate('/dashboard-sag')}
            >
              Cancelar
            </button>
          </form>

          {mensaje && (
            <div className={`form-message ${mensaje.includes('ID') ? 'success' : 'error'}`}>
              {mensaje}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CuarentenaForm;