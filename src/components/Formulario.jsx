import { useState, useEffect } from 'react'
import ButtonLoad from './ButtonLoad'
import Swal from 'sweetalert2'
import usePacientes from '../hooks/usePacientes'
const Formulario = () => {
  // Estados
  const [campos, setCampos] = useState({
    nombre: '',
    propietario: '',
    email: '',
    fechaAlta: '',
    sintomas: ''
  })
  const [cargando, setCargando] = useState(false)
  const [disabled, setDisabled] = useState(true)
  const [editar, setEditar] = useState(false)

  // usePacientes
  const { agregarPaciente, editarPaciente, paciente } = usePacientes()

  // llenar campos
  const handleChangeCampos = (e) => {
    const { name, value } = e.target
    setCampos({ ...campos, [name]: value.trimStart() })
  }

  // comprobar campos
  useEffect(() => {
    if (
      Object.values(campos).includes('') ||
      campos.email === '' ||
      !campos.email.includes('@') ||
      !campos.email.includes('.')
    ) {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }, [campos])

  // modo edición
  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setEditar(true)
      setCampos({
        nombre: paciente.nombre,
        propietario: paciente.propietario,
        email: paciente.email,
        fechaAlta: paciente.fechaAlta.split('T')[0],
        sintomas: paciente.sintomas
      })
    } else {
      setEditar(false)
      setCampos({
        nombre: '',
        propietario: '',
        email: '',
        fechaAlta: '',
        sintomas: ''
      })
    }
  }, [paciente])

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
        text: 'El nombre es muy corto, coloque minimo 4 caracteres',
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
    if (campos.propietario.trimEnd().length < 4) {
      Swal.fire({
        title: 'Propietario muy corto',
        text: 'El nombre del propietario es muy corto, coloque minimo 4 caracteres',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      })
      return
    }
    if (campos.propietario.trimEnd().length > 30) {
      Swal.fire({
        title: 'propietario muy largo',
        text: 'El nombre del propietario es muy largo, coloque maximo 30 caracteres',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      })
      return
    }
    if (campos.sintomas.trimEnd().length < 5) {
      Swal.fire({
        title: 'Sintomas',
        text: 'Los Sintomas son muy cortos, coloque minimo 5 caracteres',
        icon: 'warning',
        confirmButtonText: 'Entendido'
      })
      return
    }
    // Realizar la petición
    const data = {
      nombre: campos.nombre,
      propietario: campos.propietario,
      email: campos.email,
      fechaAlta: campos.fechaAlta,
      sintomas: campos.sintomas
    }

    setCargando(true)
    if (editar) {
      await editarPaciente({ ...data, id: paciente._id })
    } else {
      // Agregar paciente
      await agregarPaciente(data)
    }
    setCargando(false)
  }
  return (
    <>
      <div className='text-center mb-8'>
        <p className='font-bold text-3xl mb-4'>Administrador de Pacientes</p>
        <p className='text-xl'>
          {editar ? 'Actualiza' : 'Añade'} tus Pacientes y{' '}
          <span className='text-rose-500 font-bold'>Administralos</span>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className='bg-white sm:p-10 p-6 rounded shadow-sm border border-gray-100 mb-10 md:mb-0 sticky top-36'
      >
        <div className='mb-5'>
          <label className='mb-2 block text-gray-600 font-bold text-lg' htmlFor='nombre'>
            Nombre Mascota
          </label>
          <input
            className='border p-2 w-full placeholder-gray-400 outline-rose-200 rounded-md'
            type='text'
            id='nombre'
            disabled={cargando}
            value={campos.nombre}
            onChange={handleChangeCampos}
            name='nombre'
            placeholder='Nombre de la mascota'
          />
        </div>

        <div className='mb-5'>
          <label className='mb-2 block text-gray-600 font-bold text-lg' htmlFor='propietario'>
            propietario
          </label>
          <input
            className='border p-2 w-full placeholder-gray-400 outline-rose-200 rounded-md'
            type='text'
            id='propietario'
            disabled={cargando}
            value={campos.propietario}
            onChange={handleChangeCampos}
            name='propietario'
            placeholder='Nombre del propietario'
          />
        </div>

        <div className='mb-5'>
          <label className='mb-2 block text-gray-600 font-bold text-lg' htmlFor='email'>
            Email
          </label>
          <input
            className='border p-2 w-full placeholder-gray-400 outline-rose-200 rounded-md'
            type='email'
            id='email'
            disabled={cargando}
            value={campos.email}
            onChange={handleChangeCampos}
            name='email'
            placeholder='Email del propietario'
          />
        </div>

        <div className='mb-5'>
          <label className='mb-2 block text-gray-600 font-bold text-lg' htmlFor='fechaAlta'>
            Fecha de Alta
          </label>
          <input
            className='border p-2 w-full placeholder-gray-400 outline-rose-200 rounded-md'
            type='date'
            id='fechaAlta'
            disabled={cargando}
            value={campos.fechaAlta}
            onChange={handleChangeCampos}
            name='fechaAlta'
          />
        </div>

        <div className='mb-5'>
          <label className='mb-2 block text-gray-600 font-bold text-lg' htmlFor='sintomas'>
            Sintomas
          </label>
          <textarea
            className='border p-2 w-full placeholder-gray-400 outline-rose-200 rounded-md max-h-28'
            id='sintomas'
            name='sintomas'
            disabled={cargando}
            value={campos.sintomas}
            onChange={handleChangeCampos}
            rows='2'
            placeholder='Sintomas de la mascota'
          />
        </div>
        <ButtonLoad disabled={disabled || cargando} estado={cargando} type='submit'>
          {editar
            ? cargando
              ? 'Actualizando...'
              : 'Actualizar Paciente'
            : cargando
            ? 'Agregando Paciente....'
            : 'Agregar Paciente'}
        </ButtonLoad>
      </form>
    </>
  )
}

export default Formulario
