import { createContext } from 'react'
import type { Product } from '../data/products'

export type CartItem = Product & {
  quantity: number
}

export type CartContextValue = {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
}

export const CartContext = createContext<CartContextValue | undefined>(undefined)
