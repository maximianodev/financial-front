'use client'

import { FormEvent, useState } from 'react'
import { Form } from '../../components/Form'
import { Button } from '../../components/Button'
import { useAuth } from '../../hooks/useAuth'
import { loginForm } from '../../utils/constants'

export type FormSteps = 'login' | 'signup' | 'forgot-password'

export const LoginForm = () => {
  const {
    handleLogin,
    handleForgotPassword,
    errors,
    successMessage,
    resetMessages,
  } = useAuth()
  const [step, setStep] = useState<FormSteps>('login')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    switch (step) {
      case 'forgot-password':
        handleForgotPassword(event)
        break
      case 'login':
        handleLogin(event)
        break
      default:
        break
    }
  }

  const handleStepChange = (newStep: FormSteps) => {
    resetMessages()
    setStep(newStep)
  }

  if (step === 'forgot-password') {
    return (
      <Form
        fields={loginForm.forgotPassword}
        handleSubmit={handleSubmit}
        submitLabel='Enviar'
        secondaryActionLabel='Voltar'
        handleSecondaryAction={() => handleStepChange('login')}
        errors={errors}
        successMessage={successMessage}
      />
    )
  }

  if (step === 'signup') {
    return (
      <Form
        fields={loginForm.signup}
        handleSubmit={handleSubmit}
        submitLabel='Cadastrar'
        secondaryActionLabel='Login'
        handleSecondaryAction={() => handleStepChange('login')}
        errors={errors}
        successMessage={successMessage}
      />
    )
  }

  return (
    <div>
      <Form
        fields={loginForm.login}
        handleSubmit={handleSubmit}
        submitLabel='Login'
        secondaryActionLabel='Cadastrar'
        handleSecondaryAction={() => handleStepChange('signup')}
        errors={errors}
        successMessage={successMessage}
      />

      <div className='flex justify-center mt-8'>
        <Button
          label='Esqueci minha senha'
          onClick={() => handleStepChange('forgot-password')}
          styleType='link'
        />
      </div>
    </div>
  )
}
