const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

type RegisterResponse = {
  id: number
  email: string
}

type LoginResponse = {
  token: string
}

type ApiErrorResponse = {
  message?: string
  errors?: Record<string, string>
}

export class RegistrationError extends Error {
  fieldErrors: Record<string, string>

  constructor(message: string, fieldErrors: Record<string, string> = {}) {
    super(message)
    this.name = 'RegistrationError'
    this.fieldErrors = fieldErrors
  }
}

export class LoginError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'LoginError'
  }
}

export async function register(
  email: string,
  password: string,
): Promise<RegisterResponse> {
  const response = await fetch(`${API_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  const data = (await response.json()) as RegisterResponse & ApiErrorResponse

  if (!response.ok) {
    throw new RegistrationError(
      data.message ?? "L'inscription a échoué.",
      data.errors,
    )
  }

  return data
}

export async function authenticate(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new LoginError('Email ou mot de passe incorrect.')
  }

  const data = (await response.json()) as Partial<LoginResponse>

  if (!data.token) {
    throw new LoginError("L'API n'a pas retourné de jeton.")
  }

  return { token: data.token }
}
