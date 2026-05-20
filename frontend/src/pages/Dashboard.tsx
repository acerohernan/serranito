import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand mb-0 h1">Serranitico Web</span>
          <button
            className="btn btn-outline-light ms-auto"
            onClick={handleLogout}
          >
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card shadow">
              <div className="card-body p-5 text-center">
                <h1 className="mb-3">¡Bienvenido!</h1>
                <p className="lead text-muted">
                  Has iniciado sesión correctamente en Serranitico Web.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
