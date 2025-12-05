import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    usuario: '',
    contrasena: ''
  });
  const [mensaje, setMensaje] = useState('');
  const [errors, setErrors] = useState({
    usuario: '',
    contrasena: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {};

    if (!formData.usuario.trim()) {
      newErrors.usuario = 'Este campo es requerido';
    }

    if (!formData.contrasena.trim()) {
      newErrors.contrasena = 'Este campo es requerido';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setMensaje('Por favor, complete todos los campos requeridos correctamente.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await authService.login(formData.usuario, formData.contrasena);
      
      setMensaje('¡Inicio de sesión exitoso! Redirigiendo...');
      
      const user = authService.getCurrentUser();
      onLoginSuccess(user);
      navigate('/login-success');
      
    } catch (error) {
      setMensaje(typeof error === 'string' ? error : 
                  error.message || 'Error en el inicio de sesión. Por favor, intente nuevamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-with-nav">
      <div className="form-content">
        <div className="form-box">
          <div>
            <h1 className="form-title">Ingreso al Sistema</h1>
            <p className="form-subtitle">Sistema Aduanero - Paso Los Libertadores</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="usuario" className="form-label form-label-required">
                Usuario
              </label>
              <input 
                type="text" 
                id="usuario" 
                name="usuario" 
                value={formData.usuario}
                onChange={handleInputChange}
                placeholder="Ingrese su usuario"
                disabled={isLoading}
                className={`form-input ${errors.usuario ? 'error' : ''}`}
              />
              {errors.usuario && (
                <div className="form-error">
                  <span style={{ marginRight: '5px' }}></span>
                  {errors.usuario}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="contrasena" className="form-label form-label-required">
                Contraseña
              </label>
              <input 
                type="password" 
                id="contrasena" 
                name="contrasena" 
                value={formData.contrasena}
                onChange={handleInputChange}
                placeholder="Ingrese su contraseña"
                disabled={isLoading}
                className={`form-input ${errors.contrasena ? 'error' : ''}`}
              />
              {errors.contrasena && (
                <div className="form-error">
                  <span style={{ marginRight: '5px' }}></span>
                  {errors.contrasena}
                </div>
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
                  Procesando...
                </div>
              ) : (
                'Ingresar al Sistema'
              )}
            </button>
            
            {mensaje && (
              <div className={`form-message ${mensaje.includes('éxito') || mensaje.includes('Redirigiendo') ? 'success' : 'error'}`}>
                {mensaje}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '25px' }}>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>
                  ¿No tienes cuenta?{' '}
                </span>
                <Link to="/register" className="form-link" style={isLoading ? { pointerEvents: 'none', opacity: 0.7 } : {}}>
                  Regístrate aquí
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;