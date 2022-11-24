import usePacientes from '../hooks/usePacientes'
import LoadPaciente from './LoadPaciente'
import Paciente from './Paciente'

const ListadoPacientes = () => {
  const { pacientes, loading } = usePacientes()

  if (loading) {
    return <LoadPaciente />
  }
  return (
    <>
      {pacientes.length > 0 ? (
        <div className='text-center  mb-8'>
          <p className='font-bold text-3xl mb-4'>Listado de Pacientes</p>
          <p className='text-xl'>
            Administra tus <span className='text-rose-500 font-bold'>Pacientes y Citas</span>
          </p>
        </div>
      ) : (
        <div className='text-center mb-8'>
          <p className='font-bold text-3xl mb-4'>No Hay Pacientes</p>
          <p className='text-xl'>
            Comienza agregando a tus pacientes
            <span className='text-rose-500 font-bold'>Y parecerán en este lugar</span>
          </p>
        </div>
      )}

      <div className='overflow-auto pr-1' style={{ maxHeight: 650 }}>
        {pacientes.length > 0 &&
          pacientes.map((paciente) => <Paciente key={paciente._id} paciente={paciente} />)}
      </div>
    </>
  )
}

export default ListadoPacientes
