// src/components/__test__/Login.test.jsx
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login';

const mockOnNavigate = vi.fn();

describe('Login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('renderiza correctamente el formulario de login', () => {
    render(<Login onNavigate={mockOnNavigate} />);
    
    expect(screen.getByRole('heading', { name: 'Ingreso al Sistema' })).toBeDefined();
    expect(screen.getByText('Sistema Aduanero - Paso Los Libertadores')).toBeDefined();
    expect(screen.getByLabelText('Usuario')).toBeDefined();
    expect(screen.getByLabelText('Contraseña')).toBeDefined();
    expect(screen.getByRole('button', { name: 'Ingresar al Sistema' })).toBeDefined();
  });

  it('muestra errores cuando los campos están vacíos', async () => {
    render(<Login onNavigate={mockOnNavigate} />);
    
    const submitButton = screen.getByRole('button', { name: 'Ingresar al Sistema' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      // Verifica que hay al menos un mensaje de error
      const errorMessages = screen.getAllByText('Este campo es requerido');
      expect(errorMessages.length).toBeGreaterThan(0);
    });

    await waitFor(() => {
      expect(screen.getByText('Por favor, complete todos los campos requeridos correctamente.')).toBeDefined();
    });
  });

  it('inicia sesión exitosamente con credenciales correctas', async () => {
    render(<Login onNavigate={mockOnNavigate} />);
    
    const usuarioInput = screen.getByLabelText('Usuario');
    const contrasenaInput = screen.getByLabelText('Contraseña');
    
    fireEvent.change(usuarioInput, { target: { value: 'admin' } });
    fireEvent.change(contrasenaInput, { target: { value: 'admin123' } });

    const submitButton = screen.getByRole('button', { name: 'Ingresar al Sistema' });
    fireEvent.click(submitButton);

    // Verifica que muestra el estado de loading
    await waitFor(() => {
      expect(screen.getByText('Procesando...')).toBeDefined();
    });

    // Verifica mensaje de éxito
    await waitFor(() => {
      expect(screen.getByText('¡Inicio de sesión exitoso! Redirigiendo...')).toBeDefined();
    }, { timeout: 2000 });

    // Verifica navegación
    await waitFor(() => {
      expect(mockOnNavigate).toHaveBeenCalledWith('dashboard');
    }, { timeout: 2000 });
  });

  it('muestra error con credenciales incorrectas', async () => {
    render(<Login onNavigate={mockOnNavigate} />);
    
    const usuarioInput = screen.getByLabelText('Usuario');
    const contrasenaInput = screen.getByLabelText('Contraseña');
    
    fireEvent.change(usuarioInput, { target: { value: 'usuario' } });
    fireEvent.change(contrasenaInput, { target: { value: 'contrasena-incorrecta' } });

    const submitButton = screen.getByRole('button', { name: 'Ingresar al Sistema' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Credenciales incorrectas')).toBeDefined();
    }, { timeout: 2000 });
  });

  it('navega al registro cuando se hace clic en el enlace', () => {
    render(<Login onNavigate={mockOnNavigate} />);
    
    const registerLink = screen.getByRole('button', { name: 'Regístrate aquí' });
    fireEvent.click(registerLink);

    expect(mockOnNavigate).toHaveBeenCalledWith('register');
  });

  it('guarda token y usuario en localStorage al iniciar sesión exitosamente', async () => {
    render(<Login onNavigate={mockOnNavigate} />);
    
    const usuarioInput = screen.getByLabelText('Usuario');
    const contrasenaInput = screen.getByLabelText('Contraseña');
    
    fireEvent.change(usuarioInput, { target: { value: 'admin' } });
    fireEvent.change(contrasenaInput, { target: { value: 'admin123' } });

    const submitButton = screen.getByRole('button', { name: 'Ingresar al Sistema' });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(localStorage.getItem('authToken')).toBe('fake-jwt-token');
      
      const userData = JSON.parse(localStorage.getItem('user'));
      expect(userData.usuario).toBe('admin');
      expect(userData.nombre).toBe('Carlos');
      expect(userData.apellido).toBe('López');
      expect(userData.tipo).toBe('pdi');
    }, { timeout: 2000 });
  });
});