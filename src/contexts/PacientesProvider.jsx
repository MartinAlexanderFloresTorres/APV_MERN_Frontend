import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import clienteAxios from "../config/clienteAxios";
import { getConfig } from "../helpers";

const PacientesContext = createContext();

const PacientesProvider = ({ children }) => {
  // Estados
  const [pacientes, setPacientes] = useState([]);
  const [paciente, setPaciente] = useState({});
  const [loading, setLoading] = useState(true);
  const [mostrar, setMostrar] = useState(false);

  // navigate
  const navigate = useNavigate();

  // Obtener pacientes
  const obtenerPacientes = async () => {
    try {
      setLoading(true);
      const config = getConfig();
      const { data } = await clienteAxios.get("/pacientes", config);
      setPacientes(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem("token-APV")) {
      obtenerPacientes();
    }
  }, []);

  // Agregar Paciente
  const agregarPaciente = async (paciente) => {
    try {
      const config = getConfig();
      // petición
      const { data } = await clienteAxios.post("/pacientes", paciente, config);
      // sincronizar estado
      setPacientes([...pacientes, data]);
      // mostrar alerta
      Swal.fire({
        title: "Paciente Agregado",
        text: "El paciente ha sido agregado correctamente",
        icon: "success",
        confirmButtonText: "Entendido",
      });
      setPaciente({});
      setMostrar(false);
    } catch (error) {
      console.log(error);
      // mostrar alerta
      Swal.fire({
        title: "Error",
        text: "Hubo un error al agregar el paciente",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  // Actualizar Paciente
  const editarPaciente = async (paciente) => {
    try {
      const config = getConfig();
      // petición
      const { data } = await clienteAxios.put(
        `/pacientes/${paciente.id}`,
        paciente,
        config
      );
      // sincronizar estado
      const pacientesActualizados = pacientes.map((pacienteState) =>
        pacienteState._id === paciente.id ? data : pacienteState
      );
      setPacientes(pacientesActualizados);
      // mostrar alerta
      Swal.fire({
        title: "Paciente Actualizado",
        text: "El paciente ha sido actualizado correctamente",
        icon: "success",
        confirmButtonText: "Entendido",
      });
      setPaciente({});
      setMostrar(false);
    } catch (error) {
      console.log(error);
      // mostrar alerta
      Swal.fire({
        title: "Error",
        text: "Hubo un error al actualizar el paciente",
        icon: "error",
        confirmButtonText: "Cerrar",
      });
    }
  };

  // Eliminar Paciente
  const clickEliminar = (id) => {
    Swal.fire({
      title: "¿Desea Eliminar?",
      text: "Recuerda que estos cambios no reversibles",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cerrar",
    }).then((confirmado) => {
      if (confirmado.isConfirmed) {
        (async () => {
          try {
            const config = getConfig();
            // petición
            const { data } = await clienteAxios.delete(
              `/pacientes/${id}`,
              config
            );
            const { msg } = data;

            // sincronizar estado
            const pacientesActualizados = pacientes.filter(
              (pacienteState) => pacienteState._id !== id
            );
            setPacientes(pacientesActualizados);

            if (paciente?._id === id) {
              setPaciente({});
            }

            Swal.fire({
              title: "Paciente Eliminado",
              text: msg,
              icon: "success",
              confirmButtonText: "Entendido",
            });
          } catch (error) {
            console.log(error);
            Swal.fire({
              title: "Error",
              text: "Hubo un error al eliminar el paciente",
              icon: "error",
              confirmButtonText: "Cerrar",
            });
          }
        })();
      }
    });
  };

  // click editar
  const clickEditar = (paciente) => {
    setPaciente(paciente);
    setMostrar(true);
  };

  const buscarPacientes = (search) => {
    setMostrar(false);
    navigate(`/dashboard/search?q=${search}`);
  };

  return (
    <PacientesContext.Provider
      value={{
        pacientes,
        agregarPaciente,
        loading,
        paciente,
        clickEditar,
        editarPaciente,
        clickEliminar,
        mostrar,
        setMostrar,
        setPaciente,
        buscarPacientes,
      }}
    >
      {children}
    </PacientesContext.Provider>
  );
};

export { PacientesProvider };
export default PacientesContext;
