'use client'

import Stripe from 'stripe'
import Image from 'next/image'
import { useState } from 'react'

export default function ProductCard(props: { product: Stripe.Product, key: number, variants?: Stripe.Product[] }) {
  const { product, key, variants } = props
  const [showDetails, setShowDetails] = useState(false)
  const [detailsVariant, setDetailsVariant] = useState<undefined | number>(undefined)

  const determineImage = () => {
    if (detailsVariant == undefined) return product.images[0]
    else if (variants) return variants[detailsVariant].images[0]
    else return "/images/not-found.png"
  }

  const determineAlt = () => {
    if (detailsVariant == undefined) return product.description ? product.description : product.name
    else if (variants) return variants[detailsVariant].description ? variants[detailsVariant].description : variants[detailsVariant].name
    else return "hm. something went wrong and the image wasn't found. please email me at hello@sleepystickers.art so I can fix it!"
  }

  const determineName = () => {
    let name: string
    if (detailsVariant == undefined) name = product.name
    else if (variants) name = variants[detailsVariant].name
    else return <p>hm. something went wrong and the image wasn't found. please email me at hello@sleepystickers.art so I can fix it!</p>

    const names = name.split(" - ")
    return <div className='min-h-[80px]'>
      {names.map((el, i) => <p className='text-center text-4xl' key={i}>{el}</p>)}
    </div>
  }

  const VariantButton = (props: { src: string, alt: string, variant: boolean, index?: number }) => {
    const { src, alt, variant, index } = props
    const active =
      (detailsVariant == undefined && variant == false) ||
      (detailsVariant == index)
    return (
      <button onClick={() => setDetailsVariant(!variant ? undefined : index)} className={`rounded-full ${active ? "border-2" : ""}`}>
        <Image src={src} alt={alt} width={64} height={64} />
      </button>
    )
  }

  const Details = () => (
    // ======== LETTER BOX ========
    <div className='fixed top-0 left-0 w-screen h-screen bg-black/25 dark:bg-white/25 flex items-center justify-center z-50'>
      {/* ======== CONTENT BOX ======== */}
      <div className='bg-white dark:bg-black w-screen md:w-3/4 h-screen md:h-3/4 border-6 relative pt-10 p-4'>
        {/* ======== CLOSE BUTTON ======== */}
        <button className='hover:cursor-pointer absolute top-2 right-2' onClick={() => setShowDetails(false)}>
          <Image className='dark:invert' src="/images/x-button.png" alt="close dialog" height={32} width={32} />
        </button>
        {/* ======== CONTENT ======== */}
        {/* Big image */}
        <Image src={determineImage()} alt={determineAlt()} height={256} width={256} className="mb-4 mx-auto" />
        {/* Product name */}
        {determineName()}
        <p className='max-w-lg mx-auto my-4'>{product.description}</p>
        {/* Variation options */}
        <div className='flex justify-between px-4'>
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