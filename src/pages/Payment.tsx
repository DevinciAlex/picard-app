import { useState, type FormEvent } from 'react'
import { useCart } from '../context/useCart'
import { useAuth } from '../context/useAuth'
import { createOrder, OrderError } from '../data/orders'

type PaymentErrors = {
  cardNumber?: string
  expirationDate?: string
  form?: string
}

function isValidCardNumber(value: string) {
  const cardNumber = value.replace(/\s/g, '')

  if (!/^\d{13,19}$/.test(cardNumber)) {
    return false
  }

  let sum = 0
  let shouldDouble = false

  for (let index = cardNumber.length - 1; index >= 0; index -= 1) {
    let digit = Number(cardNumber[index])

    if (shouldDouble) {
      digit *= 2

      if (digit > 9) {
        digit -= 9
      }
    }

    sum += digit
    shouldDouble = !shouldDouble
  }

  return sum % 10 === 0
}

function isValidExpirationDate(value: string) {
  if (!/^\d{4}-\d{2}$/.test(value)) {
    return false
  }

  const [year, month] = value.split('-').map(Number)
  const today = new Date()
  const currentYear = today.getFullYear()
  const currentMonth = today.getMonth() + 1

  return year > currentYear || (year === currentYear && month >= currentMonth)
}

function Payment() {
  const { items, clearCart } = useCart()
  const { token, isAuthenticated } = useAuth()
  const [cardNumber, setCardNumber] = useState('')
  const [expirationDate, setExpirationDate] = useState('')
  const [errors, setErrors] = useState<PaymentErrors>({})
  const [paymentValidated, setPaymentValidated] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const nextErrors: PaymentErrors = {}

    if (!isValidCardNumber(cardNumber)) {
      nextErrors.cardNumber = 'Le numéro de carte est invalide.'
    }

    if (!isValidExpirationDate(expirationDate)) {
      nextErrors.expirationDate = "La date d'expiration est invalide."
    }

    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      setPaymentValidated(false)
      return
    }

    if (!token) {
      setErrors({ form: 'Vous devez être connecté pour payer.' })
      return
    }

    try {
      await createOrder(
        token,
        items.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
        })),
        cardNumber,
        expirationDate,
      )
      clearCart()
      setPaymentValidated(true)
    } catch (error) {
      setErrors({
        form:
          error instanceof OrderError
            ? error.message
            : "Impossible de joindre l'API.",
      })
      setPaymentValidated(false)
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="page page--narrow">
        <h1>Paiement</h1>
        <div className="empty-state"><p>Vous devez être connecté pour passer une commande.</p></div>
      </main>
    )
  }

  if (items.length === 0 && !paymentValidated) {
    return (
      <main className="page page--narrow">
        <h1>Paiement</h1>
        <div className="empty-state"><p>Votre panier est vide.</p></div>
      </main>
    )
  }

  return (
    <main className="page page--narrow">
      <header className="page-header">
        <p className="eyebrow">Dernière étape</p>
        <h1>Paiement</h1>
        <p className="page-intro">Vos informations sont vérifiées sans être enregistrées.</p>
      </header>

      {!paymentValidated && <form onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="card-number">Numéro de carte</label>
          <input
            id="card-number"
            name="cardNumber"
            type="text"
            inputMode="numeric"
            autoComplete="cc-number"
            value={cardNumber}
            onChange={(event) => setCardNumber(event.target.value)}
            aria-describedby={errors.cardNumber ? 'card-number-error' : undefined}
            aria-invalid={Boolean(errors.cardNumber)}
            required
          />
          {errors.cardNumber && (
            <p id="card-number-error">{errors.cardNumber}</p>
          )}
        </div>

        <div>
          <label htmlFor="expiration-date">Date d'expiration</label>
          <input
            id="expiration-date"
            name="expirationDate"
            type="month"
            autoComplete="cc-exp"
            value={expirationDate}
            onChange={(event) => setExpirationDate(event.target.value)}
            aria-describedby={
              errors.expirationDate ? 'expiration-date-error' : undefined
            }
            aria-invalid={Boolean(errors.expirationDate)}
            required
          />
          {errors.expirationDate && (
            <p id="expiration-date-error">{errors.expirationDate}</p>
          )}
        </div>

        <button className="button button--primary button--full" type="submit">Valider le paiement</button>
      </form>}

      {errors.form && <p className="feedback feedback--error">{errors.form}</p>}
      {paymentValidated && <p className="feedback feedback--success">Paiement validé.</p>}
    </main>
  )
}

export default Payment
