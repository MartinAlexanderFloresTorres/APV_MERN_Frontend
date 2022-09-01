import { Outlet, Navigate, useLocation } from "react-router-dom";
import { PacientesProvider } from "../contexts/PacientesProvider";
import useAuth from "../hooks/useAuth";
import Footer from "../components/Footer";
import Header from "../components/Header";

const DashboardLayout = () => {
  const { auth, cargando } = useAuth();
  const location = useLocation();

  if (cargando) {
    return (
      <div className="loading bg-slate-50">
        <div>
          <h2 className="text-indigo-600 text-6xl font-bold">APV</h2>
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <PacientesProvider>
      <div className="flex flex-col items-center justify-between min-h-screen w-full">
        <Header />
        {Object.keys(auth).length > 0 ? (
          <main className="max-w-7xl mx-auto w-full">
            <Outlet />
          </main>
        ) : (
          <Navigate to={"/"} state={location} />
        )}
        <Footer />
      </div>
    </PacientesProvider>
  );
};

export default DashboardLayout;
