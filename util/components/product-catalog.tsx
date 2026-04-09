import { ResponseData } from "@/app/shop/api/route"
import Stripe from 'stripe'
import Image from "next/image"
import { Suspense } from "react"
import Spinner from "./spinner"

export default async function ProductCatalog() {
  if (!process.env.ROUTE_HOST) {
    return <p>Oops! Somethings went wrong! Failed to parse host for API route</p>
  }
  try {
    const res = await fetch(`${process.env.ROUTE_HOST}/shop/api`)
    const data = await res.json()
    return (
      <Suspense fallback={<Spinner />}>
        <ul className="flex">
          {data.products.map((el: Stripe.Product, i: number) => {
            return (
              <li key={i} className="border-4 border-black p-2 flex flex-col justify-center items-center">
                <Image src={el.images[0]} alt={el.description ? el.description : el.name} height={128} width={128} className="mb-4" />
                <p>{el.name}</p>
                <p className="opacity-70 text-xs">{el.description}</p>
              </li>
            )
          })}
        </ul>
      </Suspense>
    )
  } catch (error) {
    return <p>Error! {String(error)}</p>
  }


}