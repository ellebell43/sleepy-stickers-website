'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cartItem, product, productType, productSize } from '../types'
import { addItemToCart, findItemIndex, getCartArray, removeItemFromCart, updateItemQuantity } from '../cart-helpers'
import { DecreaseButton, IncreaseButton } from './buttons'
import { breakupName, priceToString } from '../general-helpers'
import ImageGallery from './image-gallery'

export default function ProductCard(props: { product: product, key: number, variants?: product[] }) {
  const { product, variants } = props
  const [showDetails, setShowDetails] = useState(false)


  const Details = () => {
    // State variables
    const [selectedProductIndex, setSelectedProductIndex] = useState<undefined | number>(undefined)
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(2)
    const [quantity, setQuantity] = useState(1)
    const [itemInCart, setItemInCart] = useState(false)
    const [productTypeIndex, setProductTypeIndex] = useState(2)
    const [price, setPrice] = useState(quantity * Number(product.availableTypes[productTypeIndex].price))

    useEffect(() => {
      let newPrice = quantity * (Number(product.availableTypes[productTypeIndex].price) + product.availableSizes[selectedSizeIndex].price)
      setPrice(newPrice)
    }, [quantity, selectedProductIndex, productTypeIndex, selectedSizeIndex])

    // set selected feature to 2in by default when the detail panel first opens
    useEffect(() => {
      product.availableTypes.map((el: productType, i: number) => { if (el.name == "1.5in sticker") setProductTypeIndex(i) })
    }, [])

    // update quantity based on cart anytime variant or feature changes
    useEffect(() => {
      getCartStorageQuantity()
    }, [selectedProductIndex, productTypeIndex, selectedSizeIndex])

    const getActiveProduct = () => {
      return selectedProductIndex != undefined && variants ? variants[selectedProductIndex] : product
    }

    const getIndex = (): number | undefined => {
      const activeProduct = getActiveProduct()
      const index = findItemIndex(activeProduct.id, activeProduct.availableTypes[productTypeIndex].id, activeProduct.availableSizes[selectedSizeIndex].id)
      return index
    }

    const getSelectedProduct = (): product => {
      return selectedProductIndex != undefined && variants ? variants[selectedProductIndex] : product
    }

    // determine if item is in cart and update displayed quantity accordingly
    const getCartStorageQuantity = () => {
      const cart = getCartArray()
      const index = getIndex()
      if (index != undefined) {
        setQuantity(cart[index].quantity)
        setItemInCart(true)
      } else {
        setQuantity(quantity)
        setItemInCart(false)
      }
    }

    // Component for selecting product variants
    const VariantButton = (props: { src: string, alt: string, variant: boolean, index?: number }) => {
      const { src, alt, variant, index } = props

      const active =
        (selectedProductIndex == undefined && variant == false) ||
        (selectedProductIndex == index);

      return (
        <button onClick={() => setSelectedProductIndex(!variant ? undefined : index)} className={`rounded-full overflow-hidden transition-all border-2 ${active ? "border-stone-800 dark:border-stone-100 shadow-lg" : "border-stone-100 dark:border-stone-800 shadow-none"}`}>
          <Image src={src} alt={alt} width={64} height={64} loading="eager" />
        </button>
      )
    }

    // Add selected product to cart
    const updateCartItem = () => {
      const productSelected: product = selectedProductIndex != undefined && variants ? variants[selectedProductIndex] : product
      const productType = product.availableTypes[productTypeIndex]
      const productSize = product.availableSizes[selectedSizeIndex]
      const item: cartItem = { product: productSelected, productType, size: productSize, quantity }
      const index = findItemIndex(item.product.id, productType.id, productSize.id)

      // if item is in the cart, update quantity
      if (index != undefined) {
        // remove cart item if quantity would update to 0
        if (quantity == 0) {
          removeItemFromCart(index)
        } else {
          updateItemQuantity(index, item.quantity)
        }
        // otherwise add item to the cart
      } else {
        addItemToCart(item)
      }

      setShowDetails(false)
    }

    // ============= BEGIN DETAILS COMPONENT =============

    return (
      // ======== LETTER BOX ========
      <div className='fixed top-0 left-0 w-screen h-screen bg-black/25 dark:bg-white/25 flex items-center justify-center z-50'>
        {/* ======== CONTENT BOX ======== */}
        <div className='bg-white dark:bg-black w-full h-screen md:h-fit md:w-fit md:border-6 relative pt-10 p-4 m:p-18 flex flex-col items-center lg:justify-center lg:flex-row lg:gap-6 overflow-y-scroll overflow-x-hidden'>

          {/* ======== CLOSE BUTTON ======== */}
          <button className='hover:cursor-pointer absolute top-2 right-2' onClick={() => setShowDetails(false)}>
            <Image className='dark:invert' src="/images/x-button.png" alt="close dialog" height={32} width={32} />
          </button>

          {/* ======== PRODUCT CONTENT ======== */}
          <div className='flex flex-col justify-center items-center'>

            {/* Image Gallery */}
            <ImageGallery
              images={[
                `/products/${getSelectedProduct().id}.png`,
                ...getSelectedProduct().images,
                "/products/sticker-size-irl.png",
              ]}
              alts={[
                getSelectedProduct().description,
                ...getSelectedProduct().alts,
                "A water bottle with 3 stickers of a pixel art red panda snoozing on a branch in front of a circular, green background. Each sticker is a different size and there are labels pointing out which is 4 inches, 3 inches, and 2 inches.",
              ]}
              selectedProductIndex={selectedProductIndex} />

            {/* Product name*/}
            {breakupName(getSelectedProduct().name, "min-h-[100px]", "text-center text-4xl")}

            {/* Variation options */}
            <div className='flex justify-center gap-6 px-4 w-fit'>
              {!(variants?.length) ? <></> :
                <VariantButton src={`/products/${product.id}.png`} alt={product.description} variant={false} />
              }
              {variants?.map((el, i) => {
                return (
                  <VariantButton key={i} src={`/products/${el.id}.png`} alt={el.description} variant={true} index={i} />
                )
              })}
            </div>
          </div>

          {/* ======== PRODUCT DETAILS ======== */}
          <div className='flex flex-col items-center justify-center'>
            <p className='max-w-95 mx-auto my-4'>{product.description}</p>

            {/* size options */}
            <div className='flex flex-row-reverse gap-2 mb-4'>
              {product.availableSizes.map((el: productSize, i: number) =>
                <div key={i}>
                  <button
                    aria-pressed={selectedSizeIndex == i}
                    className={`flex items-center justify-center border-4 px-2 py-1 transition-all w-28 h-15 text-xs md:w-30 md:h-20 md:text-md  border-black dark:border-white ${selectedSizeIndex == i ? "shadow-lg bg-accent" : "bg-(--saddle-brown) dark:bg-(--saddle-brown-dark) text-white opacity-80 shadow-none"}`}
                    onClick={() => setSelectedSizeIndex(i)}
                  >
                    {breakupName(el.name, "", "text-sm my-0")}
                  </button>
                  <p className='text-center text-sm opacity-70'>{priceToString(el.price)}</p>
                </div>)}
            </div>

            {/* type options */}
            <div className='flex flex-row-reverse gap-2'>
              {product.availableTypes.map((el: productType, i: number) =>
                <div key={i}>
                  <button
                    aria-pressed={productTypeIndex == i}
                    className={`flex items-center justify-center border-4 px-2 py-1 transition-all w-28 h-15 text-sm md:w-30 md:h-20 md:text-md border-black dark:border-white ${productTypeIndex == i ? "shadow-lg bg-accent" : "bg-(--saddle-brown) dark:bg-(--saddle-brown-dark) text-white opacity-80 shadow-none"}`}
                    onClick={() => setProductTypeIndex(i)}
                  >
                    {breakupName(el.name, "", "text-sm my-0")}
                  </button>
                  <p className='text-center text-sm opacity-70'>{priceToString(el.price)}</p>
                </div>)}
            </div>

            {/* Quantity */}
            <div className={`flex justify-center gap-12 border-4 p-2 mt-4`}>
              <DecreaseButton onDecrease={() => setQuantity(quantity - 1)} canDecrease={quantity > 0} size={16} />
              <p>{quantity}</p>
              <IncreaseButton onIncrease={() => setQuantity(quantity + 1)} canIncrease={quantity < 10} size={16} />
            </div>

            {/* Price */}
            <p className='text-3xl text-center my-4'>{priceToString(price)} USD</p>

            {/* add to cart button */}
            <button
              className="border-4 border-black dark:border-white bg-accent text-lg shadow-lg hover:shadow-none transition-all px-8 py-4 w-75 lg:w-3/4 disabled:opacity-50"
              disabled={quantity == 0 && !itemInCart}
              onClick={() => updateCartItem()}
            >
              {itemInCart && quantity == 0 ? "Remove from cart" : itemInCart ? "Update Item in Cart" : quantity == 0 ? "Add to Cart" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ============= BEGIN PRODUCT CATALOG ITEM =============

  return (
    <>
      <button onClick={() => setShowDetails(!showDetails)} className="hover:cursor-pointer flex flex-col border-4 justify-center items-center h-50 w-40 md:w-45 bg-gray-100 dark:bg-stone-800 shadow-xl">
        <Image src={`/products/${product.id}.png`} alt={product.description} height={128} width={128} className="mb-2" loading="eager" />
        <p className="text-center m-0 relative">{product.name}</p>
      </button>
      {showDetails ? <Details /> : <></>}
    </>
  )
}