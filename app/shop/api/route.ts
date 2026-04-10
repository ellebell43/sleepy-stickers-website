import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export type ResponseData = {
  message: string
  products: Stripe.Product[]
  features: Stripe.Entitlements.Feature[]
}

export async function GET(req: NextRequest) {
  const token = process.env.STRIPE_TOKEN

  if (!token) {
    return NextResponse.json({ message: "no stripe token found", products: [] }, { status: 401 })
  }

  const stripe = new Stripe(token)
  const products = await stripe.products.list()
  const features = await stripe.entitlements.features.list()
  return NextResponse.json({ message: 'success', products: products.data, features: features.data })
}