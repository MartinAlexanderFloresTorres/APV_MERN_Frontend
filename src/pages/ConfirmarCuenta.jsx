import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../config/clienteAxios";
import Alerta from "../components/Alerta";

const ConfirmarCuenta = () => {
  // Estados
  const [alerta, setAlerta] = useState({ msg: "", error: false });
  const { token } = useParams();

  // Confirmar Cuenta
  const confirmarCuenta = async (token) => {
    try {
      const { data } = await clienteAxios(`/veterinarios/confirmar/${token}`);
      const { msg } = data;
      setAlerta({
        msg: msg,
        error: false,
      });
    } catch (error) {
      console.log(error);
      const { msg } = error.response.data;
      setAlerta({
        msg: msg,
        error: true,
      });
    }
  };

  useEffect(() => {
    confirmarCuenta(token);
  }, []);

  return (
    <>
      <div className="bg-white sm:p-10 p-6 rounded shadow-sm border mb-5 w-full">
        <h1 className="text-indigo-600 font-bold sm:text-5xl text-4xl text-center">
          Confirmación de <span className="text-gray-700">Cuenta</span>
        </h1>
      </div>

      {alerta.msg === "" ? (
        <div className="bg-white sm:p-8 p-4 rounded shadow-sm text-indigo-600 flex items-center justify-center gap-2 border w-full text-lg text-center">
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
      ) : (
        <Alerta alerta={alerta} />
      )}

      <div className="bg-white py-5 px-10 rounded shadow-sm border text-center w-full">
        <Link
          to={"/"}
          className="text-sky-500 hover:text-sky-600 transition-all font-semibold"
        >
          Volver al inicio de sesión
        </Link>
      </div>
    </>
  );
};

export default ConfirmarCuenta;
