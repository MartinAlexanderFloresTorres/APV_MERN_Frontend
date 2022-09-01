import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ButtonLoad from "../components/ButtonLoad";
import Password from "../components/Password";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  // Estados
  const [campos, setCampos] = useState({
    email: "",
    password: "",
  });
  const [cargando, setCargando] = useState(false);
  const [disabled, setDisabled] = useState(true);

  // navigate
  const navigate = useNavigate();

  // auth
  const { iniciarSesion } = useAuth();

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
      if (campos.password.length > 5) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }
  }, [campos]);

  // Handle Formulario
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
    // Realizar autenticación
    try {
      setCargando(true);
      const usuario = {
        email: campos.email,
        password: campos.password,
      };
      const { data } = await clienteAxios.post("/veterinarios/login", usuario);
      iniciarSesion(data);
      Swal.fire({
        title: "Bievenido",
        text: "Te damos la bienvenida a este proyecto de pacientes de veterinaria",
        icon: "success",
        confirmButtonText: "Cerrar",
      });
      setCampos({
        email: "",
        password: "",
      });
    } catch (error) {
      navigate("/");
      const { msg } = error.response.data;
      localStorage.removeItem("token-APV");
      Swal.fire({
        title: "Autenticacíon Fallida¡",
        text: msg,
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
    setCargando(false);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="bg-white sm:p-10 p-6 rounded shadow-sm border mb-5"
      >
        <legend className="text-indigo-600 font-bold sm:text-5xl text-4xl text-center mb-10">
          Inicia Sesión y Administra tus{" "}
          <span className="text-gray-700">Pacientes</span>
        </legend>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block uppercase text-gray-700 text-xl font-bold mb-2"
          >
            Email
          </label>
          <input
            className="border p-2 block bg-gray-50 rounded-md w-full outline-indigo-300"
            type="email"
            name="email"
            id="email"
            value={campos.email}
            onChange={handleChangeCampos}
            placeholder="Ingrese su email"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block uppercase text-gray-700 text-xl font-bold mb-2"
          >
            Password
          </label>
          <Password
            name="password"
            id="password"
            value={campos.password}
            onChange={handleChangeCampos}
            placeholder="Ingrese su password"
          />
        </div>
        <ButtonLoad
          disabled={disabled || cargando}
          estado={cargando}
          type="submit"
        >
          {cargando ? "Comprobando..." : "Entrar"}
        </ButtonLoad>

        <Link
          to={"/olvide-password"}
          className="text-sky-500 hover:text-sky-600 transition-all font-normal text-center block mt-10 w-fit mx-auto"
        >
          ¿Has olvidado la contraseña?
        </Link>
      </form>
      <div className="bg-white py-5 px-10 rounded shadow-sm border text-center">
        ¿No tienes una cuenta?{" "}
        <Link
          to={"/registrar"}
          className="text-sky-500 hover:text-sky-600 transition-all font-semibold"
        >
          Regístrate
        </Link>
      </div>
    </div>
  );
};

export default Login;
