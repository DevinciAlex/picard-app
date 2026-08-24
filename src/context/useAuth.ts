import { useContext } from 'react'
import { AuthContext } from './authContextDefinition'

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth doit être utilisé dans un AuthProvider')
  }

  return context
}
