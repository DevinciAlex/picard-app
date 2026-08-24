import { useEffect, useState } from 'react'
import { useAuth } from '../context/useAuth'
import { getOrders, type OrderSummary } from '../data/orders'

function History() {
  const { token, isAuthenticated } = useAuth()
  const [orders, setOrders] = useState<OrderSummary[]>([])
  const [isLoading, setIsLoading] = useState(Boolean(token))
  const [error, setError] = useState('')
  const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null)

  useEffect(() => {
    if (!token) {
      return
    }

    getOrders(token)
      .then(setOrders)
      .catch(() => setError("Impossible de charger l'historique."))
      .finally(() => setIsLoading(false))
  }, [token])

  if (!isAuthenticated) {
    return (
      <main className="page">
        <h1>Historique des commandes</h1>
        <div className="empty-state"><p>Vous devez être connecté pour consulter votre historique.</p></div>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="page">
        <h1>Historique des commandes</h1>
        <p>Chargement…</p>
      </main>
    )
  }

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Vos achats</p>
        <h1>Historique des commandes</h1>
      </header>

      {orders.length === 0 ? (
        <div className="empty-state"><p>Aucune commande pour le moment.</p></div>
      ) : (
        <ul className="history-list">
          {orders.map((order) => (
            <li className="history-item" key={order.id}>
              <button
                className="history-toggle"
                type="button"
                aria-expanded={expandedOrderId === order.id}
                onClick={() =>
                  setExpandedOrderId((currentId) =>
                    currentId === order.id ? null : order.id,
                  )
                }
              >
                <div>
                  <span>Commande #{order.id}</span>
                  <p>{new Date(order.date).toLocaleString('fr-FR')}</p>
                </div>
                <strong>{order.total.toFixed(2)} €</strong>
                <span className="status-badge">
                  {order.status === 'paid' ? 'Payée' : order.status}
                </span>
                <span className="history-action">
                  {expandedOrderId === order.id ? 'Masquer' : 'Voir le détail'}
                </span>
              </button>

              {expandedOrderId === order.id && (
                <ul className="order-details">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      <div>
                        <strong>{item.productName}</strong>
                        <span>
                          {item.quantity} × {item.unitPrice.toFixed(2)} €
                        </span>
                      </div>
                      <strong>{item.subtotal.toFixed(2)} €</strong>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="feedback feedback--error">{error}</p>}
    </main>
  )
}

export default History
