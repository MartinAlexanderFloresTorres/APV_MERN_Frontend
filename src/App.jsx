import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./pages/Login";
import Registrar from "./pages/Registrar";
import ConfirmarCuenta from "./pages/ConfirmarCuenta";
import OlvidePassword from "./pages/OlvidePassword";
import NuevoPassword from "./pages/NuevoPassword";
import { AuthProvider } from "./contexts/AuthProvider";
import DashboardLayout from "./layouts/DashboardLayout";
import AdministrarPaciente from "./pages/dashboard/AdministrarPaciente";
import EditarPerfil from "./pages/dashboard/EditarPerfil";
import CambiarPassword from "./pages/dashboard/CambiarPassword";
import Search from "./pages/dashboard/Search";


const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route
              path="confirmar-cuenta/:token"
              element={<ConfirmarCuenta />}
            />
            <Route path="olvide-password" element={<OlvidePassword />} />4
            <Route path="olvide-password/:token" element={<NuevoPassword />} />4
          </Route>

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<AdministrarPaciente />} />
            <Route path="perfil" element={<EditarPerfil />} />
            <Route path="cambiar-password" element={<CambiarPassword />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
