import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { authenticate, LoginError } from '../data/auth'
import { useAuth } from '../context/useAuth'

function Login() {
  const { login, isAuthenticated, user } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const { token } = await authenticate(email, password)
      login(email.trim().toLowerCase(), token)
      setPassword('')
    } catch (caughtError) {
      setError(
        caughtError instanceof LoginError
          ? caughtError.message
          : "Impossible de joindre l'API.",
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isAuthenticated && user) {
    return (
      <main className="page page--narrow">
        <h1>Connexion</h1>
        <div className="info-card"><p>Vous êtes connecté avec <strong>{user.email}</strong>.</p></div>
      </main>
    )
  }

  return (
    <main className="page page--narrow">
      <header className="page-header">
        <p className="eyebrow">Espace personnel</p>
        <h1>Connexion</h1>
        <p className="page-intro">Retrouvez vos commandes et vos avantages fidélité.</p>
      </header>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="login-email">Email</label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="login-password">Mot de passe</label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button className="button button--primary button--full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Connexion…' : 'Se connecter'}
        </button>
      </form>

      {error && <p className="feedback feedback--error">{error}</p>}
      <p className="auth-switch">
        Pas encore de compte ? <Link to="/register">Créer un compte</Link>
      </p>
    </main>
  )
}

export default Login
