import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <section className='text-center p-10'>
      <h1 className='font-bold text-9xl'>404</h1>
      <h2 className='font-bold text-sm p-1'>Página no encontrada</h2>

      <p className='text-sm p-2 mb-5'>La página que estás buscando no existe o ha sido movida.</p>

      <Link
        className='hover:bg-rose-600 border-2 hover:border-rose-600 text-white border-rose-500 bg-rose-500 transition-all py-2 px-5 rounded-md w-fit text-xl font-bold md:col-span-1 col-span-1 md:row-start-1 text-left md:ml-auto'
        to='/dashboard'
      >
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFound
