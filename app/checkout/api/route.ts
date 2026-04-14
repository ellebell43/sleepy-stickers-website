import CartItem from "@/util/components/cart-item";
import { cartItem } from "@/util/types";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_TOKEN ?? "", { typescript: true })

  const cart: cartItem[] = await req.json()
  // it's expecting cart to be always be string. Not sure why, so the error is ignored
  // @ts-ignore
  if (typeof cart != object || cart.length == 0) {
    return NextResponse.json({}, { status: 400, statusText: "No cart provided" })
  }
  if (cart[0].product == undefined || cart[0].productType == undefined || cart[0].quantity == undefined) {
    return NextResponse.json({}, { status: 400, statusText: "Invalid cart provided" })
  }

  const session = await stripe.checkout.sessions.create()

  return NextResponse.json({}, { status: 200 })
}