import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Alerta from "../../components/Alerta";
import Formulario from "../../components/Formulario";
import Paciente from "../../components/Paciente";
import usePacientes from "../../hooks/usePacientes";
const Search = () => {
  // estados
  const [alerta, setAlerta] = useState({
    msg: "No se encontraron resultados",
    error: true,
  });
  const [filtrado, setFiltrado] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  // location
  const { search } = useLocation();

  // usePacientes
  const { mostrar, setMostrar, setPaciente, pacientes, loading } =
    usePacientes();

  // EFECTOS
  useEffect(() => {
    if (search) {
      if (search.includes("q=")) {
        const q = search?.split("=")[1]?.split("%20")?.join(" ") || "-";
        const resultado = pacientes.filter((paciente) =>
          paciente.nombre.toLocaleLowerCase().includes(q.toLocaleLowerCase())
        );
        setFiltrado(resultado);
        setBusqueda(q);
      }
    }
  }, [search, loading, pacientes, busqueda]);

  if (loading) {
    return (
      <div className="p-10 ">
        <div className="bg-white sm:p-8 p-4 rounded shadow-sm text-indigo-600 flex items-center justify-center gap-2 border w-full lg:w-3/4 container mx-auto text-lg text-center my-10">
          <svg
            className="animate-spin h-6 w-6 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <span>Cargando...</span>
        </div>
      </div>
    );
  }

  if (filtrado.length === 0) {
    return (
      <div className="w-full lg:w-3/4 container mx-auto">
        <div className="p-10">
          <Alerta alerta={alerta} />
          <div className="bg-white py-5 px-10 rounded shadow-sm border text-center mb-10 w-full">
            <Link
              to={"/dashboard"}
              className="text-sky-500 hover:text-sky-600 transition-all font-semibold"
            >
              Volver hacia los Pacientes
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:p-10 p-5 flex items-center justify-center  flex-col gap-5 w-full lg:w-3/4 container mx-auto">
      <h2 className="font-bold text-4xl my-10">
        Resultados de la busquedad:{" "}
        <span className="text-indigo-600 font-bold">{busqueda}</span>
      </h2>

      <div
        className={`${
          mostrar
            ? "block fixed top-0 left-0 w-full h-full bg-slate-50 z-10 p-5 overflow-auto"
            : "hidden"
        } w-full`}
      >
        <div className=" lg:w-3/4 2xl:w-2/5  max-w-4xl mx-auto ">
          <button
            onClick={() => {
              setPaciente({});
              setMostrar(!mostrar);
            }}
            className="ml-auto block font-black  cursor-pointer hover:bg-indigo-700 bg-indigo-600 text-white transition-all px-5 py-2 text-center rounded uppercase mb-10 "
          >
            Cerrar
          </button>
          <Formulario />
        </div>
      </div>

      <div className="w-full">
        {filtrado.length > 0 &&
          filtrado.map((paciente) => (
            <div key={paciente._id} className="mb-5">
              <Paciente paciente={paciente} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Search;
