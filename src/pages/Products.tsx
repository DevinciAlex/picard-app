import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import { getProducts, type Product } from '../data/products'

function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch(() => setError('Impossible de charger les produits.'))
      .finally(() => setIsLoading(false))
  }, [])

  return (
    <main className="page page--wide">
      <header className="page-header page-header--hero">
        <p className="eyebrow">Produits disponibles</p>
        <h1>Pour le bon et le meilleur.</h1>
        <p className="page-intro">
          Découvrez les produits disponibles et préparez votre commande en quelques clics.
        </p>
      </header>
      {isLoading && <div className="empty-state"><p>Chargement des produits…</p></div>}
      {error && <p className="feedback feedback--error">{error}</p>}
      {!isLoading && !error && (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}

export default Products
