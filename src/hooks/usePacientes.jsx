import { useContext } from "react";
import PacientesContext from "../contexts/PacientesProvider";

const usePacientes = () => {
  return useContext(PacientesContext);
};

export default usePacientes;
