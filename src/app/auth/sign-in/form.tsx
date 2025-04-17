"use client"

import { FormEvent } from 'react'
import { redirect } from 'next/navigation'

import { Form } from '../../../components/Form'
import { Button } from '../../../components/Button'
import { useAuth } from '../../../hooks/useAuth'
import { loginForm } from '../../../utils/constants'

export const SignInForm = () => {
  const { handleSignIn, errors, successMessage } = useAuth()

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    handleSignIn(event)
  }

  return (
    <div>
      <Form fields={loginForm.login} handleSubmit={handleSubmit}>
        {errors.length ? (
          <div className='text-red-500 text-sm my-4 text-center'>
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        ) : null}

        {successMessage && (
          <div className='text-green-500 text-sm my-4 text-center'>
            {successMessage}
          </div>
        )}

        <div className='flex justify-between items-center mt-8'>
          <Button
            type='button'
            label='Criar conta'
            styleType='link'
            onClick={() => redirect('/auth/signup')}
          />

          <Button type='submit' label={'Entrar'} styleType='primary' />
        </div>
      </Form>

      <div className='flex justify-center mt-8'>
        <Button
          label='Esqueci minha senha'
          styleType='link'
          onClick={() =>  redirect('/auth/forgot-password')}
        />
      </div>
    </div>
  )
}
