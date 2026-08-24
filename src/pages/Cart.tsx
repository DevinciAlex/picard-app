import { Link } from 'react-router'
import { useCart } from '../context/useCart'

function Cart() {
  const { items, removeFromCart, clearCart } = useCart()
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  )

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">Votre sélection</p>
        <h1>Panier</h1>
      </header>

      {items.length === 0 ? (
        <div className="empty-state">
          <h2>Votre panier est vide</h2>
          <p>Ajoutez un produit disponible pour commencer votre commande.</p>
          <Link className="button button--primary" to="/products">Voir les produits</Link>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li className="cart-item" key={item.id}>
                <div>
                  <h2>{item.name}</h2>
                  <p>Quantité : {item.quantity} · {item.price.toFixed(2)} € l’unité</p>
                </div>
                <strong>{(item.price * item.quantity).toFixed(2)} €</strong>
                <button className="button button--danger" onClick={() => removeFromCart(item.id)}>
                  Supprimer
                </button>
              </li>
            ))}
          </ul>

          <div className="cart-summary">
            <div>
              <span>Total</span>
              <strong>{total.toFixed(2)} €</strong>
            </div>
            <div className="button-row">
              <button className="button button--secondary" onClick={clearCart}>Vider le panier</button>
              <Link className="button button--primary" to="/payment">Passer au paiement</Link>
            </div>
          </div>
        </>
      )}
    </main>
  )
}

export default Cart
