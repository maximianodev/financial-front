'use client'

import { FormEvent, useState } from 'react'
import { Form } from '../../components/Form'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'
import { authForm } from '../../utils/constants'

export const AuthForm = () => {
  const {
    handleSignIn,
    handleSignUp,
    handleForgotPassword,
    errors,
    successMessage,
  } = useAuth()
  const [step, setStep] = useState<'sign-in' | 'sign-up' | 'forgot-password'>(
    'sign-in'
  )

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (step === 'forgot-password') {
      handleForgotPassword(event)
      return
    }

    if (step === 'sign-up') {
      handleSignUp(event)
      return
    }

    handleSignIn(event)
  }

  return (
    <div>
      <Form
        fields={authForm[step]} // Renderiza os campos com base no step atual
        handleSubmit={handleSubmit}
        id={step}
      >
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
          {step === 'sign-in' && (
            <>
              <Button
                type='button'
                label='Criar conta'
                styleType='link'
                onClick={() => setStep('sign-up')}
              />
              <Button type='submit' label='Entrar' styleType='primary' />
            </>
          )}

          {step === 'sign-up' && (
            <>
              <Button
                type='button'
                label='Já tenho uma conta'
                styleType='link'
                onClick={() => setStep('sign-in')}
              />
              <Button type='submit' label='Cadastrar' styleType='primary' />
            </>
          )}

          {step === 'forgot-password' && (
            <>
              <Button
                type='button'
                label='Voltar'
                styleType='link'
                onClick={() => setStep('sign-in')}
              />
              <Button type='submit' label='Enviar' styleType='primary' />
            </>
          )}
        </div>
      </Form>

      {step === 'sign-in' && (
        <div className='flex justify-center mt-8'>
          <Button
            label='Esqueci minha senha'
            styleType='link'
            onClick={() => setStep('forgot-password')}
          />
        </div>
      )}
    </div>
  )
}
