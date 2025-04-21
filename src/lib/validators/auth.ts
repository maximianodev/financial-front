import { z } from 'zod'

export const zName = z
  .string()
  .min(3, { message: 'Deve ter pelo menos 3 caracteres.' })
  .max(50, { message: 'Deve ter no máximo 50 caracteres.' })

export const zEmail = z
  .string()
  .email({ message: 'Por favor, insira um e-mail válido.' })
  .trim()

export const zPassword = z
  .string()
  .min(8, { message: 'Deve ter pelo menos 8 caracteres.' })
  .regex(/[a-zA-Z]/, { message: 'Deve conter ao menos uma letra.' })
  .regex(/[0-9]/, { message: 'Deve conter ao menos um número.' })
  .regex(/[^a-zA-Z0-9]/, {
    message: 'Deve conter ao menos um caractere especial.',
  })
  .trim()

export const zSignInFormSchema = z.object({
  email: zEmail,
  password: zPassword,
})

export const zSignUpFormSchema = z
  .object({
    name: zName,
    email: zEmail,
    password: zPassword,
  })

