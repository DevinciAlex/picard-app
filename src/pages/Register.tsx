import { useState, type FormEvent } from 'react'
import { Link } from 'react-router'
import { register, RegistrationError } from '../data/auth'

function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [message, setMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setErrors({})
    setMessage('')
    setIsSubmitting(true)

    try {
      const user = await register(email, password)
      setMessage(`Compte créé pour ${user.email}.`)
      setEmail('')
      setPassword('')
    } catch (error) {
      if (error instanceof RegistrationError) {
        setErrors({ ...error.fieldErrors, form: error.message })
      } else {
        setErrors({ form: "Impossible de joindre l'API." })
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="page page--narrow">
      <header className="page-header">
        <p className="eyebrow">Bienvenue</p>
        <h1>Créer un compte</h1>
        <p className="page-intro">Commandez, cumulez des points et consultez votre historique.</p>
      </header>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="register-email">Email</label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            aria-describedby={errors.email ? 'register-email-error' : undefined}
            aria-invalid={Boolean(errors.email)}
            required
          />
          {errors.email && <p id="register-email-error">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="register-password">Mot de passe</label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            aria-describedby={
              errors.password ? 'register-password-error' : undefined
            }
            aria-invalid={Boolean(errors.password)}
            required
          />
          {errors.password && (
            <p id="register-password-error">{errors.password}</p>
          )}
        </div>

        <button className="button button--primary button--full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Création…' : 'Créer le compte'}
        </button>
      </form>

      {errors.form && <p className="feedback feedback--error">{errors.form}</p>}
      {message && <p className="feedback feedback--success">{message}</p>}
      <p className="auth-switch">
        Vous avez déjà un compte ? <Link to="/login">Se connecter</Link>
      </p>
    </main>
  )
}

export default Register
