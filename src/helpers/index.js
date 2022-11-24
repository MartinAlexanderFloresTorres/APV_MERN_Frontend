// traer la configuración de la peticiones httpp
const getConfig = () => {
  // token
  const getToken = localStorage.getItem('token-APV')
  // config
  const config = {
    headers: {
      'Context-Type': 'application/json',
      Authorization: `Bearer ${getToken}`
    }
  }
  return config
}

// formatear fecha
const formatearFecha = (fecha) => {
  let nuevaFecha
  if (fecha.includes('T00:00:00.000Z')) {
    nuevaFecha = new Date(fecha.split('T')[0].split('-'))
  } else {
    nuevaFecha = new Date(fecha)
  }
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return nuevaFecha.toLocaleDateString('es-ES', opciones)
}
export { getConfig, formatearFecha }
