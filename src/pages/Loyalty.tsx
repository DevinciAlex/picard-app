import { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth'
import {
  createLoyaltyAccount,
  getLoyaltyAccount,
  LoyaltyError,
  type LoyaltyAccount,
} from '../data/loyalty'

function Loyalty() {
  const { token, isAuthenticated } = useAuth()
  const [account, setAccount] = useState<LoyaltyAccount | null>(null)
  const [accountExists, setAccountExists] = useState(true)
  const [isLoading, setIsLoading] = useState(Boolean(token))
  const [error, setError] = useState('')

  useEffect(() => {
    if (!token) {
      return
    }

    getLoyaltyAccount(token)
      .then((loyaltyAccount) => {
        setAccount(loyaltyAccount)
        setAccountExists(true)
      })
      .catch((caughtError: unknown) => {
        if (caughtError instanceof LoyaltyError && caughtError.status === 404) {
          setAccountExists(false)
        } else {
          setError('Impossible de charger le compte fidélité.')
        }
      })
      .finally(() => setIsLoading(false))
  }, [token])

  async function handleCreateAccount() {
    if (!token) {
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const loyaltyAccount = await createLoyaltyAccount(token)
      setAccount(loyaltyAccount)
      setAccountExists(true)
    } catch {
      setError('Impossible de créer le compte fidélité.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="page page--narrow">
        <h1>Fidélité</h1>
        <div className="empty-state"><p>Vous devez être connecté pour accéder à votre compte fidélité.</p></div>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="page page--narrow">
        <h1>Fidélité</h1>
        <p>Chargement…</p>
      </main>
    )
  }

  return (
    <main className="page page--narrow">
      <header className="page-header">
        <p className="eyebrow">Vos avantages</p>
        <h1>Fidélité</h1>
      </header>

      {account ? (
        <div className="loyalty-card">
          <p className="loyalty-label">Solde disponible</p>
          <strong>{account.points} <span>point(s)</span></strong>
          <p>{account.email}</p>
          <small>Chaque euro dépensé rapporte un point.</small>
        </div>
      ) : (
        !accountExists && (
          <div className="empty-state">
            <p>Vous ne possédez pas encore de compte fidélité.</p>
            <button className="button button--primary" onClick={handleCreateAccount}>
              Créer mon compte fidélité
            </button>
          </div>
        )
      )}

      {error && <p className="feedback feedback--error">{error}</p>}
    </main>
  )
}

export default Loyalty
