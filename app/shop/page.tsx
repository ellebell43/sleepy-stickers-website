import ProductCatalog from "@/util/components/product-catalog";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <h1 className="mb-4">Shop!</h1>
      {/* <p className="text-center text-xl">Welcome to the shop!</p> */}
      <p className="text-center">All stickers are $2 by default and an additional $1 for every size increase.</p>
      <p className="text-center">Head on over to the <Link className="underline" href="/gallery">Gallery</Link> to see irl images of the items sold here.</p>
      <ProductCatalog />
    </>
  )
}