import ProductCatalog from "@/util/components/product-catalog";

export default function Page() {
  return (
    <>
      <h1 className="mb-4">Shop!</h1>
      <p className="text-center">Welcome to the shop! All stickers are $2 by default and an additional $1 for every size increase.</p>
      <ProductCatalog />
    </>
  )
}