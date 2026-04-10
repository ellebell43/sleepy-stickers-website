'use client'

import Stripe from 'stripe'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function ProductCard(props: { product: Stripe.Product, key: number, variants?: Stripe.Product[], features: Stripe.Entitlements.Feature[] }) {
  const { product, key, variants, features } = props
  const [showDetails, setShowDetails] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState<undefined | number>(undefined)
  const [price, setPrice] = useState(2)
  const [selectedFeature, setSelectedFeature] = useState(0)

  useEffect(() => {
    features.map((el: Stripe.Entitlements.Feature, i: number) => { if (el.name == "1.5in") setSelectedFeature(i) })
  }, [])

  useEffect(() => {
    if (features[selectedFeature].metadata.cost) {
      setPrice(2 + Number(features[selectedFeature].metadata.cost))
    }
  }, [selectedFeature])

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
    return <div className='min-h-[80px]'>
      {names.map((el, i) => <p className='text-center text-4xl' key={i}>{el}</p>)}
    </div>
  }

  // Component for selecting product variants
  const VariantButton = (props: { src: string, alt: string, variant: boolean, index?: number }) => {
    const { src, alt, variant, index } = props
    const active =
      (selectedVariant == undefined && variant == false) ||
      (selectedVariant == index)
    return (
      <button onClick={() => setSelectedVariant(!variant ? undefined : index)} className={`rounded-full ${active ? "border-2" : ""}`}>
        <Image src={src} alt={alt} width={64} height={64} />
      </button>
    )
  }

  const Details = () => (
    // ======== LETTER BOX ========
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/25 dark:bg-white/25 flex items-center justify-center z-50'>
      {/* ======== CONTENT BOX ======== */}
      <div className='bg-white dark:bg-black w-screen md:w-3/4 h-screen md:h-3/4 border-6 relative pt-10 p-4 flex flex-col items-center justify-center lg:flex-row'>

        {/* ======== CLOSE BUTTON ======== */}
        <button className='hover:cursor-pointer absolute top-2 right-2' onClick={() => setShowDetails(false)}>
          <Image className='dark:invert' src="/images/x-button.png" alt="close dialog" height={32} width={32} />
        </button>

        {/* ======== PRODUCT CONTENT ======== */}
        <div className='flex flex-col justify-center items-center'> {/* Big image */}
          <Image src={determineImage()} alt={determineAlt()} height={256} width={256} className="mb-4 mx-auto" />
          {/* Product name*/}
          {determineName()}
          {/* Variation options */}
          <div className='flex justify-center gap-8 px-4 w-fit'>
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
          <div className='flex gap-2'>
            {features.map((el: Stripe.Entitlements.Feature, i: number) =>
              <button key={i} aria-pressed={selectedFeature == i} className={`border-4 px-4 py-2 ${selectedFeature == i ? "" : "bg-gray-300 dark:bg-gray-600"}`} onClick={() => setSelectedFeature(i)}>
                <p>{el.name}</p>
              </button>)}
          </div>
          <p className='text-3xl text-center my-4'>${price}.00</p>
          <button className='border-4 text-lg shadow-lg hover:shadow-none transition-all px-8 py-4'>Add to Cart</button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <button key={key} onClick={() => setShowDetails(!showDetails)} className="hover:cursor-pointer flex flex-col border-4 border-black justify-center items-center w-45 h-45 hover:bg-gray-100 dark:hover:bg-gray-700">
        <Image src={product.images[0]} alt={product.description ? product.description : product.name} height={128} width={128} className="mb-4" />
        <p className="text-center">{product.name}</p>
      </button>
      {showDetails ? <Details /> : <></>}
    </>
  )
}