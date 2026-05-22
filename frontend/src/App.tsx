import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DashboardLayout from "./pages/DashboardLayout";
import DashboardHome from "./pages/DashboardHome";
import Clientes from "./pages/clientes/Clientes";
import Proveedores from "./pages/proveedores/Proveedores";
import Productos from "./pages/productos/Productos";
import Ventas from "./pages/ventas/Ventas";
import Configuracion from "./pages/configuracion/Configuracion";
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/custom.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="clientes" element={<Clientes />} />
            <Route path="proveedores" element={<Proveedores />} />
            <Route path="productos" element={<Productos />} />
            <Route path="ventas" element={<Ventas />} />
            <Route path="configuracion" element={<Configuracion />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
