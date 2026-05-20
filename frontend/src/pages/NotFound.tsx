import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="text-center py-5">
    <h2 className="mb-3">Página no encontrada</h2>
    <p className="text-muted mb-4">Lo sentimos, la ruta que buscas no existe.</p>
    <Link to="/dashboard" className="btn btn-primary">
      Volver al panel
    </Link>
  </div>
);

export default NotFound;
