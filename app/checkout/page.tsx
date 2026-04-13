'use client'

import { getCartArray } from "@/util/cart-helpers"

export default function Page() {
  const apiTest = async () => {
    const res = await fetch(`/checkout/api`, { method: "POST", body: JSON.stringify(getCartArray()) })
  }

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={() => apiTest()}>API test</button>
    </div>
  )
}