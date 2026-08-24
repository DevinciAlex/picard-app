const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export type LoyaltyAccount = {
  id: number
  email: string
  points: number
}

export class LoyaltyError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'LoyaltyError'
    this.status = status
  }
}

async function requestLoyaltyAccount(method: 'GET' | 'POST', token: string) {
  const response = await fetch(`${API_URL}/api/loyalty`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new LoyaltyError(
      response.status === 404
        ? 'Aucun compte fidélité.'
        : "Impossible de récupérer le compte fidélité.",
      response.status,
    )
  }

  return (await response.json()) as LoyaltyAccount
}

export function getLoyaltyAccount(token: string) {
  return requestLoyaltyAccount('GET', token)
}

export function createLoyaltyAccount(token: string) {
  return requestLoyaltyAccount('POST', token)
}
