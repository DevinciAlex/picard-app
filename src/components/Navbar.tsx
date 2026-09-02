import { Link, useNavigate } from 'react-router'
import { useAuth } from '../context/useAuth'
import { useCart } from '../context/useCart'

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth()
  const { items } = useCart()
  const navigate = useNavigate()
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  function handleLogout() {
    logout()
    navigate('/products')
  }

  return (
    <nav className="app-nav" aria-label="Navigation principale">
      <div className="nav-shell">
        <Link className="brand" to="/products" aria-label="Picard">
          <span className="brand-mark">Picard</span>
        </Link>

        <div className="nav-links">
          <Link to="/products">Produits</Link>
          <Link to="/cart">
            Panier <span className="cart-count">{itemCount}</span>
          </Link>
          <Link to="/payment">Paiement</Link>
          <Link to="/loyalty">Fidélité</Link>
          <Link to="/history">Historique</Link>
        </div>

        <div className="nav-account">
          {isAuthenticated && user ? (
            <>
              <span className="user-email">{user.email}</span>
              <button className="button button--ghost" type="button" onClick={handleLogout}>
                Déconnexion
              </button>
            </>
          ) : (
            <Link className="button button--light" to="/login">
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
