import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import type { FormSteps } from '../app/login/form'
import { saveToLocalStorage } from '../lib/localStorage'
import { forgotPassword, login } from '../lib/auth'
import { formatFieldName } from '../utils/formatFieldName'
import { PROFILE_STORAGE_KEY } from '../utils/constants'
import { zEmail, zSignupFormSchema } from '../lib/validators/login'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState<string>('')
  const { push } = useRouter()

  const resetMessages = () => {
    setErrors([])
    setSuccessMessage('')
  }

  const validateFields = (
    event: FormEvent<HTMLFormElement>,
    type: FormSteps
  ) => {
    const formData = new FormData(event.currentTarget)

    if (type === 'login') {
      const { data, error } = zSignupFormSchema.safeParse({
        email: formData?.get('email') ?? '',
        password: formData?.get('password') ?? '',
      })

      if (error) {
        setErrors(
          error.issues.map(
            ({ path, message }) =>
              `${formatFieldName(path?.toString())}: ${message}`
          )
        )
      }

      return data
    }

    if (type === 'forgot-password') {
      const email = formData?.get('email') ?? ''
      const { data, error } = zEmail.safeParse(email)

      if (error) {
        setErrors(
          error.issues.map(
            ({ path, message }) =>
              `${formatFieldName(path?.toString())}: ${message}`
          )
        )
      }

      return data
    }
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    resetMessages()
    try {
      const data = validateFields(event, 'login')

      if (!data) {
        throw new Error('Invalid data')
      }

      const authentication = await login(
        data as z.infer<typeof zSignupFormSchema>
      )
      saveToLocalStorage(PROFILE_STORAGE_KEY, authentication.data)
      setSuccessMessage('Login realizado com sucesso!')
      push('/')
    } catch {
      setErrors(['Não foi possível fazer login'])
    }
  }

  const handleForgotPassword = async (event: FormEvent<HTMLFormElement>) => {
    resetMessages()
    try {
      const data = validateFields(event, 'forgot-password')

      if (!data) {
        throw new Error('Invalid data')
      }

      forgotPassword({ email: data as z.infer<typeof zEmail> })
      setSuccessMessage(
        'Um e-mail de recuperação foi enviado para o seu e-mail cadastrado!'
      )
    } catch {
      setErrors(['Não foi possível enviar o e-mail de recuperação'])
    }
  }

  return {
    loading,
    successMessage,
    errors,
    setErrors,
    setLoading,
    handleLogin,
    handleForgotPassword,
    resetMessages,
  }
}
