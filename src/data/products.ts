export type Product = {
  id: number
  name: string
  image: string
  description: string
  price: number
  rating: number | null
  available: boolean
}

const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

type ProductCollection =
  | Product[]
  | { member: Product[] }
  | { 'hydra:member': Product[] }

export async function getProducts(): Promise<Product[]> {
  const response = await fetch(`${API_URL}/api/products`, {
    headers: {
      Accept: 'application/ld+json',
    },
  })

  if (!response.ok) {
    throw new Error('Impossible de récupérer les produits.')
  }

  const data = (await response.json()) as ProductCollection

  if (Array.isArray(data)) {
    return data
  }

  if ('member' in data) {
    return data.member
  }

  return data['hydra:member']
}
