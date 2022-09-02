import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import usePacientes from "../hooks/usePacientes";

const Header = () => {
  // Estados
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");

  // location
  const { pathname } = useLocation();

  // auAuth
  const { auth, cerrarSesion } = useAuth();
  const { buscarPacientes } = usePacientes();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      buscarPacientes(search);
      setSearch("");
    }
  };

  return (
    <header
      className={`${
        pathname === "/dashboard" ? "md:sticky md:top-0" : "static"
      } py-4 md:px-10 px-5 bg-white border-b border-gray-100 w-full z-10`}
    >
      {menu && (
        <div
          onClick={() => setMenu(false)}
          className="fixed top-0 left-0 w-full h-full z-10"
        ></div>
      )}
      <div className="max-w-7xl mx-auto md:flex-row flex-col flex text-center items-center justify-between gap-5 mb-3 w-full">
        <Link
          to={"/dashboard"}
          className="font-bold text-2xl text-indigo-600 md:mb-0 mb-2"
        >
          Administrador de Pacientes de{" "}
          <span className="text-gray-700">Veterinaria</span>
        </Link>
        <div
          className={`${
            pathname === "/dashboard"
              ? "grid-navegacion"
              : " grid-cols-1 grid-rows-2"
          } grid gap-5 items-center flex-wrap w-full`}
        >
          {pathname !== "/dashboard" && (
            <Link
              to={"/dashboard"}
              className="hover:bg-indigo-700 border-2 hover:border-indigo-700 text-white border-indigo-500 bg-indigo-600 transition-all py-2 px-5 rounded-md w-fit text-xl font-bold md:col-span-1 col-span-1 md:row-start-1 text-left md:ml-auto"
            >
              Pacientes
            </Link>
          )}

          <form
            onSubmit={handleSubmit}
            className={`${
              pathname === "/dashboard"
                ? "grid-navegacion-form"
                : "md:col-span-3 row-start-2 col-span-1"
            } ml-auto w-full  relative`}
          >
            <input
              className={`md:w-[300px] w-full ml-auto border border-gray-100 outline-indigo-100 md:focus-visible:w-[70%] transition-all outline-offset-0 p-2 rounded block text-gray-700 placeholder:text-gray-500 pr-10`}
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value.trimStart())}
              placeholder="Buscar paciente..."
            />
            <button
              type="submit"
              title="Buscar"
              className="absolute top-1/2 -translate-y-1/2 right-2 text-gray-400"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.3}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
            </button>
          </form>

          <div
            className={`${
              pathname === "/dashboard"
                ? "grid-navegacion-perfil"
                : "md:col-span-2 col-end-3 row-start-2 md:ml-auto md:row-start-1"
            } relative z-10`}
          >
            <button
              title={`${auth?.nombre}`}
              className={`${
                menu ? "bg-slate-50 text-gray-800" : "bg-white text-gray-600"
              } hover:bg-white hover:text-gray-700 w-[40px] h-[40px] flex items-center font-bold justify-center gap-2 border rounded-full transition-colors`}
              onClick={() => setMenu(!menu)}
            >
              {auth?.nombre?.at()}
            </button>

            <div
              className={`${
                menu ? "scale-100" : "scale-0"
              } absolute border shadow rounded-md overflow-hidden bg-white w-[236px] transition-all top-[50px] right-0 origin-top-right`}
            >
              <div className="text-gray-600 text-xl  py-2 block w-full hover:bg-slate-50 transition-colors">
                <div className="flex items-center justify-center text-center gap-2 mb-1">
                  <div className="w-[30px] h-[30px] p-1 text-sm font-bold flex items-center justify-center gap-2 border rounded-full uppercase bg-white">
                    <img src="/react.svg" alt="react" />
                  </div>
                  <p className="text-sm text-gray-500 font-semibold break-all">
                    {auth?.nombre}
                  </p>
                </div>
                <a
                  onClick={() => setMenu(!menu)}
                  className="text-sky-600 text-sm px-4 font-medium hover:underline text-center block w-fit mx-auto break-all"
                  href={`mailto:${auth?.email}`}
                >
                  {auth?.email}
                </a>
              </div>
              <Link
                to={"/dashboard/perfil"}
                onClick={() => setMenu(!menu)}
                className="text-gray-600 text-base font-bold py-3 block w-full hover:bg-slate-50 transition-colors"
              >
                Actualizar Perfil
              </Link>
              <Link
                onClick={() => setMenu(!menu)}
                to={"/dashboard/cambiar-password"}
                className="text-gray-600 text-base font-bold py-3 block w-full hover:bg-slate-50 transition-colors"
              >
                Cambiar Password
              </Link>
              <button
                onClick={() => {
                  cerrarSesion();
                  setMenu(!menu);
                }}
                className="flex items-center justify-center gap-2 text-white text-base font-bold bg-indigo-600 hover:bg-indigo-700 transition-colors py-2 w-full rounded-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                  />
                </svg>
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
