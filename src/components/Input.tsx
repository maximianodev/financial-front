import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  name: string
  type?: string
  placeholder?: string
  label?: string
}

export const Input: React.FC<InputProps> = ({
  id,
  name,
  type = 'text',
  placeholder,
  onChange,
  label,
  className,
}) => {
  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label htmlFor={id} className='mb-1 text-sm font-medium'>
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className='px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-white focus:ring focus:ring-white'
      />
    </div>
  )
}
