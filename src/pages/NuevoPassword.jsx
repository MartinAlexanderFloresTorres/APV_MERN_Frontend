import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../config/clienteAxios";
import ButtonLoad from "../components/ButtonLoad";
import Password from "../components/Password";
import Alerta from "../components/Alerta";

const NuevoPassword = () => {
  // Estados
  const [campos, setCampos] = useState({
    password: "",
    password2: "",
  });
  const [cargando, setCargando] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [valido, setValido] = useState(false);
  const [alerta, setAlerta] = useState({
    msg: "",
    error: false,
  });

  // params
  const { token } = useParams();

  // navigate
  const navigate = useNavigate();

  // comprobar si el token existe
  const comprobarToken = async () => {
    try {
      await clienteAxios(`/veterinarios/olvide-password/${token}`);
      setValido(true);
    } catch (error) {
      console.log(error);
      const { msg } = error.response.data;
      setAlerta({
        msg,
        error: true,
      });
    }
  };
  useEffect(() => {
    comprobarToken();
  }, []);

  // llenar campos
  const handleChangeCampos = (e) => {
    const { name, value } = e.target;
    setCampos({ ...campos, [name]: value.trimStart() });
  };

  // comprobar campos
  useEffect(() => {
    if (Object.values(campos).includes("")) {
      setDisabled(true);
    } else {
      if (campos.password.length > 5 && campos.password2.length > 5) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [campos]);

  // Crear nuevo password
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar formulario
    if (Object.values(campos).includes("")) {
      Swal.fire({
        title: "Campos obligatorios",
        text: "Todo los campos son obligatorios",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
      return;
    }
    if (campos.password.length < 5 || campos.password2.length < 5) {
      Swal.fire({
        title: "Password inseguros",
        text: "El password debe ser mayor de 6 digitos",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
      return;
    }
    if (campos.password != campos.password2) {
      Swal.fire({
        title: "Passwords diferentes¡",
        text: "Los passwords son diferentes",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
      return;
    }
    // Realizar la petición
    try {
      setCargando(true);
      const { data } = await clienteAxios.post(
        `/veterinarios/olvide-password/${token}`,
        { password: campos.password }
      );
      const { msg } = data;
      Swal.fire({
        title: "Password Modificado",
        text: msg,
        icon: "success",
        confirmButtonText: "Iniciar Sesión",
      }).then(() => {
        navigate("/");
      });
      setCampos({ password: "", password2: "" });
    } catch (error) {
      console.log(error);
      const { msg } = error.response.data;
      setAlerta({
        msg,
        error: true,
      });
    }
    setCargando(false);
  };

  return (
    <div className="w-full">
      {valido && (
        <form
          onSubmit={handleSubmit}
          className="bg-white sm:p-10 p-6 rounded shadow-sm border mb-5"
        >
          <legend className="text-indigo-600 font-bold sm:text-5xl text-4xl text-center mb-10">
            Almacena tu nuevo password y no pierdas tus{" "}
            <span className="text-gray-700">Pacientes</span>
          </legend>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block uppercase text-gray-700 text-xl font-bold mb-2"
            >
              Nuevo Password
            </label>
            <Password
              name="password"
              id="password"
              disabled={cargando}
              value={campos.password}
              onChange={handleChangeCampos}
              placeholder="Ingrese su password"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password2"
              className="block uppercase text-gray-700 text-xl font-bold mb-2"
            >
              Repetir Password
            </label>
            <Password
              name="password2"
              id="password2"
              disabled={cargando}
              value={campos.password2}
              onChange={handleChangeCampos}
              placeholder="Repita su password"
            />
          </div>
          <ButtonLoad
            disabled={disabled || cargando}
            estado={cargando}
            type="submit"
          >
            {cargando ? "Guardando password...." : "Guardar nuevo password"}
          </ButtonLoad>
        </form>
      )}

      {!valido && !alerta.error && (
        <div className="bg-white sm:p-8 p-4 rounded shadow-sm text-indigo-600 flex items-center justify-center gap-2 border w-full text-lg text-center mb-10">
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
      )}

      {alerta.error && (
        <>
          <div className="bg-white py-5 px-10 rounded shadow-sm border text-center mb-10">
            <Link
              to={"/"}
              className="text-sky-500 hover:text-sky-600 transition-all font-semibold"
            >
              Ir al inicio de sesión
            </Link>
          </div>
          <Alerta alerta={alerta} />
          <div className="bg-white py-5 px-10 rounded shadow-sm border text-center mt-10">
            ¿No tienes una cuenta?{" "}
            <Link
              to={"/registrar"}
              className="text-sky-500 hover:text-sky-600 transition-all"
            >
              Regístrate
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default NuevoPassword;
