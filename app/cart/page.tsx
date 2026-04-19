'use client'

import { cartItem } from "@/util/types"
import { useEffect, useState } from "react"
import CartItem from "@/util/components/cart-item"
import { getCartArray, getCartTotalPrice, getCartTotalQuantity } from "@/util/cart-helpers"
import { priceToString } from "@/util/general-helpers"
import { useSearchParams } from "next/navigation"

export default function Page() {
  let [cart, setCart] = useState<cartItem[]>([])
  let [totalQuantity, setTotalQuantity] = useState(0)
  let [totalPrice, setTotalPrice] = useState(0)
  let [APIError, setAPIError] = useState<string>()
  let [status, setStatus] = useState<string | null>(null)

  let urlParams = useSearchParams()

  useEffect(() => {
    const status = urlParams.get("status")
    if (status == "complete") {
      localStorage.setItem("cart", JSON.stringify([]))
    } else {
      setTotalPrice(getCartTotalPrice())
      setTotalQuantity(getCartTotalQuantity())
      setCart(getCartArray())
      // TO DO: Email the customer a receipt if Stripe doesn't do that automatically.
    }
    setStatus(status)
    const listenStorageChange = () => {
      setTotalQuantity(getCartTotalQuantity())
      setTotalPrice(getCartTotalPrice())
      setCart(getCartArray())
    }
    window.addEventListener("storage", listenStorageChange)
    return () => window.removeEventListener("storage", listenStorageChange)
  }, [])

  const submitCart = async () => {
    const res = await fetch("/cart/api", {
      method: "POST",
      body: localStorage.getItem("cart"),
    })
    if (res.status == 200) {
      const data: string = await res.json()
      window.location.replace(data)
    } else {
      setAPIError(`Error ${res.status}: ${res.statusText}`)
    }
  }

  return (
    <div>
      <h1>Cart!</h1>
      {cart.length == 0 ? <>
        <p>No items in cart!</p>
      </> : <>
        <div className="">
          {cart.map((el: cartItem, i: number) => <CartItem item={el} key={i} />)}
        </div>
        <p>Total Items: {totalQuantity}</p>
        <p>Total Price: {priceToString(totalPrice)} + tax (calculated at checkout)</p>
        <form onSubmit={(e) => { e.preventDefault(); submitCart() }}>
          <button type="submit" className="border-4 block p-6 w-fit mx-auto bg-stone-100 dark:bg-stone-800 text-4xl">
            Checkout with Stripe
          </button>
        </form>
      </>}
      {APIError ?
        <div className="border-4 bg-red-400 dark:bg-red-800 py-6 px-10 w-fit mx-auto">
          <p className="text-center">{APIError}</p>
        </div> : status == "complete" ?
          <div className="border-4 bg-green-400 dark:bg-green-800 py-6 px-10 w-fit mx-auto">
            <p className="text-center">Payment successful! Thank you for your purchase!</p>
            <p className="text-center">Check your email for a receipt and shipping info.</p>
          </div>
          : <></>}
    </div>
  )
}