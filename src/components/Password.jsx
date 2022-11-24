import { useState } from 'react'

const Password = ({ ...props }) => {
  const [estado, setEstado] = useState(false)
  const { value } = props
  return (
    <div className='relative w-ful'>
      <input
        {...props}
        type={estado ? 'text' : 'password'}
        className='border p-2 pr-20 block bg-gray-50 rounded-md w-full outline-rose-200'
      />
      {value.length > 0 && (
        <button
          type='button'
          onClick={() => setEstado(!estado)}
          className='absolute right-0 pr-3 top-2/4 transform -translate-y-1/2 cursor-pointer outline-none p-2'
        >
          {estado ? 'Ocultar' : 'Mostrar'}
        </button>
      )}
      <p className='absolute overflow-hidden -right-3 -top-3 bg-white rounded-full border w-[20px] h-[20px] flex items-center justify-center text-sm'>
        {value.length}
      </p>
    </div>
  )
}

export default Password
