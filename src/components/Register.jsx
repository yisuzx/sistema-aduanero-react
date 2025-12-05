
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';


const Register = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    usuario: '',
    contrasena: '',
    confirmarContrasena: '',
    tipoUsuario: 'usuario'
  });
  const [mensaje, setMensaje] = useState('');
  const [errors, setErrors] = useState({});
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es requerido';
    if (!formData.apellido.trim()) newErrors.apellido = 'El apellido es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    if (!formData.usuario.trim()) newErrors.usuario = 'El usuario es requerido';
    if (!formData.contrasena.trim()) newErrors.contrasena = 'La contraseña es requerida';
    if (!formData.confirmarContrasena.trim()) newErrors.confirmarContrasena = 'Confirme la contraseña';
    
    if (formData.contrasena !== formData.confirmarContrasena) {
      newErrors.confirmarContrasena = 'Las contraseñas no coinciden';
    }

    if (formData.contrasena.length < 6) {
      newErrors.contrasena = 'La contraseña debe tener al menos 6 caracteres';
    }

    if (!formData.email.includes('@')) {
      newErrors.email = 'Email inválido';
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
  let roleToSend = 'ROLE_ADUANA'; 
  if (formData.tipoUsuario === 'pdi') roleToSend = 'ROLE_PDI';
  if (formData.tipoUsuario === 'sag') roleToSend = 'ROLE_SAG';

  const userData = {
    nombre: formData.nombre,
    apellido: formData.apellido,
    email: formData.email,
    username: formData.usuario,
    password: formData.contrasena,
    role: roleToSend 
  };

  await authService.register(userData); 

  setMensaje('¡Registro exitoso! Redirigiendo al login...');
  setTimeout(() => {
     navigate('/login');
  }, 2000);

} catch (error) {
  console.error(error);
  setMensaje('Error en el registro: ' + (error.message || 'Intente nuevamente'));
} finally {
  setIsLoading(false);
}
  };

  return (
    <div className="page-with-nav">
      <div className="form-content">
        <div className="form-box">
          <div>
            <h1 className="form-title">Crear Cuenta</h1>
            <p className="form-subtitle">Sistema Aduanero - Paso Los Libertadores</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="nombre" className="form-label form-label-required">
                    Nombre
                  </label>
                  <input 
                    type="text" 
                    id="nombre" 
                    name="nombre" 
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ingrese su nombre"
                    disabled={isLoading}
                    className={`form-input ${errors.nombre ? 'error' : ''}`}
                  />
                  {errors.nombre && (
                    <div className="form-error">{errors.nombre}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="apellido" className="form-label form-label-required">
                    Apellido
                  </label>
                  <input 
                    type="text" 
                    id="apellido" 
                    name="apellido" 
                    value={formData.apellido}
                    onChange={handleInputChange}
                    placeholder="Ingrese su apellido"
                    disabled={isLoading}
                    className={`form-input ${errors.apellido ? 'error' : ''}`}
                  />
                  {errors.apellido && (
                    <div className="form-error"> {errors.apellido}</div>
                  )}
                </div>
              </div>
            </div>

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
                placeholder="Cree un nombre de usuario"
                disabled={isLoading}
                className={`form-input ${errors.usuario ? 'error' : ''}`}
              />
              {errors.usuario && (
                <div className="form-error"> {errors.usuario}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="tipoUsuario" className="form-label form-label-required">
                Tipo de Usuario
              </label>
              <select 
                id="tipoUsuario" 
                name="tipoUsuario" 
                value={formData.tipoUsuario}
                onChange={handleInputChange}
                disabled={isLoading}
                className="form-input"
              >
                <option value="usuario">Usuario General</option>
                <option value="pdi">Personal PDI</option>
                <option value="sag">Personal SAG</option>
              </select>
            </div>

            <div className="row">
              <div className="col-md-6">
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
                    placeholder="Cree una contraseña"
                    disabled={isLoading}
                    className={`form-input ${errors.contrasena ? 'error' : ''}`}
                  />
                  {errors.contrasena && (
                    <div className="form-error">{errors.contrasena}</div>
                  )}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="confirmarContrasena" className="form-label form-label-required">
                    Confirmar Contraseña
                  </label>
                  <input 
                    type="password" 
                    id="confirmarContrasena" 
                    name="confirmarContrasena" 
                    value={formData.confirmarContrasena}
                    onChange={handleInputChange}
                    placeholder="Repita la contraseña"
                    disabled={isLoading}
                    className={`form-input ${errors.confirmarContrasena ? 'error' : ''}`}
                  />
                  {errors.confirmarContrasena && (
                    <div className="form-error">{errors.confirmarContrasena}</div>
                  )}
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="form-button"
            >
              {isLoading ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div className="loading-spinner"></div>
                  Registrando...
                </div>
              ) : (
                'Crear Cuenta'
              )}
            </button>
            
            {mensaje && (
              <div className={`form-message ${mensaje.includes('éxito') ? 'success' : 'error'}`}>
                {mensaje}
              </div>
            )}

            <div style={{ textAlign: 'center', marginTop: '25px' }}>
              <div style={{ marginBottom: '10px' }}>
                <span style={{ fontSize: '0.9rem', color: '#666' }}>
                  ¿Ya tienes cuenta?{' '}
                </span>
                <Link to="/login" className="form-link" style={isLoading ? { pointerEvents: 'none', opacity: 0.7 } : {}}>
                  Inicia sesión aquí
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;