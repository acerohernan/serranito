import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    role: 'USER',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validaciones
    if (!formData.username || !formData.firstname || !formData.lastname || !formData.password) {
      setError('Todos los campos son requeridos');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return;
    }

    setLoading(true);

    try {
      const response = await authService.register({
        username: formData.username,
        firstname: formData.firstname,
        lastname: formData.lastname,
        password: formData.password,
        role: formData.role,
      });

      console.log('Registro exitoso:', response);

      // Redirigir al login
      navigate('/login', { state: { message: 'Registro exitoso. Por favor inicia sesión.' } });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Error al registrarse');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f8f9fa' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-7 col-lg-6">
            <div className="card shadow-lg">
              <div className="card-body p-5">
                <h2 className="text-center mb-4 fw-bold">Crear Cuenta</h2>

                {error && (
                  <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    {error}
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setError('')}
                    />
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstname" className="form-label fw-semibold">
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="firstname"
                        name="firstname"
                        placeholder="Tu nombre"
                        value={formData.firstname}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastname" className="form-label fw-semibold">
                        Apellido
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        id="lastname"
                        name="lastname"
                        placeholder="Tu apellido"
                        value={formData.lastname}
                        onChange={handleChange}
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="username" className="form-label fw-semibold">
                      Usuario
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      id="username"
                      name="username"
                      placeholder="Elige un usuario"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-semibold">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="password"
                      name="password"
                      placeholder="Crea una contraseña"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword" className="form-label fw-semibold">
                      Confirmar Contraseña
                    </label>
                    <input
                      type="password"
                      className="form-control form-control-lg"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirma tu contraseña"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="role" className="form-label fw-semibold">
                      Rol
                    </label>
                    <select
                      className="form-select form-select-lg"
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      disabled={loading}
                    >
                      <option value="USER">Usuario</option>
                      <option value="ADMIN">Administrador</option>
                      <option value="MODERATOR">Moderador</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-lg w-100 fw-semibold"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Registrando...
                      </>
                    ) : (
                      'Registrarse'
                    )}
                  </button>
                </form>

                <hr className="my-4" />

                <p className="text-center text-muted">
                  ¿Ya tienes cuenta?{' '}
                  <Link to="/login" className="text-primary fw-semibold text-decoration-none">
                    Inicia sesión aquí
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
