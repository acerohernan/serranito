import { useMemo } from "react";
import {
  NavLink,
  Outlet,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const links = [
  { path: "ventas", label: "Ventas", icon: "🧾" },
  { path: "clientes", label: "Clientes", icon: "👥" },
  { path: "proveedores", label: "Proveedores", icon: "🏢" },
  { path: "productos", label: "Productos", icon: "📦" },
  { path: "configuracion", label: "Configuración", icon: "⚙️" },
];

const DashboardLayout = () => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  const isActiveRoute = useMemo(
    () => (path: string) => location.pathname.includes(path),
    [location.pathname],
  );

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-vh-100 bg-light">
      <div className="row g-0">
        <aside className="col-12 col-md-3 col-xl-2 bg-white border-end vh-100 position-fixed">
          <div className="p-4 app-sidebar">
            <h4 className="mb-1 text-primary sidebar-brand">Serranito ORM</h4>
            <div className="sidebar-subtitle">Enterprise Management</div>
            <div className="list-group">
              {links.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `list-group-item list-group-item-action d-flex align-items-center gap-2 ${
                      isActive || isActiveRoute(item.path) ? "active" : ""
                    }`
                  }
                >
                  <span>{item.icon}</span>
                  <span className="label">{item.label}</span>
                </NavLink>
              ))}
            </div>
            <div className="mt-4">
              <button
                type="button"
                className="btn btn-outline-danger w-100"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </div>
        </aside>

        <main className="col-12 offset-md-3 offset-xl-2 col-md-9 col-xl-10 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">Panel de Control</h2>
              <p className="text-muted mb-0">
                Administra tus módulos de ventas, clientes, proveedores y
                productos.
              </p>
            </div>
          </div>

          <div className="card shadow-sm main-card">
            <div className="card-body p-4">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
