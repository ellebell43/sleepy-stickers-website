'use client'

import { cartItem } from "@/util/types"
import { useEffect, useState } from "react"
import CartItem from "@/util/components/cart-item"
import { getCartArray, getCartTotalPrice, getCartTotalQuantity } from "@/util/cart-helpers"
import { priceToString } from "@/util/general-helpers"
import { useSearchParams } from "next/navigation"
import Image from "next/image"

export default function Cart() {
  let [cart, setCart] = useState<cartItem[]>([])
  let [totalQuantity, setTotalQuantity] = useState(0)
  let [totalPrice, setTotalPrice] = useState(0)
  let [APIError, setAPIError] = useState<string>()
  let [status, setStatus] = useState<string | null>(null)
  let [hideNotice, setHideNotice] = useState(false)

  let urlParams = useSearchParams()

  useEffect(() => {
    const status = urlParams.get("status")
    if (status == "complete") {
      localStorage.setItem("cart", JSON.stringify([]))
      setTimeout(() => { setHideNotice(true) }, 10000)
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
      setTimeout(() => { setHideNotice(true) }, 5000)
    }
  }

  return (
    <>
      {/* <h1>Cart!</h1> */}
      {cart.length == 0 ? <>
        <p className="text-xl">Looks like your cart is empty! So here's a fish instead: <Image className="inline" src="/products/32x32-000006.png" alt="" height={32} width={32} />. He doesn't know where anything is, though...</p>
      </> : <>
        {/* Cart contents */}
        <ul id="cart-items" className="max-h-[500px] md:max-h-[800px] border-b-4 overflow-y-scroll">
          {cart.map((el: cartItem, i: number) => <CartItem item={el} key={i} />)}
        </ul>
        {/* Cart breakdown */}
        <p>Total Items: {totalQuantity}</p>
        <p>Total Price: {priceToString(totalPrice)} + tax (calculated at checkout)</p>
        {/* checkout button */}
        <form onSubmit={(e) => { e.preventDefault(); submitCart() }}>
          <button type="submit" className="border-4 block p-6 w-fit mx-auto mt-6 bg-stone-100 dark:bg-stone-800 text-2xl">
            Checkout
          </button>
        </form>
      </>}
      {/* Success message */}
      {APIError ?
        <section id="notification" className={`border-4 bg-red-200 dark:bg-red-800 py-6 px-10 w-fit mx-auto fixed bottom-8  ${hideNotice ? "-left-150" : "left-8"} transition-all duration-1000`}>
          <p className="text-center">{APIError}</p>
        </section> : status == "complete" ?
          <section id="notification" className={`border-4 bg-green-200 dark:bg-green-800 py-6 px-10 w-fit mx-auto fixed bottom-8  ${hideNotice ? "-left-150" : "left-8"} transition-all duration-1000`}>
            <p className="text-center">Payment successful! Thank you for your purchase!</p>
            <p className="text-center">Check your email for a receipt and shipping info.</p>
          </section>
          : <></>}
    </>
  )
}