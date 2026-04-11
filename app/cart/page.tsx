'use client'

import { cartItem } from "@/util/types"
import { useEffect, useState } from "react"
import Image from "next/image"

export default function Page() {
  let [cart, setCart] = useState<cartItem[]>([])
  let [totalQuantity, setTotalQuantity] = useState(0)
  let [totalPrice, setTotalPrice] = useState(0)

  useEffect(() => {
    let cartStorage = localStorage.getItem('cart')
    let localCart: cartItem[] = []
    if (cartStorage != null) {
      setCart(JSON.parse(cartStorage))
      localCart = JSON.parse(cartStorage)
    }

    let quantity = 0
    let price = 0
    localCart.map((el) => {
      quantity += el.quantity
      price += el.price
    })
    setTotalQuantity(quantity)
    setTotalPrice(price)
  }, [])

  return (
    <div>
      <h1>Cart!</h1>
      {cart.length == 0 ? <>
        <p>No items in cart!</p>
      </> : <>
        {cart.map((el: cartItem, i: number) => {
          return (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <Image src={el.product.images[0]} alt={el.product.description ? el.product.description : el.product.name} height={32} width={32} loading="eager" />
                <p>{el.product.name}, {el.feature.name}</p>
              </div>
              <div className="flex items-center gap-6">
                <p>{el.quantity} x {el.price / el.quantity}</p>
                <p>{el.price}</p>
              </div>
            </div>
          )
        })}
        <p>Total Items: {totalQuantity}</p>
        <p>Total Price: ${totalPrice}.00 + tax (calculated at checkout)</p>
      </>}
    </div>
  )
}