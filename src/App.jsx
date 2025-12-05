import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import './App.css'

import Navigation from './components/Navigation.jsx'
import Home from './components/Home.jsx' 
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import ContactForm from './components/ContactForm.jsx'


import authService from './services/authService'

import DashboardUsuario from './components/DashboardUsuario.jsx'
import DashboardPDI from './components/DashboardPDI.jsx'
import DashboardSAG from './components/DashboardSAG.jsx'
import DashboardReportes from './components/DashboardReportes.jsx'

import NuevoTramite from './components/NuevoTramite.jsx'
import TramitesPage from './components/TramitesPage.jsx'
import EstadoAduanero from './components/EstadoAduanero.jsx'
import Documentos from './components/Documentos.jsx'

import PDIForm from './components/PDIForm.jsx'
import PdiHistorial from './components/PDIHistorial.jsx'

import InspeccionForm from './components/InspeccionForm.jsx'
import CertificacionForm from './components/CertificacionForm.jsx'
import CuarentenaForm from './components/CuarentenaForm.jsx'


function LoginRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = authService.getCurrentUser();
    if (userData) {
      switch(userData.tipo) {
        case 'pdi':
          navigate('/dashboard-pdi');
          break;
        case 'sag':
          navigate('/dashboard-sag');
          break;
        default:
          navigate('/dashboard-usuario');
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  return null;
}

function PrivateRoute({ children }) {
  return authService.isAuthenticated() ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userData = authService.getCurrentUser()
    if (userData && authService.isAuthenticated()) {
      setUser(userData)
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  }

  const handleLogout = (navigate) => {
    authService.logout()
    setUser(null)
    navigate('/'); 
  }

  return (
    <>
      <Navigation user={user} onLogout={handleLogout} />
      <main>
        <Routes>
          {}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/login-success" element={<LoginRedirect />} />
          <Route path="/register" element={<Register />} />
          <Route path="/contact" element={<ContactForm />} />

          {}
          <Route path="/dashboard-usuario" element={<PrivateRoute><DashboardUsuario user={user} /></PrivateRoute>} />
          <Route path="/dashboard-pdi" element={<PrivateRoute><DashboardPDI user={user} /></PrivateRoute>} />
          <Route path="/dashboard-sag" element={<PrivateRoute><DashboardSAG user={user} /></PrivateRoute>} />
          <Route path="/reportes" element={<PrivateRoute><DashboardReportes user={user} /></PrivateRoute>} />

          {}
          <Route path="/tramites" element={<PrivateRoute><TramitesPage /></PrivateRoute>} />
          <Route path="/nuevo-tramite" element={<PrivateRoute><NuevoTramite /></PrivateRoute>} />
          <Route path="/documentos" element={<PrivateRoute><Documentos /></PrivateRoute>} />
          <Route path="/estado-aduanero" element={<PrivateRoute><EstadoAduanero /></PrivateRoute>} />

          {}
          <Route path="/pdi-form" element={<PrivateRoute><PDIForm /></PrivateRoute>} />
          <Route path="/pdi-historial" element={<PrivateRoute><PdiHistorial /></PrivateRoute>} />

          {}
          <Route path="/verificacion" element={
            <PrivateRoute>
              <div className="dashboard-container">
                <h1 className="dashboard-title text-primary">Verificación Documental</h1>
                <p className="mt-3">Módulo de verificación en desarrollo...</p>
              </div>
            </PrivateRoute>
          } />
          <Route path="/consultas-pdi" element={
            <PrivateRoute>
              <div className="dashboard-container">
                <h1 className="dashboard-title text-primary">Consultas PDI</h1>
                <p className="mt-3">Sistema de consultas integrado próximamente.</p>
              </div>
            </PrivateRoute>
          } />

          {}
          <Route path="/inspeccion" element={<PrivateRoute><InspeccionForm /></PrivateRoute>} />
          <Route path="/certificacion" element={<PrivateRoute><CertificacionForm /></PrivateRoute>} />
          <Route path="/cuarentena" element={<PrivateRoute><CuarentenaForm /></PrivateRoute>} />

          {}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </>
  )
}

export default App