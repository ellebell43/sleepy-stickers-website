import { ResponseData } from "@/app/shop/api/route"
import Stripe from 'stripe'
import Image from "next/image"
import { Suspense } from "react"
import Spinner from "./spinner"
import ProductCard from "./product-card"

export default async function ProductCatalog() {
  if (!process.env.HOST_ROUTE) {
    return <p>Oops! Somethings went wrong! Failed to parse host for API route</p>
  }
  const res = await fetch(`${process.env.HOST_ROUTE}/shop/api`)
  if (res.status != 200) return <p>Error {res.status} :(</p>
  const data = await res.json()
  return (
    <Suspense fallback={<Spinner />}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-fit mx-auto mt-8">
        {data.products.map((el: Stripe.Product, i: number) => {
          // Ignore any item that is a variant
          if (el.metadata.variant == "true") return
          // Create an array of variants that belong to the item
          let variants: Stripe.Product[] = []
          data.products.map((item: Stripe.Product, i: number) => { if (item.metadata.variant == "true" && item.metadata.variantOf == el.name) variants.push(item) })
          // Create a list of features to pass to each product
          let features: Stripe.Entitlements.Feature[] = []
          data.features.map((el: Stripe.Entitlements.Feature, i: number) => { if (el.metadata.productType == "sticker") features.push(el) })
          // Return a ProductCard element
          return <ProductCard product={el} key={i} variants={variants} features={features} />
        })}
      </div>
    </Suspense>
  )
}