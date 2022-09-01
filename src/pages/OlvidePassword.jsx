import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ButtonLoad from "../components/ButtonLoad";
import clienteAxios from "../config/clienteAxios";
import Swal from "sweetalert2";

const OlvidePassword = () => {
  // Estados
  const [email, setEmail] = useState("");
  const [cargando, setCargando] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (email === "" || !email.includes("@") || !email.includes(".")) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [email]);

  // Restablecer el password
  const handleSubmit = async (e) => {
    e.preventDefault();
    // validar campo
    if (email === "") {
      Swal.fire({
        title: "Email es requerido",
        text: "Complete el campo de email",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
      return;
    }
    // Realizar la petición
    try {
      setCargando(true);
      const { data } = await clienteAxios.post(
        "/veterinarios/olvide-password",
        { email }
      );
      const { msg } = data;
      Swal.fire({
        title: "Email Enviado",
        text: msg,
        icon: "success",
        confirmButtonText: "Entendido",
      });
      setEmail("");
    } catch (error) {
      console.log(error);
      const { msg } = error.response.data;
      Swal.fire({
        title: "Recuperación Fallida¡",
        text: msg,
        icon: "error",
        confirmButtonText: "Entendido",
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
          Recupera tu Acceso y no Pierdas tus{" "}
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
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
            disabled={cargando}
            placeholder="Ingrese su email"
          />
        </div>
        <ButtonLoad
          disabled={disabled || cargando}
          estado={cargando}
          type="submit"
        >
          {cargando
            ? "Enviando enlace de recuperación..."
            : "Enviar Enlace de Recuperación"}
        </ButtonLoad>

        <Link
          to={"/registrar"}
          className="text-sky-500 hover:text-sky-600 transition-all font-normal text-center block mt-10 w-fit mx-auto"
        >
          Crear cuenta nueva
        </Link>
      </form>
      <div className="bg-white py-5 px-10 rounded shadow-sm border text-center">
        <Link
          to={"/"}
          className="text-sky-500 hover:text-sky-600 transition-all font-semibold"
        >
          Volver al inicio de sesión
        </Link>
      </div>
    </div>
  );
};

export default OlvidePassword;
