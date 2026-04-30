export type cartItem = {
  product: product,
  productType: productType,
  size: productSize,
  quantity: number
}

export type product = {
  id: string
  name: string,
  description: string,
  image: string[],
  variantOf?: string | null,
  availableTypes: productType[],
  availableSizes: productSize[]
  canvasSize: string,
  tags?: productTag[]
}

export type productType = {
  id: string,
  name: string,
  price: number,
}

export type productSize = {
  id: string,
  name: string,
  price: number
}

export type productTag =
  "animal" |
  "character" |
  "pride" |
  "scene" |
  "text" |
  "oc character"

export type priceData = {
  currency: "usd",
  product_data: {
    name: string
  },
  unit_amount: string // price of item in cents
}

export type lineItem = {
  price_data: {
    currency: "usd",
    product_data: {
      name: string,
      images?: string[]
    },
    unit_amount: string // price of item in cents
  },
  quantity: number
}