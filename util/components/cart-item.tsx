import Image from "next/image"
import { cartItem } from "../types"
import { priceToString } from "../general-helpers"
import { DecreaseButton, IncreaseButton, TrashButton } from "./buttons"
import { findItemIndex, removeItemFromCart, updateItemQuantity } from "../cart-helpers"

export default function CartItem(props: { item: cartItem }) {
  const { item } = props
  const index = findItemIndex(item.product.id, item.feature.id)
  const buttonSize = 20

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
    <div className="border-b-4 border-stone-200 dark:border-stone-600 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Image src={item.product.images[0]} alt={item.product.description ? item.product.description : item.product.name} height={32} width={32} loading="eager" />
          <p>{item.product.name} | {item.feature.name}</p>
        </div>
        <p className="leading-none m-0 text-lg my-0">{priceToString(item.quantity * Number(item.feature.metadata.cost))}</p>
      </div>
      <div className="flex justify-between">
        {/* Increase/Decrease/Remove buttons */}
        <div className="flex gap-4">
          <IncreaseButton canIncrease={item.quantity < 10} onIncrease={() => incrementQuantity(1)} size={buttonSize} />
          <DecreaseButton canDecrease={item.quantity > 0} onDecrease={() => incrementQuantity(-1)} size={buttonSize} />
          <TrashButton canTrash={true} onTrash={() => removeItem()} size={buttonSize} />
        </div>
        <p className="leading-none m-0 my-0 opacity-70">{item.quantity} x {priceToString(Number(item.feature.metadata.cost))}</p>
      </div>
    </div>
  )
}