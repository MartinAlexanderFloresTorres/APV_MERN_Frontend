import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import clienteAxios from '../config/clienteAxios'
import ButtonLoad from '../components/ButtonLoad'
import Password from '../components/Password'

const Registrar = () => {
  // Estados
  const [campos, setCampos] = useState({
    nombre: '',
    email: '',
    password: '',
    password2: ''
  })
  const [cargando, setCargando] = useState(false)
  const [disabled, setDisabled] = useState(true)

  // llenar campos
  const handleChangeCampos = (e) => {
    const { name, value } = e.target
    setCampos({ ...campos, [name]: value.trimStart() })
  }

  // comprobar campos
  useEffect(() => {
    if (Object.values(campos).includes('')) {
      setDisabled(true)
    } else {
      if (campos.password.length > 5 && campos.password2.length > 5) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
  }, [campos])

  // Handle Formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    // Validar formulario
    if (Object.values(campos).includes('')) {
      Swal.fire({
        title: 'Campos obligatorios',
        text: 'Todo los campos son obligatorios',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      })
      return
    }
    if (campos.nombre.trimEnd().length < 4) {
      Swal.fire({
        title: 'Nombre muy corto',
        text: 'El nombre es muy corto, coloque minimo 5 caracteres',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      })
      return
    }
    if (campos.nombre.trimEnd().length > 30) {
      Swal.fire({
        title: 'Nombre muy largo',
        text: 'El nombre es muy largo, coloque maximo 30 caracteres',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      })
      return
    }
    if (campos.password.length < 5 || campos.password2.length < 5) {
      Swal.fire({
        title: 'Password inseguros',
        text: 'El password debe ser mayor de 6 digitos',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      })
      return
    }
    if (campos.password != campos.password2) {
      Swal.fire({
        title: 'Passwords diferentes¡',
        text: 'Los passwords son diferentes',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      })
      return
    }
    // Realizar el registro
    try {
      setCargando(true)
      const usuario = {
        nombre: campos.nombre,
        email: campos.email,
        password: campos.password
      }
      const { data } = await clienteAxios.post('/veterinarios', usuario)
      const { msg } = data
      Swal.fire({
        title: 'Cuenta Creada',
        text: msg,
        icon: 'success',
        confirmButtonText: 'Entendido'
      })
      setCampos({
        nombre: '',
        email: '',
        password: '',
        password2: ''
      })
    } catch (error) {
      const { msg } = error.response.data
      Swal.fire({
        title: 'Registro Fallido¡',
        text: msg,
        icon: 'error',
        confirmButtonText: 'Entendido'
      })
    }
    setCargando(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='bg-white sm:p-10 p-6 rounded shadow-sm border mb-5'>
        <legend className='text-rose-500 font-bold sm:text-5xl text-4xl text-center mb-10'>
          Crea tu Cuenta y Administra tus <span className='text-gray-700'>Pacientes</span>
        </legend>

        <div className='mb-5'>
          <label htmlFor='nombre' className='block uppercase text-gray-700 text-xl font-bold mb-2'>
            Nombre
          </label>
          <input
            className='border p-2 block bg-gray-50 rounded-md w-full outline-rose-200'
            type='nombre'
            name='nombre'
            id='nombre'
            disabled={cargando}
            value={campos.nombre}
            onChange={handleChangeCampos}
            placeholder='Ingrese su nombre'
          />
        </div>

        <div className='mb-5'>
          <label htmlFor='email' className='block uppercase text-gray-700 text-xl font-bold mb-2'>
            Email
          </label>
          <input
            className='border p-2 block bg-gray-50 rounded-md w-full outline-rose-200'
            type='email'
            name='email'
            id='email'
            disabled={cargando}
            value={campos.email}
            onChange={handleChangeCampos}
            placeholder='Ingrese su email'
          />
          <p className='mt-5 text-gray-500 text-base'>
            <span className='font-bold text-gray-800'>Nota: </span>Por favor ingrese un email válido
            para poderlo confirmar mediante un mensaje de email.
          </p>
        </div>

        <div className='mb-5'>
          <label
            htmlFor='password'
            className='block uppercase text-gray-700 text-xl font-bold mb-2'
          >
            Password
          </label>
          <Password
            name='password'
            id='password'
            disabled={cargando}
            value={campos.password}
            onChange={handleChangeCampos}
            placeholder='Ingrese su password'
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor='password2'
            className='block uppercase text-gray-700 text-xl font-bold mb-2'
          >
            Repetir Password
          </label>
          <Password
            name='password2'
            id='password2'
            disabled={cargando}
            value={campos.password2}
            onChange={handleChangeCampos}
            placeholder='Repita su password'
          />
        </div>
        <ButtonLoad disabled={disabled || cargando} estado={cargando} type='submit'>
          {cargando ? 'Creando Cuenta....' : 'Crear Cuenta'}
        </ButtonLoad>

        <Link
          to={'/olvide-password'}
          className='text-rose-500 hover:text-rose-600 transition-all font-normal text-center block mt-10 w-fit mx-auto'
        >
          ¿Has olvidado la contraseña?
        </Link>
      </form>

      <div className='bg-white py-5 px-10 rounded shadow-sm border text-center'>
        ¿Tienes una cuenta?{' '}
        <Link to={'/'} className='text-rose-500 hover:text-rose-600 transition-all font-semibold'>
          Entrar
        </Link>
      </div>
    </div>
  )
}

export default Registrar
