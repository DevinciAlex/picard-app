const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8000'

export type OrderSummary = {
  id: number
  date: string
  total: number
  status: 'paid'
  items: OrderItemSummary[]
}

export type OrderItemSummary = {
  id: number
  productName: string
  unitPrice: number
  quantity: number
  subtotal: number
}

type CreateOrderResponse = OrderSummary & {
  pointsEarned: number
}

type OrderRequestItem = {
  productId: number
  quantity: number
}

export class OrderError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'OrderError'
  }
}

async function getErrorMessage(response: Response) {
  try {
    const data = (await response.json()) as { message?: string }
    return data.message ?? 'La commande a échoué.'
  } catch {
    return 'La commande a échoué.'
  }
}

export async function createOrder(
  token: string,
  items: OrderRequestItem[],
  cardNumber: string,
  expirationDate: string,
): Promise<CreateOrderResponse> {
  const response = await fetch(`${API_URL}/api/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items, cardNumber, expirationDate }),
  })

  if (!response.ok) {
    throw new OrderError(await getErrorMessage(response))
  }

  return (await response.json()) as CreateOrderResponse
}

export async function getOrders(token: string): Promise<OrderSummary[]> {
  const response = await fetch(`${API_URL}/api/orders`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (!response.ok) {
    throw new OrderError("Impossible de récupérer l'historique.")
  }

  return (await response.json()) as OrderSummary[]
}
