'use client'

import { FormEvent, useState } from 'react'
import { Form } from '../../components/Form'
import { loginForm, STORAGE_KEY } from '../../utils/constants'
import { Button } from '../../components/Button'
import { SignupFormSchema } from '../../lib/validators/login'
import { formatFieldName } from '../../utils/formatFieldName'
import { saveToLocalStorage } from '../../lib/localStorage'
import { login } from '../../lib/auth'

type FormState = 'login' | 'signup' | 'forgot-password'

export const LoginForm = () => {
  const [formStep, setFormStep] = useState<FormState>('login')
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    setErrors([])
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    const { data, error } = SignupFormSchema.safeParse({
      email: formData?.get('email') ?? '',
      password: formData?.get('password') ?? '',
    })

    if (error) {
      const fieldsError = error.issues.map(({ message, path }) => {
        return `${formatFieldName(path?.toString())}: ${message}`
      })
      setErrors(fieldsError)
      return
    }

    if (formStep === 'login') {
      try {
        const result = await login({
          email: data.email,
          password: data.password,
        })

        saveToLocalStorage(STORAGE_KEY, result.data)
      } catch (err) {
        console.error(err)
        setErrors(['Não foi possível fazer login'])

        return
      }
    }
  }

  if (formStep === 'forgot-password') {
    return (
      <Form
        fields={loginForm.forgotPassword}
        handleSubmit={handleSubmit}
        submitLabel='Enviar'
        secondaryActionLabel='Voltar'
        handleSecondaryAction={() => setFormStep('login')}
      />
    )
  }

  if (formStep === 'signup') {
    return (
      <Form
        fields={loginForm.signup}
        handleSubmit={handleSubmit}
        submitLabel='Cadastrar'
        secondaryActionLabel='Login'
        handleSecondaryAction={() => setFormStep('login')}
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
        handleSecondaryAction={() => setFormStep('signup')}
      />

      {errors.length ? (
        <div className='text-red-500 text-sm my-4'>
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      ) : null}

      <div className='flex justify-center mt-8'>
        <Button
          label='Esqueci minha senha'
          onClick={() => setFormStep('forgot-password')}
          styleType='link'
        />
      </div>
    </div>
  )
}
