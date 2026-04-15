import { product, productType } from "./types"

const allProductTypes: productType[] = [
  { name: "Sticker - 3in", price: 4, id: process.env.STICKER_LARGE_ID || "" },
  { name: "Sticker - 2.25in", price: 3, id: process.env.STICKER_MEDIUM_ID || "" },
  { name: "Sticker - 1.5in", price: 2, id: process.env.STICKER_SMALL_ID || "" },
]

export const catalog: product[] = [
  // ============ 32x32 images ==============

  // Capybara

  {
    id: "32x32-000001.a",
    name: "Capybara",
    description: "A peaceful capybara with an orange yuzu fruit on its head. Kinda has an overall peaceful vibe and a knowing expression. A 32x32 canvas pixel art image.",
    image: [],
    variant: false,
    availableTypes: allProductTypes,
    canvasSize: "32x32",
    tags: ["animal"]
  },
  {
    id: "32x32-000001.b",
    name: "Capybara - Pink",
    description: "A peaceful capybara with an orange yuzu fruit on its head in front of a circular, pink background. Kinda has an overall peaceful vibe and a knowing expression. A 32x32 canvas pixel art image.",
    image: [],
    variant: true,
    variantOf: "32x32-000001.a",
    availableTypes: allProductTypes,
    canvasSize: "32x32",
    tags: ["animal"]
  },
  {
    id: "32x32-000001.c",
    name: "Capybara - Nonbinary",
    description: "A peaceful capybara with an orange yuzu fruit on its head in front of a circular, nonbinary flag. Kinda has an overall peaceful vibe and a knowing expression. A 32x32 canvas pixel art image.",
    image: [],
    variant: true,
    variantOf: "32x32-000001.a",
    availableTypes: allProductTypes,
    canvasSize: "32x32",
    tags: ["animal", "pride"]
  },
  {
    id: "32x32-000001.d",
    name: "Capybara - Trans",
    description: "A peaceful capybara with an orange yuzu fruit on its head in front of a circular, nonbinary flag. Kinda has an overall peaceful vibe and a knowing expression. A 32x32 canvas pixel art image.",
    image: [],
    variant: true,
    variantOf: "32x32-000001.a",
    availableTypes: allProductTypes,
    canvasSize: "32x32",
    tags: ["animal", "pride"]
  },

  // Yankee

  {
    id: "32x32-000002.a",
    name: "Greyhound",
    description: "A greyhound dog - beady little eyes and all. They don't know what's going on and you can see that in their eyes. A 32x32 canvas pixel art image.",
    image: [],
    variant: false,
    availableTypes: allProductTypes,
    canvasSize: "32x32",
    tags: ["animal"]
  },
  {
    id: "32x32-000002.b",
    name: "Greyhound - Pink",
    description: "A greyhound dog - beady little eyes and all - in front of a circular, pink background. They don't know what's going on and you can see that in their eyes. A 32x32 canvas pixel art image.",
    image: [],
    variant: true,
    variantOf: "32x32-000002.a",
    availableTypes: allProductTypes,
    canvasSize: "32x32",
    tags: ["animal"]
  },
  {
    id: "32x32-000002.c",
    name: "Greyhound - Nonbinary",
    description: "A greyhound dog - beady little eyes and all - in front of a circular, nonbinary flag. They don't know what's going on and you can see that in their eyes. A 32x32 canvas pixel art image.",
    image: [],
    variant: true,
    variantOf: "32x32-000002.a",
    availableTypes: allProductTypes,
    canvasSize: "32x32",
    tags: ["animal", "pride"]
  },
  {
    id: "32x32-000002.d",
    name: "Greyhound - Trans",
    description: "A greyhound dog - beady little eyes and all - in front of a circular, trans flag. They don't know what's going on and you can see that in their eyes. A 32x32 canvas pixel art image.",
    image: [],
    variant: true,
    variantOf: "32x32-000002.a",
    availableTypes: allProductTypes,
    canvasSize: "32x32",
    tags: ["animal", "pride"]
  },

  // Hector

  {
    id: "32x32-000009",
    name: "Hector",
    description: "Is it a worm? A thumb? I don't know. It's just Hector. A 32x32 canvas pixel art image.",
    image: [],
    variant: false,
    availableTypes: allProductTypes,
    canvasSize: "32x32",
    tags: ["character"]
  },
]