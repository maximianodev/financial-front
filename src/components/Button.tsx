import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  styleType: 'primary' | 'secondary' | 'link'
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
        {...props}
        className={`font-bold cursor-pointer hover:underline ${className}`}
      >
        {label}
      </button>
    )
  }

  if (styleType === 'secondary') {
    return (
      <button
        {...props}
        className={`border-1 text-white font-bold py-2 px-4 rounded cursor-pointer hover:opacity-85 ${className}`}
      >
        {label}
      </button>
    )
  }

  return (
    <button
      {...props}
      className={`bg-white text-black font-bold py-2 px-4 rounded cursor-pointer hover:opacity-85 ${className}`}
    >
      {label}
    </button>
  )
}
