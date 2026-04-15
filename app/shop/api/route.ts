import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export type responseData = {
  products: Stripe.Product[]
  prices: Stripe.Price[]
}

export async function GET(req: NextRequest): Promise<NextResponse<responseData>> {
  // Stripe connection token
  const token = process.env.STRIPE_TOKEN

  // Return 401 if no token is found to create Stripe connection
  if (token == undefined) {
    return NextResponse.json({ products: [], prices: [] }, { status: 401, statusText: "Unauthorized. No Stripe token found for authentication." })
  } else {
    try {
      // Get all products and prices from Stripe and return it to the client
      const stripe = new Stripe(token)
      const products = await stripe.products.list()
      const prices = await stripe.prices.list()
      return NextResponse.json({ products: products.data, prices: prices.data })
    } catch (err) {
      // Error 500 if something goes wrong retrieving Stripe data
      return NextResponse.json({ products: [], prices: [] }, { status: 500, statusText: String(err) })
    }
  }
}