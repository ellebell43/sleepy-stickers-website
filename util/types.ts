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
  name: string,
  price: number
}

export type productTag =
  "animal" |
  "character" |
  "pride" |
  "scene" |
  "text"