import { useState, type ReactNode } from 'react'
import {
  AuthContext,
  type AuthUser,
} from './authContextDefinition'

const TOKEN_STORAGE_KEY = 'picard_auth_token'
const USER_STORAGE_KEY = 'picard_auth_user'

function getStoredToken() {
  return sessionStorage.getItem(TOKEN_STORAGE_KEY)
}

function getStoredUser(): AuthUser | null {
  const storedUser = sessionStorage.getItem(USER_STORAGE_KEY)

  if (!storedUser) {
    return null
  }

  try {
    const user = JSON.parse(storedUser) as Partial<AuthUser>
    return typeof user.email === 'string' ? { email: user.email } : null
  } catch {
    sessionStorage.removeItem(USER_STORAGE_KEY)
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(getStoredToken)
  const [user, setUser] = useState<AuthUser | null>(getStoredUser)

  function login(email: string, nextToken: string) {
    const nextUser = { email }

    sessionStorage.setItem(TOKEN_STORAGE_KEY, nextToken)
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(nextUser))
    setToken(nextToken)
    setUser(nextUser)
  }

  function logout() {
    sessionStorage.removeItem(TOKEN_STORAGE_KEY)
    sessionStorage.removeItem(USER_STORAGE_KEY)
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
