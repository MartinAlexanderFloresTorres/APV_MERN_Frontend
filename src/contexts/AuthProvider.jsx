import { createContext, useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../config/clienteAxios'
import { getConfig } from '../helpers'

const authContext = createContext()

const AuthProvider = ({ children }) => {
  // Estados
  const [auth, setAuth] = useState({})
  const [cargando, setCargando] = useState(true)

  // locatation
  const { pathname, state } = useLocation()

  // navigate
  const navigate = useNavigate()

  // Redirecionar
  useEffect(() => {
    if (localStorage.getItem('token-APV')) {
      if (['/', '/olvide-password', '/registrar'].includes(pathname)) {
        navigate('/dashboard')
      }
    }
  }, [pathname])

  // Reautenticar
  useEffect(() => {
    autenticarUsuario()
  }, [])

  // Autenticar
  const autenticarUsuario = async () => {
    try {
      setCargando(true)
      const getToken = localStorage.getItem('token-APV')
      if (getToken) {
        const config = {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken}`
          }
        }
        const { data } = await clienteAxios.get('/veterinarios/perfil', config)
        setAuth(data)
      }
    } catch (error) {
      console.log(error)
      setAuth({})
      localStorage.removeItem('token-APV')
      const { msg } = error.response.data
      Swal.fire({
        title: 'Autenticacíon Fallida¡',
        text: msg,
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
    }
    setCargando(false)
  }

  // Cerrar Sesión
  const cerrarSesion = () => {
    Swal.fire({
      title: 'Cerrar Sesión',
      text: '¿Deseas cerrar la sesión de este dispositivo?',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Cerrar Sesión'
    }).then((confirmado) => {
      if (confirmado.isConfirmed) {
        localStorage.removeItem('token-APV')
        setAuth({})
        navigate('/')
        Swal.fire({
          title: 'Sesión Cerrada',
          text: 'La sesión se cerro correctamente, vuelva pronto.',
          icon: 'success',
          confirmButtonText: 'Entendido'
        })
      }
    })
  }

  // Iniciar sesión
  const iniciarSesion = (data) => {
    const { token, user } = data
    localStorage.setItem('token-APV', token)
    setAuth(user)
    // redirecionar
    if (state) {
      // estado del Navigate
      const { search, pathname } = state
      if (!search) {
        navigate(pathname)
      } else {
        navigate(pathname + search)
      }
    } else {
      navigate('/dashboard')
    }
  }

  // Actualizar Perfil
  const actualizarPerfil = async (usuario) => {
    try {
      const config = getConfig()
      const { data } = await clienteAxios.put(`/veterinarios/perfil/${usuario.id}`, usuario, config)
      setAuth(data)
      Swal.fire({
        title: 'Datos Actualizados',
        text: 'Los datos fueron actualizados correctamente',
        icon: 'success',
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        confirmButtonText: 'Ver Pacientes'
      }).then((confirmado) => {
        if (confirmado.isConfirmed) {
          navigate('/dashboard')
        }
      })
    } catch (error) {
      console.log(error)
      const { msg } = error.response.data
      Swal.fire({
        title: 'Error al actualizar¡',
        text: msg,
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
    }
  }

  // Actualizar Passsword
  const actualizarPassword = async (datos) => {
    try {
      const config = getConfig()
      const { data } = await clienteAxios.put(`/veterinarios/actualizar-password`, datos, config)
      const { msg } = data
      Swal.fire({
        title: 'Password Actualizado',
        text: msg,
        icon: 'success',
        showCancelButton: true,
        cancelButtonText: 'Cerrar',
        confirmButtonText: 'Ver Pacientes'
      }).then((confirmado) => {
        if (confirmado.isConfirmed) {
          navigate('/dashboard')
        }
      })
      return true
    } catch (error) {
      console.log(error)
      const { msg } = error.response.data
      Swal.fire({
        title: 'Error al actualizar¡',
        text: msg,
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
      return false
    }
  }

  return (
    <authContext.Provider
      value={{
        auth,
        cargando,
        cerrarSesion,
        iniciarSesion,
        actualizarPerfil,
        actualizarPassword
      }}
    >
      {children}
    </authContext.Provider>
  )
}

export { AuthProvider }
export default authContext
