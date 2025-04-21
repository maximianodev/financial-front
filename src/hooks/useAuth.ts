'use client'

import { FormEvent, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { z } from 'zod'

import { saveToLocalStorage } from '../lib/localStorage'
import { forgotPassword, signIn, signUp } from '../lib/alfred/auth'
import { formatFieldName } from '../utils/formatFieldName'
import { PROFILE_STORAGE_KEY } from '../utils/constants'
import {
  zEmail,
  zSignInFormSchema,
  zSignUpFormSchema,
} from '../lib/validators/auth'

export const useAuth = () => {
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [successMessage, setSuccessMessage] = useState<string>('')
  const { push } = useRouter()

  const resetMessages = () => {
    setErrors([])
    setSuccessMessage('')
  }

  const validateFields = useCallback((event: FormEvent<HTMLFormElement>) => {
    const formTypeId = (event.target as HTMLFormElement).id
    console.log('🚀 ~ validateFields ~ formTypeId:', formTypeId)

    const formData = new FormData(event.currentTarget)

    const formatTypes = () => {
      switch (formTypeId) {
        case 'sign-in':
          return zSignInFormSchema.safeParse(Object.fromEntries(formData))
        case 'sign-up':
          return zSignUpFormSchema.safeParse(Object.fromEntries(formData))
        case 'forgot-password':
          return z
            .object({
              email: zEmail,
            })
            .safeParse(Object.fromEntries(formData))
        default:
          return zSignInFormSchema.safeParse(Object.fromEntries(formData))
      }
    }

    const { data, error } = formatTypes()

    if (error) {
      setErrors(
        error.issues.map(
          ({ path, message }) =>
            `${formatFieldName(path?.toString())}: ${message}`
        )
      )
    }

    return data
  }, [])

  const handleSignIn = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      resetMessages()
      setLoading(true)

      try {
        const data = validateFields(event)

        if (!data) {
          setErrors(['Não foi possível fazer login'])
          return
        }

        const authentication = await signIn(
          data as z.infer<typeof zSignInFormSchema>
        )
        saveToLocalStorage(PROFILE_STORAGE_KEY, authentication.data)
        setSuccessMessage('Login realizado com sucesso!')
        push('/')
      } catch (error) {
        console.error(error)
        setErrors(['Não foi possível fazer login'])
      } finally {
        setLoading(false)
      }
    },
    [push, validateFields]
  )

  const handleSignUp = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      resetMessages()
      setLoading(true)

      try {
        const data = validateFields(event)

        if (!data) {
          setErrors(['Não foi possível realizar o cadastro'])
          return
        }

        const registration = await signUp(
          data as z.infer<typeof zSignUpFormSchema>
        )
        saveToLocalStorage(PROFILE_STORAGE_KEY, registration.data)
        setSuccessMessage('Cadastro realizado com sucesso!')
        push('/')
      } catch (error) {
        console.error(error)
        setErrors(['Não foi possível realizar o cadastro'])
      } finally {
        setLoading(false)
      }
    },
    [push, validateFields]
  )

  const handleForgotPassword = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      resetMessages()
      setLoading(true)

      try {
        const data = validateFields(event)

        if (!data) {
          setErrors(['Não foi possível enviar o e-mail'])
          return
        }

        await forgotPassword(data as z.infer<typeof zSignUpFormSchema>)

        setSuccessMessage(
          'Email enviado realizado com sucesso! Verifique sua caixa de entrada.'
        )
      } catch (error) {
        console.error(error)
        setErrors(['Não foi possível enviar o e-mail'])
      } finally {
        setLoading(false)
      }
    },
    [validateFields]
  )

  return {
    loading,
    successMessage,
    errors,
    setErrors,
    setLoading,
    handleSignIn,
    handleSignUp,
    handleForgotPassword,
    resetMessages,
  }
}
