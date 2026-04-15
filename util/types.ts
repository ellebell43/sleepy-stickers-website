export type cartItem = {
  product: product,
  productType: productType,
  quantity: number
}

export type product = {
  id: string
  name: string,
  description: string,
  image: string[],
  variant: boolean,
  variantOf?: string,
  availableTypes: productType[],
  canvasSize: string,
  tags?: productTag[]
}

export type productType = {
  id: string,
  name: string,
  price: number,
}

export type productTag =
  "animal" |
  "character" |
  "pride" |
  "scene" |
  "text"

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
      name: string
    },
    unit_amount: string // price of item in cents
  },
  quantity: number
}