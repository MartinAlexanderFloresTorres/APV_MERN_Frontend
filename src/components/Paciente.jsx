import { formatearFecha } from "../helpers";
import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
  const { nombre, email, fechaAlta, propietario, sintomas, _id } = paciente;

  // usePacientes
  const { clickEditar, clickEliminar } = usePacientes();

  return (
    <div className="my-2 bg-white p-5 shadow rounded-xl">
      <p className="font-bold uppercase text-gray-700 mb-2">
        <span className="border px-2 py-1 rounded-md inline-block text-[14px]">
          Nombre:
        </span>{" "}
        <span className="font-normal normal-case break-all text-gray-800 text-sm">
          {nombre}
        </span>
      </p>
      <p className="font-bold uppercase text-gray-700 mb-2">
        <span className="border px-2 py-1 rounded-md inline-block text-[14px]">
          Propietario:
        </span>{" "}
        <span className="font-normal normal-case break-all text-gray-800 text-sm">
          {propietario}
        </span>
      </p>
      <p className="font-bold uppercase text-gray-700 mb-2">
        <span className="border px-2 py-1 rounded-md inline-block text-[14px]">
          Email de Contacto:
        </span>{" "}
        <a
          href={`mailto:${email}`}
          className="font-normal normal-case break-all text-sky-600 hover:text-sky-700 transition-colors hover:underline text-sm"
        >
          {email}
        </a>
      </p>
      <p className="font-bold uppercase text-gray-700 mb-2">
        <span className="border px-2 py-1 rounded-md inline-block text-[14px]">
          Fecha de Alta:
        </span>{" "}
        <span className="font-normal normal-case break-all text-gray-800 text-sm">
          {formatearFecha(fechaAlta)}
        </span>
      </p>
      <p className="font-bold uppercase text-gray-700 mb-4">
        <span className="border px-2 py-1 rounded-md inline-block text-[14px]">
          Sintomas:
        </span>{" "}
        <span className="font-normal normal-case break-all text-gray-800 text-sm">
          {sintomas}
        </span>
      </p>
      <div className="flex items-center justify-between gap-5">
        <button
          onClick={() => clickEditar(paciente)}
          className="flex gap-2 items-center justify-center w-full disabled:cursor-not-allowed font-black disabled:bg-indigo-400 cursor-pointer hover:bg-indigo-700 bg-indigo-600 text-white transition-all py-2 text-center rounded uppercase"
        >
          Editar
        </button>
        <button
          onClick={() => clickEliminar(_id)}
          className="flex gap-2 items-center justify-center w-full disabled:cursor-not-allowed font-black disabled:bg-red-400 cursor-pointer hover:bg-red-700 bg-red-600 text-white transition-all py-2 text-center rounded uppercase"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default Paciente;
