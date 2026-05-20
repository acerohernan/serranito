const DashboardHome = () => {
  return (
    <div>
      <h3>Bienvenido al panel de administración</h3>
      <p className="text-muted">
        Selecciona un módulo en el menú lateral para administrar clientes, proveedores, productos, ventas o configuración.
      </p>
      <div className="row gy-3">
        <div className="col-md-6">
          <div className="card border-primary shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Clientes</h5>
              <p className="card-text">Gestiona los datos de tus clientes y su información de contacto.</p>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card border-success shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Productos</h5>
              <p className="card-text">Agrega y edita los productos disponibles en tu inventario.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
