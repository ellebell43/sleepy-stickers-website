import Image from "next/image"
import { cartItem } from "../types"
import { breakupName, priceToString } from "../general-helpers"
import { DecreaseButton, IncreaseButton, TrashButton } from "./buttons"
import { findItemIndex, removeItemFromCart, updateItemQuantity } from "../cart-helpers"

export default function CartItem(props: { item: cartItem }) {
  const { item } = props
  const index = findItemIndex(item.product.id, item.productType.id)
  const buttonSize = 16

  function removeItem() {
    if (index != undefined) removeItemFromCart(index)
  }

  function incrementQuantity(increment: number) {
    if (index != undefined) {
      if (item.quantity + increment == 0) {
        removeItem()
      } else {
        updateItemQuantity(index, item.quantity + increment)
      }
    }
  }

  return (
    <li className="border-b-4 border-stone-200 dark:border-stone-600 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Product image */}
          <Image src={`/products/${item.product.id}.png`} alt={item.product.description} height={64} width={64} loading="eager" />
          {/* Product type and name */}
          <div>
            <p>{item.productType.name}</p>
            {breakupName(item.product.name, "", "text-xs leading-none")}
          </div>
        </div>
      </div>
      <div className="flex justify-between">
        {/* Increase/Decrease/Remove buttons */}
        <div className="flex gap-4 justify-center items-center">
          <IncreaseButton canIncrease={item.quantity < 10} onIncrease={() => incrementQuantity(1)} size={buttonSize} />
          {/* <p id="item quantity" className="text-2xl">{item.quantity}</p> */}
          <DecreaseButton canDecrease={item.quantity > 0} onDecrease={() => incrementQuantity(-1)} size={buttonSize} />
          <TrashButton canTrash={true} onTrash={() => removeItem()} size={buttonSize} />
        </div>
        {/* Price and Breakdown */}
        <div className="flex flex-col">
          <p className="leading-none m-0 text-lg my-0">{priceToString(item.quantity * item.productType.price)}</p>
          <p className="leading-none m-0 my-0 text-xs opacity-70">{item.quantity} x {priceToString(item.productType.price)}</p>
        </div>
      </div>
    </li>
  )
}