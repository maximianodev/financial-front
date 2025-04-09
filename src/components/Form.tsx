'use client'
import { Button } from './Button'
import { Input } from './Input'
import { FormEvent } from 'react'

type Field = {
  id: string
  name: string
  label: string
  type: string
  placeholder: string
  required: boolean
}

interface FormProps {
  fields: Field[]
  submitLabel: string
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void
  secondaryActionLabel?: string
  handleSecondaryAction?: () => void
}

export const Form = ({
  fields,
  submitLabel = '',
  handleSubmit,
  handleSecondaryAction,
  secondaryActionLabel = '',
}: FormProps) => {
  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <Input key={field.id} className='not-first:mt-5' {...field} />
      ))}

      <div className='flex justify-between items-center mt-8'>
        {secondaryActionLabel && (
          <Button
            type='button'
            label={secondaryActionLabel}
            styleType='secondary'
            onClick={handleSecondaryAction}
          />
        )}

        <Button type='submit' label={submitLabel} styleType='primary' />
      </div>
    </form>
  )
}
