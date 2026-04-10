import Stripe from "stripe"

export type cartItem = {
  product: Stripe.Product,
  feature: Stripe.Entitlements.Feature,
  price: number,
  quantity: number
}