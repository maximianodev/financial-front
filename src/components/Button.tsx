import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  styleType?: 'primary' | 'secondary' | 'link'
}

export const Button: React.FC<ButtonProps> = ({
  label,
  className = '',
  styleType = 'primary',
  ...props
}) => {
  if (styleType === 'link') {
    return (
      <button
        className={`font-bold cursor-pointer hover:underline ${className}`}
        {...props}
      >
        {label}
      </button>
    )
  }

  if (styleType === 'secondary') {
    return (
      <button
        className={`border-1 text-white font-bold py-2 px-4 rounded cursor-pointer hover:opacity-85 ${className}`}
        {...props}
      >
        {label}
      </button>
    )
  }

  return (
    <button
      className={`bg-white text-black font-bold py-2 px-4 rounded cursor-pointer hover:opacity-85 ${className}`}
      {...props}
    >
      {label}
    </button>
  )
}
