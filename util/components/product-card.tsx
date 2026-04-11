'use client'

import Stripe from 'stripe'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { cartItem } from '../types'

export default function ProductCard(props: { product: Stripe.Product, key: number, variants?: Stripe.Product[], features: Stripe.Entitlements.Feature[] }) {
  const { product, key, variants, features } = props
  const [showDetails, setShowDetails] = useState(false)


  const Details = () => {
    // State variables
    const [selectedVariant, setSelectedVariant] = useState<undefined | number>(undefined)
    const [price, setPrice] = useState(2)
    const [quantity, setQuantity] = useState(0)
    const [itemInCart, setItemInCart] = useState(false)
    const [selectedFeature, setSelectedFeature] = useState(2)

    // set selected feature to 1.5in by default when the detail panel first opens
    useEffect(() => {
      features.map((el: Stripe.Entitlements.Feature, i: number) => { if (el.name == "1.5in") setSelectedFeature(i) })
    }, [])

    // update price anytime selected feature changes
    useEffect(() => {
      if (features[selectedFeature].metadata.cost) {
        setPrice(Number(features[selectedFeature].metadata.cost))
      }
    }, [selectedFeature])

    // update quantity based on cart anytime variant or feature changes
    useEffect(() => {
      getCartStorageQuantity()
    }, [selectedVariant, selectedFeature])

    // determine if item is in cart and update quantity accordingly
    const getCartStorageQuantity = () => {
      if (localStorage.getItem("cart")) {
        // @ts-ignore
        const cart: cartItem[] = JSON.parse(localStorage.getItem("cart"))
        const activeProduct = selectedVariant && variants ? variants[selectedVariant] : product
        let matchFound = false
        cart.map((el) => {
          if (el.product.id == activeProduct.id && el.feature.id == features[selectedFeature].id) {
            setQuantity(el.quantity)
            setItemInCart(true)
            matchFound = true
          }
        })
        if (!matchFound) {
          setQuantity(0);
          setItemInCart(false)
          console.log()
        }
      }
    }

    // Determine image used in details panel
    const determineImage = () => {
      if (selectedVariant == undefined) return product.images[0]
      else if (variants) return variants[selectedVariant].images[0]
      else return "/images/not-found.png"
    }

    // Determine alt text used in details panel
    const determineAlt = () => {
      if (selectedVariant == undefined) return product.description ? product.description : product.name
      else if (variants) return variants[selectedVariant].description ? variants[selectedVariant].description : variants[selectedVariant].name
      else return "hm. something went wrong and the image wasn't found. please email me at hello@sleepystickers.art so I can fix it!"
    }

    // Determine name used in details panel
    const determineName = () => {
      let name: string
      if (selectedVariant == undefined) name = product.name
      else if (variants) name = variants[selectedVariant].name
      else return <p>hm. something went wrong and the image wasn't found. please email me at hello@sleepystickers.art so I can fix it!</p>

      const names = name.split(" - ")
      return <div className='min-h-[100px]'>
        {names.map((el, i) => <p className='text-center text-4xl' key={i}>{el}</p>)}
      </div>
    }

    // Component for selecting product variants
    const VariantButton = (props: { src: string, alt: string, variant: boolean, index?: number }) => {
      const { src, alt, variant, index } = props

      const active =
        (selectedVariant == undefined && variant == false) ||
        (selectedVariant == index);

      return (
        <button onClick={() => setSelectedVariant(!variant ? undefined : index)} className={`rounded-full transition-all border-2 ${active ? "border-stone-800 dark:border-stone-100 shadow-lg" : "border-stone-100 dark:border-stone-800 shadow-none"}`}>
          <Image src={src} alt={alt} width={64} height={64} loading="eager" />
        </button>
      )
    }

    // Add selected product to cart
    const addToCart = () => {
      const cartProduct: Stripe.Product = selectedVariant != undefined && variants ? variants[selectedVariant] : product
      const feature = features[selectedFeature]

      // if item is already in cart, update the quantity of existing cart item
      if (itemInCart) {
        if (localStorage.getItem("cart")) {
          // @ts-ignore
          let cart: cartItem[] = JSON.parse(localStorage.getItem("cart"))
          let indexToRemove: number
          cart.map((el: cartItem, i: number) => {
            if (el.product.id == cartProduct.id && el.feature.id == feature.id) {
              if (quantity == 0) {
                indexToRemove = i
              } else {
                el.quantity = quantity
              }
            }
            if (indexToRemove != undefined) {
              cart.splice(indexToRemove, 1)
            }
          })
          localStorage.setItem("cart", JSON.stringify(cart))
        }
        // if item isn't in cart, create cart if need and add to cart
      } else {
        const item: cartItem = { product: cartProduct, feature, price, quantity }
        let cartStorage = localStorage.getItem("cart")
        if (!cartStorage) {
          let cart: cartItem[] = [item]
          localStorage.setItem("cart", JSON.stringify(cart))
        } else {
          let cart: cartItem[] = JSON.parse(cartStorage)
          cart.push(item)
          localStorage.setItem("cart", JSON.stringify(cart))
        }
      }

      // dispatch event to update cart quantity in header and close details panel
      window.dispatchEvent(new Event("storage"))
      setShowDetails(false)
    }

    // ============= BEGIN DETAILS COMPONENT =============

    return (
      // ======== LETTER BOX ========
      <div className='fixed top-0 left-0 w-screen h-screen bg-black/25 dark:bg-white/25 flex items-center justify-center z-50'>
        {/* ======== CONTENT BOX ======== */}
        <div className='bg-white dark:bg-black w-screen md:w-fit h-screen md:h-fit md:fit border-6 relative pt-10 p-4 m:p-18 flex flex-col items-center justify-center lg:flex-row lg:gap-6'>

          {/* ======== CLOSE BUTTON ======== */}
          <button className='hover:cursor-pointer absolute top-2 right-2' onClick={() => setShowDetails(false)}>
            <Image className='dark:invert' src="/images/x-button.png" alt="close dialog" height={32} width={32} />
          </button>

          {/* ======== PRODUCT CONTENT ======== */}
          <div className='flex flex-col justify-center items-center'>

            {/* Big image */}
            <Image src={determineImage()} alt={determineAlt()} height={256} width={256} className="mb-4 mx-auto" loading="eager" />

            {/* Product name*/}
            {determineName()}

            {/* Variation options */}
            <div className='flex justify-center gap-6 px-4 w-fit'>
              {!(variants?.length) ? <></> :
                <VariantButton src={product.images[0]} alt={product.description ? product.description : product.name} variant={false} />
              }
              {variants?.map((el, i) => {
                return (
                  <VariantButton key={i} src={el.images[0]} alt={el.description ? el.description : el.name} variant={true} index={i} />
                )
              })}
            </div>
          </div>

          {/* ======== PRODUCT FEATURES ======== */}
          <div className='flex flex-col items-center justify-center'>
            <p className='max-w-xs mx-auto my-4'>{product.description}</p>

            {/* size options */}
            <div className='flex flex-row-reverse gap-2'>
              {features.map((el: Stripe.Entitlements.Feature, i: number) =>
                <div key={i}>
                  <button aria-pressed={selectedFeature == i} className={`border-4 px-4 py-2 transition-all ${selectedFeature == i ? "shadow-lg" : "bg-gray-300 dark:bg-gray-600 shadow-none"}`} onClick={() => setSelectedFeature(i)}>
                    <p>{el.name}</p>
                  </button>
                  <p className='text-center text-sm opacity-70'>${el.metadata.cost}.00</p>
                </div>)}
            </div>

            {/* Quantity */}
            <div className={`flex justify-center gap-12 border-4 p-2 mt-4`}>
              <button
                className={`${quantity == 1 ? "opacity-30" : ""}`}
                onClick={() => {
                  if (quantity > 0) setQuantity(quantity - 1)
                }}
              >
                <Image src="/images/minus.png" alt="minus symbol" width={16} height={16} />
              </button>
              <p>{quantity}</p>
              <button
                className={`${quantity == 10 ? "opacity-30" : ""}`}
                onClick={() => {
                  if (quantity <= 10) setQuantity(quantity + 1)
                }}
              >
                <Image src="/images/plus.png" alt="plus symbol" width={16} height={16} />
              </button>
            </div>

            {/* Price */}
            <p className='text-3xl text-center my-4'>${price * quantity}.00 USD</p>

            {/* add to cart button */}
            <button className='border-4 text-lg shadow-lg hover:shadow-none transition-all px-8 py-4 w-sm lg:w-3/4' onClick={() => addToCart()}>{itemInCart && quantity == 0 ? "Remove from cart" : itemInCart ? "Update Item in Cart" : "Add to Cart"}</button>
          </div>
        </div>
      </div>
    )
  }

  // ============= BEGIN PRODUCT CATALOG ITEM =============

  return (
    <>
      <button key={key} onClick={() => setShowDetails(!showDetails)} className="hover:cursor-pointer flex flex-col border-4 border-black justify-center items-center w-45 h-50 hover:bg-gray-100 dark:hover:bg-gray-700">
        <Image src={product.images[0]} alt={product.description ? product.description : product.name} height={128} width={128} className="mb-4" loading="eager" />
        <p className="text-center m-0 relative">{product.name}</p>
      </button>
      {showDetails ? <Details /> : <></>}
    </>
  )
}