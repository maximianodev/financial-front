import React, { useMemo, useState } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  name: string
  type?: string
  placeholder?: string
  label?: string
}

const InputPassword: React.FC<InputProps> = (props) => {
  const [isVisible, setVisible] = useState<boolean>(false)
  const { id, name, placeholder, onChange, label, className } = props

  const inputType = useMemo(
    () => (isVisible ? 'text' : 'password'),
    [isVisible]
  )

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={id} className='mb-1 font-bold'>
          {label}
        </label>
      )}

      <input
        id={id}
        name={name}
        type={inputType}
        placeholder={placeholder}
        onChange={onChange}
        className='text-white px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm 
          focus:outline-none focus:border-white focus:ring focus:ring-white
          focus:ring-opacity-50 transition duration-200 ease-in-out placeholder:text-sm 
          placeholder:text-gray-400'
      />
      <div className='mt-2'>
        <button
          className='text-xs text-white-500 uppercase cursor-pointer font-bold underline'
          type='button'
          onClick={() => setVisible(!isVisible)}
        >
          {isVisible ? 'Ocultar' : 'Mostrar'} senha
        </button>
      </div>
    </div>
  )
}

export const Input: React.FC<InputProps> = (props) => {
  if (props.type === 'password') {
    return <InputPassword {...props} />
  }

  const {
    id,
    name,
    type = 'text',
    placeholder,
    onChange,
    label,
    className,
  } = props

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={id} className='mb-1 font-bold'>
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className='text-white px-3 py-2 border-2 border-gray-300 rounded-md shadow-sm 
          focus:outline-none focus:border-white focus:ring focus:ring-white
          focus:ring-opacity-50 transition duration-200 ease-in-out placeholder:text-sm 
          placeholder:text-gray-400'
      />
    </div>
  )
}
