'use client'

import { cartItem } from "@/util/types"
import { useEffect, useState } from "react"
import CartItem from "@/util/components/cart-item"
import { getCartArray, getCartTotalPrice, getCartTotalQuantity } from "@/util/cart-helpers"
import { priceToString } from "@/util/general-helpers"
import Link from "next/link"

export default function Page() {
  let [cart, setCart] = useState<cartItem[]>(getCartArray())
  let [totalQuantity, setTotalQuantity] = useState(getCartTotalQuantity())
  let [totalPrice, setTotalPrice] = useState(getCartTotalPrice())

  useEffect(() => {
    const listenStorageChange = () => {
      setTotalQuantity(getCartTotalQuantity())
      setTotalPrice(getCartTotalPrice())
      setCart(getCartArray())
    }
    window.addEventListener("storage", listenStorageChange)
    return () => window.removeEventListener("storage", listenStorageChange)
  }, [])

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
        <Link href="/checkout" className="border-4 block p-6 w-fit mx-auto bg-stone-100 dark:bg-stone-800 text-4xl">Checkout</Link>
      </>}
    </div>
  )
}