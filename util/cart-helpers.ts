import { cartItem } from "./types"

export function getCartArray(): cartItem[] {
  const cartStorage = localStorage.getItem("cart")
  if (cartStorage == null) return []
  return JSON.parse(cartStorage)
}

export function replaceCartStorage(newCart: cartItem[]) {
  localStorage.setItem("cart", JSON.stringify(newCart))
  window.dispatchEvent(new Event("storage"))
}

export function updateItemQuantity(index: number, newQuantity: number, otherCart?: cartItem[]) {
  let cart = otherCart ? otherCart : getCartArray()
  cart[index].quantity = newQuantity
  replaceCartStorage(cart)
  window.dispatchEvent(new Event("storage"))
}

export function getCartTotalQuantity(otherCart?: cartItem[]): number {
  let cart = otherCart ? otherCart : getCartArray()
  let quantity = 0
  cart.map((el) => quantity += el.quantity)
  return quantity
}

export function getCartTotalPrice(otherCart?: cartItem[]): number {
  let cart = otherCart ? otherCart : getCartArray()
  let price = 0
  cart.map((el) => price += Number(el.productType.price * el.quantity))
  return price
}

export function addItemToCart(item: cartItem, otherCart?: cartItem[]) {
  let cart = otherCart ? otherCart : getCartArray()
  cart.push(item)
  replaceCartStorage(cart)
  window.dispatchEvent(new Event("storage"))

}

export function removeItemFromCart(index: number, otherCart?: cartItem[]) {
  let cart = otherCart ? otherCart : getCartArray()
  cart.splice(index, 1)
  replaceCartStorage(cart)
  window.dispatchEvent(new Event("storage"))
}

export function findItemIndex(productID: string, typeID: string, otherCart?: cartItem[]): number | undefined {
  let cart = otherCart ? otherCart : getCartArray()
  let index: number | undefined = undefined
  cart.map((el: cartItem, i: number) => {
    if (el.product.id == productID && el.productType.id == typeID) {
      index = i
    }
  })
  return index
}