import { priceToCentsString } from "@/util/general-helpers";
import { cartItem, lineItem } from "@/util/types";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest, res: NextResponse) {
  const stripe = new Stripe(process.env.STRIPE_TOKEN ?? "", { typescript: true })

  const cart: cartItem[] = await req.json()
  // If cart is empty, return error 400
  if (!cart.length) {
    return NextResponse.json({}, { status: 400, statusText: "No cart provided" })
  }
  // If cart does not have a valid item as the first item, return a 400 error
  if (cart[0].product == undefined || cart[0].productType == undefined || cart[0].quantity == undefined) {
    return NextResponse.json({}, { status: 400, statusText: "Invalid cart provided" })
  }

  // Create an array of line items to be used in Stripe checkout session creation
  const lineItemsArr: lineItem[] = []
  cart.map((el) => {
    lineItemsArr.push(
      {
        price_data: {
          currency: "usd",
          unit_amount: priceToCentsString(el.productType.price),
          product_data: { name: el.product.name }
        },
        quantity: el.quantity
      }
    )
  })

  // Create the parameters for the stripe checkout session
  let sessionParams: Stripe.Checkout.SessionCreateParams = {
    submit_type: "pay",
    ui_mode: "hosted_page",
    mode: "payment",
    payment_method_types: ["card"],
    // @ts-ignore
    line_items: lineItemsArr,
    success_url: `${process.env.HOST_ROUTE}/cart/?session_id={CHECKOUT_SESSION_ID}&status=complete`,
    cancel_url: `${process.env.HOST_ROUTE}/cart/?session_id={CHECKOUT_SESSION_ID}&status=canceled`,
  }

  let sessionURL: string = ""

  // Create the checkout session, or return 500
  try {
    const session: Stripe.Checkout.Session = await stripe.checkout.sessions.create(sessionParams)
    sessionURL = session.url ?? "${process.env.HOST_ROUTE}/checkout/redirect-error"
    // return NextResponse.json({ clientSecret: session.client_secret });
  } catch (err) {
    console.log(err)
    return NextResponse.json(err, { status: 500, statusText: String(err) })
  } finally {
    console.log(`returning stripe session url to client`)
    return NextResponse.json(sessionURL)
    // redirect(sessionURL)
  }
}