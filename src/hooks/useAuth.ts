'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { saveToLocalStorage } from '../lib/localStorage'
import { login } from '../lib/auth'
import { formatFieldName } from '../utils/formatFieldName'
import { PROFILE_STORAGE_KEY } from '../utils/constants'
import { zSignInFormSchema } from '../lib/validators/login'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState<string>('')
  const { push } = useRouter()

  const resetMessages = () => {
    setErrors([])
    setSuccessMessage('')
  }

  const validateFields = (event: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(event.currentTarget)

    const { data, error } = zSignInFormSchema.safeParse({
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

  const handleSignIn = async (event: FormEvent<HTMLFormElement>) => {
    resetMessages()
    try {
      const data = validateFields(event)

      if (!data) {
        setErrors(['Não foi possível fazer login'])
        return
      }

      const authentication = await login(
        data as z.infer<typeof zSignInFormSchema>
      )
      saveToLocalStorage(PROFILE_STORAGE_KEY, authentication.data)
      setSuccessMessage('Login realizado com sucesso!')
      push('/')
    } catch (error) {
      console.error(error)
      setErrors(['Não foi possível fazer login'])
    }
  }

  return {
    loading,
    successMessage,
    errors,
    setErrors,
    setLoading,
    handleSignIn,
    resetMessages,
  }
}
