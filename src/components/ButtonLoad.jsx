const ButtonLoad = ({ estado, children, ...props }) => {
  return (
    <button
      {...props}
      className='flex gap-2 items-center justify-center w-full disabled:cursor-not-allowed font-black disabled:bg-rose-400 cursor-pointer hover:bg-rose-600 bg-rose-500 text-white transition-all px-3 py-2 text-center rounded uppercase'
    >
      {estado && (
        <svg
          className='animate-spin h-6 w-6 mr-3'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
          ></path>
        </svg>
      )}
      {children}
    </button>
  )
}
ButtonLoad.defaultProps = {
  estado: false
}
export default ButtonLoad
