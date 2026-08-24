import type { Product } from '../data/products'
import { useCart } from '../context/useCart'

type ProductCardProps = {
  product: Product
}

function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart()

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={product.image} alt={product.name} />
        <span className={`availability ${product.available ? '' : 'availability--off'}`}>
          {product.available ? 'Disponible' : 'Indisponible'}
        </span>
      </div>

      <div className="product-content">
        <div>
          <h2>{product.name}</h2>
          <p className="product-description">{product.description}</p>
        </div>

        <div className="product-meta">
          {product.rating !== null && <span>★ {product.rating}/5</span>}
          <strong>{product.price.toFixed(2)} €</strong>
        </div>

        <button
          className="button button--primary"
          disabled={!product.available}
          onClick={() => addToCart(product)}
        >
          {product.available ? 'Ajouter au panier' : 'Indisponible'}
        </button>
      </div>
    </article>
  )
}

export default ProductCard
