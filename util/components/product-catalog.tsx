import { Suspense } from "react"
import Spinner from "./spinner"
import ProductCard from "./product-card"
import { catalog } from "../catalog"
import { product } from "../types"

export default async function ProductCatalog() {
  return (
    <Suspense fallback={<Spinner />}>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 w-fit mx-auto mt-8">
        {catalog.map((el: product, i: number) => {
          // Ignore any item that is a variant
          if (el.variantOf != null) return
          // Create an array of variants that belong to the item
          let variants: product[] = []
          catalog.map((item: product) => { if (item.variantOf == el.id) variants.push(item) })
          // Return a ProductCard element
          return <ProductCard product={el} key={i} variants={variants} />
        })}
      </div>
    </Suspense>
  )
}