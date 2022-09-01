import { useContext } from "react";
import authContext from "../contexts/AuthProvider";

const useAuth = () => {
  return useContext(authContext);
};

export default useAuth;
