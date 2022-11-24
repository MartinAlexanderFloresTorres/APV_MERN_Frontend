import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import ButtonLoad from '../../components/ButtonLoad'
import Password from '../../components/Password'
import useAuth from '../../hooks/useAuth'

const CambiarPassword = () => {
  // Estados
  const [campos, setCampos] = useState({
    password: '',
    password2: '',
    password3: ''
  })
  const [cargando, setCargando] = useState(false)
  const [disabled, setDisabled] = useState(true)

  // useAuth
  const { actualizarPassword } = useAuth()

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
      if (
        campos.password.length > 5 &&
        campos.password2.length > 5 &&
        campos.password3.length > 5
      ) {
        setDisabled(false)
      } else {
        setDisabled(true)
      }
    }
  }, [campos])

  // Crear nuevo password
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
    if (campos.password2.length < 5 || campos.password3.length < 5) {
      Swal.fire({
        title: 'Password inseguros',
        text: 'El password debe ser mayor de 6 digitos',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      })
      return
    }
    if (campos.password2 != campos.password3) {
      Swal.fire({
        title: 'Passwords diferentes¡',
        text: 'Los passwords son diferentes',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      })
      return
    }
    // Realizar la petición
    const data = {
      password: campos.password,
      passwordNuevo: campos.password2
    }
    setCargando(true)
    const finalizo = await actualizarPassword(data)
    if (finalizo) {
      setCampos({
        password: '',
        password2: '',
        password3: ''
      })
    }
    setCargando(false)
  }

  return (
    <div className='container md:p-10 p-5 flex items-center justify-center  flex-col gap-5 w-full lg:w-3/4 2xl:w-2/3 mx-auto'>
      <div className='text-center mt-10 pb-10'>
        <h2 className='font-bold text-4xl mb-3'>Cambiar Password</h2>
        <p className='text-xl'>
          Modifica tu <span className='text-rose-500 font-bold'>Password Aquí</span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className='bg-white sm:p-10 p-6 rounded shadow-sm border mb-5'>
        <legend className='text-rose-500 font-bold sm:text-5xl text-4xl text-center mb-10'>
          Almacena tu nuevo <span className='text-gray-700'>Password</span>
        </legend>

        <div className='mb-5'>
          <label
            htmlFor='password'
            className='block uppercase text-gray-700 text-xl font-bold mb-2'
          >
            Password Actual
          </label>
          <Password
            name='password'
            id='password'
            disabled={cargando}
            value={campos.password}
            onChange={handleChangeCampos}
            placeholder='Ingrese su password Actual'
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor='password2'
            className='block uppercase text-gray-700 text-xl font-bold mb-2'
          >
            {' '}
            Nuevo Password
          </label>
          <Password
            name='password2'
            id='password2'
            disabled={cargando}
            value={campos.password2}
            onChange={handleChangeCampos}
            placeholder='Ingrese su password'
          />
        </div>

        <div className='mb-5'>
          <label
            htmlFor='password3'
            className='block uppercase text-gray-700 text-xl font-bold mb-2'
          >
            {' '}
            Repetir Password
          </label>
          <Password
            name='password3'
            id='password3'
            disabled={cargando}
            value={campos.password3}
            onChange={handleChangeCampos}
            placeholder='Repita su password'
          />
        </div>
        <ButtonLoad disabled={disabled || cargando} estado={cargando} type='submit'>
          {cargando ? 'Guardando password....' : 'Guardar nuevo password'}
        </ButtonLoad>
      </form>
    </div>
  )
}

export default CambiarPassword
