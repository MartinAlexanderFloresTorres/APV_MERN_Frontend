import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ButtonLoad from "../../components/ButtonLoad";
import Password from "../../components/Password";
import useAuth from "../../hooks/useAuth";

const EditarPerfil = () => {
  // Estados
  const [campos, setCampos] = useState({
    nombre: "",
    email: "",
    web: "",
    telefono: "",
  });
  const [cargando, setCargando] = useState(false);

  const { auth, actualizarPerfil } = useAuth();

  useEffect(() => {
    setCampos({
      nombre: auth.nombre,
      email: auth.email,
      web: auth.web || "",
      telefono: auth.telefono || "",
    });
  }, []);

  // llenar campos
  const handleChangeCampos = (e) => {
    const { name, value } = e.target;
    setCampos({ ...campos, [name]: value.trimStart() });
  };

  // Handle Formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validar formulario
    if (campos.nombre === "" || campos.email === "") {
      Swal.fire({
        title: "Campos requeridos",
        text: "El nombre y email son requeridos",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
      return;
    }
    if (campos.nombre.trimEnd().length < 4) {
      Swal.fire({
        title: "Nombre muy corto",
        text: "El nombre es muy corto, coloque minimo 5 caracteres",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
      return;
    }
    if (campos.nombre.trimEnd().length > 30) {
      Swal.fire({
        title: "Nombre muy largo",
        text: "El nombre es muy largo, coloque maximo 30 caracteres",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
      return;
    }
    if (campos.telefono.length > 0) {
      if (campos.telefono.trimEnd().length < 9 || campos.telefono.length > 16) {
        Swal.fire({
          title: "Teléfono invalido",
          text: "El numero de teléfono que a ingresado es invalido, pruebe con minimo 9 digitos y maximo 17",
          icon: "warning",
          confirmButtonText: "Entendido",
        });
        return;
      }
      if (
        (isNaN(campos.telefono) && !campos.telefono.includes(" ")) ||
        campos.telefono.includes("-")
      ) {
        Swal.fire({
          title: "Teléfono invalido",
          text: "El numero de teléfono que a ingresado no debe contener caracteres especiales",
          icon: "warning",
          confirmButtonText: "Entendido",
        });
        return;
      }
    }
    // Actualizar perfil
    const usuario = {
      nombre: campos.nombre,
      email: campos.email,
      web: campos.web,
      telefono: campos.telefono,
      id: auth._id,
    };
    setCargando(true);
    await actualizarPerfil(usuario);
    setCargando(false);
  };

  return (
    <div className="container md:p-10 p-5 flex items-center justify-center  flex-col gap-5 w-full lg:w-3/4 2xl:w-2/3 mx-auto">
      <div className="text-center mt-10 pb-10">
        <h2 className="font-bold text-4xl mb-3">Editar Perfil</h2>
        <p className="text-xl">
          Modifica tu{" "}
          <span className="text-indigo-600 font-bold">Información Aquí</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white sm:p-10 p-6 rounded shadow-sm border mb-5 w-full"
      >
        <div className="mb-5">
          <label
            htmlFor="nombre"
            className="block uppercase text-gray-700 text-xl font-bold mb-2"
          >
            Nombre
          </label>
          <input
            className="border p-2 block bg-gray-50 rounded-md w-full outline-indigo-300"
            type="nombre"
            name="nombre"
            id="nombre"
            disabled={cargando}
            value={campos.nombre}
            onChange={handleChangeCampos}
            placeholder="Ingrese su nombre"
          />
        </div>

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
            disabled={cargando}
            value={campos.email}
            onChange={handleChangeCampos}
            placeholder="Ingrese su email"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="web"
            className="block uppercase text-gray-700 text-xl font-bold mb-2"
          >
            Sitio Web
          </label>
          <input
            className="border p-2 block bg-gray-50 rounded-md w-full outline-indigo-300"
            type="url"
            name="web"
            id="web"
            disabled={cargando}
            value={campos.web}
            onChange={handleChangeCampos}
            placeholder="Ingrese su web"
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="telefono"
            className="block uppercase text-gray-700 text-xl font-bold mb-2"
          >
            Teléfono
          </label>
          <input
            className="border p-2 block bg-gray-50 rounded-md w-full outline-indigo-300"
            type="tel"
            name="telefono"
            id="telefono"
            disabled={cargando}
            value={campos.telefono}
            onChange={handleChangeCampos}
            placeholder="Ingrese su telefono"
          />
        </div>

        <ButtonLoad disabled={cargando} estado={cargando} type="submit">
          {cargando ? "Guardando...." : "Guardar Cambios"}
        </ButtonLoad>
      </form>
    </div>
  );
};

export default EditarPerfil;
