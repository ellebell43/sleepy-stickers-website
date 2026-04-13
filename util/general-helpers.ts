export const priceToString = (price: number): string => {
  const priceParts = String(price).split(".")
  // if price is already a whole number
  if (priceParts.length == 1) {
    return `$${price}.00`
  } else {
    // Ensure number only goes to the hundredths
    const centsString = priceParts[1].slice(0, 3)
    // Convert result back into number
    const centsNum = Number(centsString)
    // If it's a single digit, add a 0 to the end when returning
    if (centsNum < 10) {
      return `$${priceParts[0]}.${centsString}0`
    } else {
      return `$${priceParts[0]}.${centsString}`
    }
  }
}