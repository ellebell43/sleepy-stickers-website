'use client'

import { cartItem } from "@/util/types";
import "./globals.css";
import localFont from 'next/font/local'
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const fontAseprite = localFont({ src: '../public/fonts/aseprite.otf/aseprite.otf' })

const iconSize = 16 * 2

const getCartQuantity = () => {
  if (localStorage.getItem("cart") == null) return 0
  // @ts-ignore
  const cart: cartItem[] = JSON.parse(localStorage.getItem("cart"))
  let quantity = 0
  cart.map((el: cartItem) => { quantity += el.quantity })
  return quantity
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [quantity, setQuantity] = useState(0)

  // listen for storage change events and update cart quantity when it happens
  useEffect(() => {
    setQuantity(getCartQuantity)
    const listenStorageChange = () => {
      setQuantity(getCartQuantity)
    }
    window.addEventListener("storage", listenStorageChange)
    return () => window.removeEventListener("storage", listenStorageChange)
  }, [])

  return (
    <html
      lang="en"
      className={`h-full ${fontAseprite.className}`}
    >
      <body className={`min-h-full w-full flex flex-col mx-auto antialiased transition-all ${fontAseprite.className} text-black dark:text-white bg-stone-100 dark:bg-stone-800`}>

        {/* ======== HEADER ======== */}
        <header className="w-full px-5 flex justify-center gap-12 md:gap-8 shadow-md pb-2 pt-3 fixed z-10 bg-stone-50 dark:bg-stone-900 border-b-4">
          {/* Home Link */}
          <Link href="/" className="hover:opacity-70 transition-all">
            <div className="flex items-center">
              <Image src="/images/home.png" alt="A home icon on a 16x16 pixel art canvas using just simple black lines" title="Home" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} />
              <p className="ml-1 hidden md:block">Home</p>
            </div>
          </Link>

          {/* Shop Link */}
          <Link href="/shop" className="hover:opacity-70 transition-all">
            <div className="flex items-center">
              <Image src="/images/shop.png" alt="A store front icon on a 16x16 pixel art canvas using just simple black lines" title="Shop" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} />
              <p className="ml-1 hidden md:block">Shop</p>
            </div>
          </Link>

          {/* Contact Link */}
          <Link href="#/contact" className="hover:opacity-70 transition-all">
            <div className="flex items-center">
              <Image src="/images/mail.png" alt="An envelope icon on a 16x16 pixel art canvas using just simple black lines" title="Contact Me" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} />
              <p className="ml-1 hidden md:block">Contact</p>
            </div>
          </Link>

          {/* Gallery Link */}
          <Link href="#/gallery" className="hover:opacity-70 transition-all">
            <div className="flex items-center">
              <Image src="/images/gallery.png" alt="A gallery icon on a 16x16 pixel art canvas using just simple black lines" title="Gallery" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} />
              <p className="ml-1 hidden md:block">Gallery</p>
            </div>
          </Link>

          {/* Cart Link */}
          <Link href="#/cart" className="hover:opacity-70 transition-all">
            <div className="flex items-center">
              <p className="text-sm">{quantity}</p>
              <Image src="/images/cart.png" alt="A shopping cart icon on a 16x16 pixel art canvas using just simple black lines" title="Cart" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} />
              <p className="ml-1 hidden md:block">Cart</p>
            </div>
          </Link>
        </header>
        <main className="pt-18 px-4 w-full min-h-screen">
          {children}
        </main>
        <footer className="bg-slate-700 text-white pt-10 px-6 pb-4 border-t-4 border-black">
          <h2 className="text-xl mb-4">Credits</h2>
          <p>Art by <strong>Elle Brooks</strong>.</p>
          <p>Tangible products made by <strong>Elle Brooks</strong>.</p>
          <p>Site programming by <strong>Elle Brooks</strong> using Next.js.</p>
          <p>The font was created by <Link className="underline" href="https://fontstruct.com/fontstructions/show/2260539"><strong>adityaraj</strong></Link>.</p>
          <p>No AI was used in any way to make this art, the tangible products, or this website.</p>
        </footer>
      </body>
    </html>
  );
}
