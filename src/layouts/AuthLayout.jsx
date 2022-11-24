import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const AuthLayout = () => {
  return (
    <main className='md:p-10 p-5 flex items-center justify-center min-h-screen flex-col gap-5 w-full max-w-4xl lg:w-3/4  mx-auto'>
      <Outlet />

      <div className='bg-white py-5 px-10 rounded shadow-sm border text-center w-full'>
        <Footer />
      </div>
    </main>
  )
}

export default AuthLayout
