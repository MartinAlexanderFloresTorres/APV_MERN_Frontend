// traer la configuración de la peticiones httpp
const getConfig = () => {
  // token
  const getToken = localStorage.getItem("token-APV");
  // config
  const config = {
    headers: {
      "Context-Type": "application/json",
      Authorization: `Bearer ${getToken}`,
    },
  };
  return config;
};

// formatear fecha
const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);
  const opciones = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return fechaNueva.toLocaleString("es-ES", opciones);
};
export { getConfig, formatearFecha };
