import { product, productType, productSize } from "./types"

export const allProductTypes: productType[] = [
  { name: "Temporary Tattoo", price: 0.50, id: "tattoo" },
  { name: "Holographic Sticker", price: 0.25, id: "holo" },
  { name: "Regular Sticker", price: 0.00, id: "regular" },
]

export const allProductSizes: productSize[] = [
  { name: "4in", price: 4.00, id: "large" },
  { name: "3in", price: 3.00, id: "medium" },
  { name: "2in", price: 2.00, id: "small" },
]

export const catalog: product[] = [
  // ============ 32x32 images ==============

  // ========== Capybara ==========

  {
    id: "32x32-000001",
    name: "Capybara",
    description: "A peaceful capybara with an orange yuzu fruit on its head. Kinda has an overall peaceful vibe and a knowing expression. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: null,
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal"]
  },
  {
    id: "32x32-000001.c",
    name: "Capybara - Pink",
    description: "A peaceful capybara with an orange yuzu fruit on its head in front of a circular, pink background. Kinda has an overall peaceful vibe and a knowing expression. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000001",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal"]
  },
  {
    id: "32x32-000001.b",
    name: "Capybara - Nonbinary",
    description: "A peaceful capybara with an orange yuzu fruit on its head in front of a circular, nonbinary flag. Kinda has an overall peaceful vibe and a knowing expression. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000001",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal", "pride"]
  },
  {
    id: "32x32-000001.a",
    name: "Capybara - Trans",
    description: "A peaceful capybara with an orange yuzu fruit on its head in front of a circular, nonbinary flag. Kinda has an overall peaceful vibe and a knowing expression. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000001",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal", "pride"]
  },

  // ========== Yankee ==========

  {
    id: "32x32-000002",
    name: "Greyhound",
    description: "A greyhound dog - beady little eyes and all. They don't know what's going on and you can see that in their eyes. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: null,
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal"]
  },
  {
    id: "32x32-000002.c",
    name: "Greyhound - Pink",
    description: "A greyhound dog - beady little eyes and all - in front of a circular, pink background. They don't know what's going on and you can see that in their eyes. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000002",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal"]
  },
  {
    id: "32x32-000002.a",
    name: "Greyhound - Nonbinary",
    description: "A greyhound dog - beady little eyes and all - in front of a circular, nonbinary flag. They don't know what's going on and you can see that in their eyes. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000002",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal", "pride"]
  },
  {
    id: "32x32-000002.b",
    name: "Greyhound - Trans",
    description: "A greyhound dog - beady little eyes and all - in front of a circular, trans flag. They don't know what's going on and you can see that in their eyes. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000002",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal", "pride"]
  },

  // ========== Tutter ==========

  {
    id: "32x32-000003",
    name: "Tutter",
    description: "Tutter the mouse from Bear in the Big Blue House. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: null,
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["character"]
  },
  {
    id: "32x32-000003.a",
    name: "Tutter - Purple",
    description: "Tutter the mouse from Bear in the Big Blue House in front of a circular, purple background. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000003",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["character"]
  },
  {
    id: "32x32-000003.b",
    name: "Tutter - Trans",
    description: "Tutter the mouse from Bear in the Big Blue House, in front of a circular, trans flag. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000003",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["character", "pride"]
  },
  {
    id: "32x32-000003.c",
    name: "Tutter - Nonbinary",
    description: "Tutter the mouse from Bear in the Big Blue House, in front of a circular, nonbinary flag. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000003",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["character", "pride"]
  },

  // ========== Paddington ==========

  {
    id: "32x32-000004",
    name: "Paddington",
    description: "Paddington from the movie, Paddington. A polite looking, anthropomorphic bear with a froopy red hat. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: null,
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["character"]
  },
  {
    id: "32x32-000004.a",
    name: "Paddington - Nonbinary",
    description: "Paddington from the movie, Paddington. A polite looking, anthropomorphic bear with a froopy red hat in front of a circular, nonbinary flag. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000004",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["character", "pride"]
  },
  {
    id: "32x32-000004.b",
    name: "Paddington Trans",
    description: "Paddington from the movie, Paddington. A polite looking, anthropomorphic bear with a froopy red hat in front of a circular, trans flag. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000004",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["character", "pride"]
  },
  {
    id: "32x32-000004.c",
    name: "Paddington - Blue",
    description: "Paddington from the movie, Paddington. A polite looking, anthropomorphic bear with a froopy red hat in front of a circular, blue background. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000004",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["character"]
  },

  // ========== Thomas tank engine ==========

  {
    id: "32x32-000005",
    name: "Thomas",
    description: "'Thomas had never seen such bullshit'. Thomas the Tank Engine with the incredibly angry and disapproving face from the meme. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: null,
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["character"]
  },

  // ========== Pea puffer ==========

  {
    id: "32x32-000006",
    name: "Pea Puffer",
    description: "A pea puffer fish. The view is straight on at its face, showing a wide-eyed and mostly blank expression. In some ways, my spirit animal. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: null,
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal"]
  },
  {
    id: "32x32-000006.a",
    name: "Pea Puffer - Blue",
    description: "A pea puffer fish. The view is straight on at its face, showing a wide-eyed and mostly blank expression in front of a circular, blue background. In some ways, my spirit animal. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000006",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal"]
  },

  // ========== Enbee ==========

  {
    id: "64x64-000006",
    name: "Enbee",
    description: "A bee with an abdomen in the colors of the nonbinary flag. View is from the top down and the background is a tan circle with a vaguely hexagonal pattern. A 64x64 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: null,
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "64x64",
    tags: ["animal", "pride"]
  },
  {
    id: "32x32-000007",
    name: "Enbee - 32x32",
    description: "A bee with an abdomen in the colors of the nonbinary flag. View is from the top down and the background is a tan circle with a vaguely hexagonal pattern. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "64x64-000006",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal", "pride"]
  },

  // ========== Bun sit ==========

  {
    id: "32x32-000008",
    name: "Sitting Bun",
    description: "A white rabbit, sitting and staring and the viewer. One ear is flopped to the side a bit. I think it's waiting for something. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: null,
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal"]
  },
  {
    id: "32x32-000008.a",
    name: "Sitting Bun - Go Away",
    description: "A white rabbit, sitting and staring and the viewer. One ear is flopped to the side a bit. In front of it is a sign that says 'Go Away'. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000008",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal", "text"]
  },
  {
    id: "32x32-000008.b",
    name: "Sitting Bun - Fuck This",
    description: "A white rabbit, sitting and staring and the viewer. One ear is flopped to the side a bit. In front of it is a sign that says 'Fuck This'. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000008",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal", "text"]
  },
  {
    id: "32x32-000008.c",
    name: "Sitting Bun - I see you",
    description: "A white rabbit, sitting and staring and the viewer. One ear is flopped to the side a bit. In front of it is a sign that says 'I see you'. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "32x32-000008",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal", "text"]
  },

  // ========== Hector ==========

  {
    id: "32x32-000009",
    name: "Hector",
    description: "Is it a worm? A thumb? I don't know. It's just Hector. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: null,
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["oc character"]
  },

  // ========== Ducky ==========

  {
    id: "32x32-000010",
    name: "Ducky",
    description: "A little yellow ducky. It brings good luck. A 32x32 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: null,
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "32x32",
    tags: ["animal"]
  },

  // ========== Sleepy Red Panda ==========

  {
    id: "64x64-000003",
    name: "Sleepy Red Panda",
    description: "A red panda flopped across a branch, snoozing away. A 64x64 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: null,
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "64x64",
    tags: ["animal"]
  },
  {
    id: "64x64-000003.a",
    name: "Sleepy Red Panda - Green",
    description: "A red panda flopped across a branch, snoozing away in front of a circular, green background. A 64x64 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "64x64-000003",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "64x64",
    tags: ["animal"]
  },
  {
    id: "100x64-000001",
    name: "Sleepy Red Panda - Sleepy Stickers",
    description: "A red panda flopped across a branch, snoozing away in front of a circular, green background. Next to it is a white card with the words 'Sleepy Stickers' A 64x64 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: "64x64-000003",
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "64x64",
    tags: ["animal", "text"]
  },

  // ========== Summer Tree ==========

  {
    id: "64x64-000004",
    name: "Summer Tree",
    description: "A large oak tree in front of a background of clouds. A 64x64 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: null,
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "64x64",
    tags: ["scene"]
  },

  // ========== Curiosity ==========

  {
    id: "64x64-000005",
    name: "Curiosity",
    description: "A robot in a pitch black environment, curiously looking at a floating, golden spark. It's reaching out to touch it. A 64x64 canvas pixel art image.",
    images: [],
    alts: [],
    variantOf: null,
    availableTypes: allProductTypes,
    availableSizes: allProductSizes,
    canvasSize: "64x64",
    tags: ["oc character"]
  },
]