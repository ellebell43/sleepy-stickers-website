import { Suspense } from "react"
import Spinner from "./spinner"
import ProductCard from "./product-card"
import { catalog } from "../catalog"
import { product } from "../types"

export default async function ProductCatalog() {
  // throw error if host route can't be found in Environment variables
  if (!process.env.HOST_ROUTE) {
    return <p className="text-center my-12 text-4xl">Well that wasn't right. Environment variable ROUTE_HOST wasn't found.</p>
  }

  // Fetch data and show error if response is not 200
  const res = await fetch(`${process.env.HOST_ROUTE}/shop/api`)
  if (res.status != 200) return <p className="text-center my-12 text-4xl">Well that wasn't right. Error {res.status}: {res.statusText}</p>
  // Parse fetch request data
  const data = await res.json()

  return (
    <Suspense fallback={<Spinner />}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-fit mx-auto mt-8">
        {catalog.map((el: product, i: number) => {
          // Ignore any item that is a variant
          if (el.variant) return
          // Create an array of variants that belong to the item
          let variants: product[] = []
          catalog.map((item: product) => { if (item.variant && item.variantOf == el.id) variants.push(item) })
          // Return a ProductCard element
          return <ProductCard product={el} key={i} variants={variants} />
        })}
      </div>
    </Suspense>
  )
}