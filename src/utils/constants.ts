export const authForm = {
  'sign-in': [
    {
      label: 'E-mail',
      placeholder: 'E-mail',
      name: 'email',
      type: 'email',
      id: 'email',
      required: true,
    },
    {
      label: 'Senha',
      placeholder: 'Senha',
      name: 'password',
      type: 'password',
      id: 'password',
      required: true,
    },
  ],
  'sign-up': [
    {
      label: 'Nome',
      placeholder: 'Nome',
      name: 'name',
      type: 'text',
      id: 'name',
      required: true,
    },
    {
      label: 'E-mail',
      placeholder: 'E-mail',
      name: 'email',
      type: 'email',
      id: 'email',
      required: true,
    },
    {
      label: 'Senha',
      placeholder: 'Senha',
      name: 'password',
      type: 'password',
      id: 'password',
      required: true,
    },
  ],
  'forgot-password': [
    {
      label: 'E-mail',
      placeholder: 'E-mail',
      name: 'email',
      type: 'email',
      id: 'email',
      required: true,
    },
  ],
}

export const PROFILE_STORAGE_KEY = 'financial@userData'
