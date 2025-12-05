import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tramitesService from '../services/tramitesService';

const NuevoTramite = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tipo: 'IMPORTACION',
    descripcion: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await tramitesService.crearTramite(formData);
      alert('Trámite creado exitosamente');
      navigate('/dashboard-usuario');
    } catch (err) {
      setError('Error al crear trámite: ' + (err.message || 'Error desconocido'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-with-nav">
      <div className="form-content">
        <div className="form-box">
          <h1 className="form-title">Nuevo Trámite</h1>
          
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Tipo de Trámite</label>
              <select
                className="form-input"
                value={formData.tipo}
                onChange={(e) => setFormData({...formData, tipo: e.target.value})}
              >
                <option value="IMPORTACION">Importación</option>
                <option value="EXPORTACION">Exportación</option>
                <option value="TRANSITO">Tránsito</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Descripción de la Mercancía</label>
              <textarea
                className="form-textarea"
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                placeholder="Describa la carga, peso, origen, etc."
                required
              />
            </div>

            <button type="submit" className="form-button" disabled={loading}>
              {loading ? 'Creando...' : 'Crear Solicitud'}
            </button>
            
            <button 
              type="button" 
              className="form-link mt-3 d-block mx-auto"
              onClick={() => navigate('/dashboard-usuario')}
            >
              Cancelar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NuevoTramite;