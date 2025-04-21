import { FormEvent } from 'react'

import { Input } from './Input'

type Field = {
  id: string
  name: string
  label: string
  type: string
  placeholder: string
  required: boolean
}

interface FormProps extends React.HTMLProps<HTMLFormElement> {
  fields: Field[]
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  className?: string
}

export const Form = ({
  fields,
  handleSubmit,
  className = '',
  children,
  ...props
}: React.PropsWithChildren<FormProps>) => {
  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col ${className}`}
      {...props}
    >
      {fields.map((field) => (
        <Input key={field.id} className='not-first:mt-5' {...field} />
      ))}
      {children}
    </form>
  )
}
