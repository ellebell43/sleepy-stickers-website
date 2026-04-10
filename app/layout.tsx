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
      <body className={`min-h-full w-full flex flex-col mx-auto antialiased transition-all ${fontAseprite.className}`}>
        <header className="w-full px-5 flex justify-center gap-12 md:gap-8 shadow-md pb-2 pt-3 fixed z-10">
          {/* ========== SHOP LINK ========== */}
          <Link href="/shop" className="hover:opacity-70 transition-all">
            <div className="flex items-center">
              <Image src="/images/shop.png" alt="A store front icon on a 16x16 pixel art canvas using just simple black lines" title="Shop" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} />
              <p className="ml-1 hidden md:block">Shop</p>
            </div>
          </Link>
          {/* ==========  Contact LINK ========== */}
          <Link href="#/shop" className="hover:opacity-70 transition-all">
            <div className="flex items-center">
              <Image src="/images/mail.png" alt="An envelope icon on a 16x16 pixel art canvas using just simple black lines" title="Contact Me" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} />
              <p className="ml-1 hidden md:block">Contact</p>
            </div>
          </Link>
          {/* ========== GALLERY LINK ========== */}
          <Link href="#/shop" className="hover:opacity-70 transition-all">
            <div className="flex items-center">
              <Image src="/images/gallery.png" alt="A gallery icon on a 16x16 pixel art canvas using just simple black lines" title="Gallery" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} />
              <p className="ml-1 hidden md:block">Gallery</p>
            </div>
          </Link>
          {/* ========== CART LINK ========== */}
          <Link href="#/cart" className="hover:opacity-70 transition-all">
            <div className="flex items-center">
              <p className="text-sm">{quantity}</p>
              <Image src="/images/cart.png" alt="A shopping cart icon on a 16x16 pixel art canvas using just simple black lines" title="Cart" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} />
              <p className="ml-1 hidden md:block">Cart</p>
            </div>
          </Link>
        </header>
        <main className="pt-16 px-4 w-full min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
