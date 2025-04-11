export const loginForm = {
  login: [
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
  signup: [
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
  forgotPassword: [
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
