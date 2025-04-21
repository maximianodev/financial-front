type LoginResponse = {
  message: string
  data: {
    name: string
    email: string
  }
  timestamp: string
}

const BACKEND_URI = 'http://localhost:8080'
const API_USERS = `${BACKEND_URI}/api/users`

const config = {
  headers: {
    'Content-Type': 'application/json',
    credentials: 'include',
  },
}

export const forgotPassword = async (data: {
  email: string
}): Promise<LoginResponse> => {
  return fetch(`${API_USERS}/forgot-password`, {
    method: 'POST',
    credentials: 'include',
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
}

export const signIn = async (data: {
  email: string
  password: string
}): Promise<LoginResponse> => {
  return fetch(`${API_USERS}/sign-in`, {
    method: 'POST',
    credentials: 'include',
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .catch((err) => console.error(err))
}

export const signUp = async (data: {
  email: string
  password: string
}): Promise<LoginResponse> => {
  return fetch(`${API_USERS}/sign-up`, {
    method: 'POST',
    credentials: 'include',
    headers: config.headers,
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .catch((err) => console.error(err))
}

export const authValidate = async (
  cookieAuthToken?: string
): Promise<Response> => {
  return fetch(`${API_USERS}/validate-token`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      ...config.headers,
      Cookie: `Authorization=${cookieAuthToken ?? ''}`,
    },
    body: null,
  })
}
