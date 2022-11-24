import Formulario from '../../components/Formulario'
import ListadoPacientes from '../../components/ListadoPacientes'
import usePacientes from '../../hooks/usePacientes'

const AdministrarPaciente = () => {
  const { mostrar, setMostrar, setPaciente } = usePacientes()

  return (
    <div className='md:p-10 p-5 md:flex gap-10'>
      <button
        onClick={() => {
          setPaciente({})
          setMostrar(!mostrar)
        }}
        className='flex gap-2 items-center justify-center w-full disabled:cursor-not-allowed font-black  cursor-pointer hover:bg-rose-700 bg-rose-600 text-white transition-all px-3 py-2 text-center rounded uppercase mb-10 md:hidden'
      >
        {mostrar ? 'Ocultar Formulario' : 'Agregar Paciente'}
      </button>
      <div
        className={`${
          mostrar
            ? 'block fixed top-0 left-0 w-full h-full bg-slate-50 z-10 p-5 overflow-auto'
            : 'hidden'
        } md:block md:static md:h-auto md:bg-transparent md:p-0 md:w-1/2 md:z-0 lg:w-1/2`}
      >
        <button
          onClick={() => {
            setPaciente({})
            setMostrar(!mostrar)
          }}
          className='ml-auto block font-black  cursor-pointer hover:bg-rose-600 bg-rose-500 text-white transition-all px-5 py-2 text-center rounded uppercase mb-10 md:hidden'
        >
          Cerrar
        </button>
        <Formulario />
      </div>
      <div className='md:w-1/2 lg:w-3/5'>
        <ListadoPacientes />
      </div>
    </div>
  )
}

export default AdministrarPaciente
