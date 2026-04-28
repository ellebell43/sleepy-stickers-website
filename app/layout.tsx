'use client'

import "./globals.css";
import localFont from 'next/font/local'
import Image from "next/image";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import { getCartTotalQuantity } from "@/util/cart-helpers";
import Cart from "@/util/components/cart";
import Spinner from "@/util/components/spinner";

const fontAseprite = localFont({ src: '../public/fonts/aseprite.otf/aseprite.otf' })
const iconSize = 16 * 2

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [quantity, setQuantity] = useState(0)
  const [showNav, setShowNav] = useState(false)
  const [showCart, setShowCart] = useState(false)

  // listen for storage change events and update cart quantity when it happens
  useEffect(() => {
    setQuantity(getCartTotalQuantity())
    const listenStorageChange = () => {
      setQuantity(getCartTotalQuantity())
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
        <SpeedInsights />
        <Analytics />
        {/* ======== HEADER ======== */}
        <header className={`w-full px-5 flex justify-between items-center gap-12 md:gap-8 shadow-md pb-2 pt-3 z-10 border-b-4 relative`}>
          <nav id="navigation" className={`fixed top-0 ${showNav ? "right-0" : "-right-87.5"} transition-all duration-1000 border-l-4 bg-white dark:bg-gray-800 p-8 pr-32 text-4xl flex flex-col gap-8 h-screen z-50`} >
            {/* Close nav menu button */}
            <button className="absolute right-4 top-4" aria-label="toggle navigation menu visibility" onClick={() => { setShowNav(false); setShowCart(false) }}>
              <Image src="/images/x-button.png" alt="x button icon" height={iconSize} width={iconSize} />
            </button>

            {/* Home Link */}
            <Link href="/" className="hover:opacity-70 transition-all" onClick={() => setShowNav(false)}>
              <div className="flex items-center">
                {/* <Image src="/images/home.png" alt="A home icon on a 16x16 pixel art canvas using just simple black lines" title="Home" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} /> */}
                <p className="block">Home</p>
              </div>
            </Link>

            {/* Shop Link */}
            <Link href="/shop" className="hover:opacity-70 transition-all" onClick={() => setShowNav(false)}>
              <div className="flex items-center">
                {/* <Image src="/images/shop.png" alt="A store front icon on a 16x16 pixel art canvas using just simple black lines" title="Shop" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} /> */}
                <p className="block">Shop</p>
              </div>
            </Link>

            {/* Contact Link */}
            <Link href="/contact" className="hover:opacity-70 transition-all" onClick={() => setShowNav(false)}>
              <div className="flex items-center">
                {/* <Image src="/images/mail.png" alt="An envelope icon on a 16x16 pixel art canvas using just simple black lines" title="Contact Me" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} /> */}
                <p className="block">Contact</p>
              </div>
            </Link>

            {/* Gallery Link */}
            <Link href="#/gallery" className="hover:opacity-70 transition-all" onClick={() => setShowNav(false)}>
              <div className="flex items-center">
                {/* <Image src="/images/gallery.png" alt="A gallery icon on a 16x16 pixel art canvas using just simple black lines" title="Gallery" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} /> */}
                <p className="block">Gallery</p>
              </div>
            </Link>
          </nav>

          <Link href="/">
            <p className="absolute scale-0">Home</p>
            <Image src="/images/sleepy-stickers-logo-words.png" alt="Sleepy Stickers Logo" width={32 * 3} height={32 * 3} />
          </Link>

          {/* Cart Link */}
          <div className="flex justify-center items-center gap-6">
            <button className="hover:opacity-70 transition-all" onClick={() => setShowCart(!showCart)}>
              <div className="flex items-center">
                <p className="text-sm">{quantity}</p>
                <Image src="/images/cart.png" alt="shopping cart icon" title="Cart" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} />
                <p className="absolute scale-0">Cart</p>
              </div>
            </button>
            {/* Menu Toggle Button */}
            <button onClick={() => setShowNav(!showNav)} aria-label="toggle navigation menu visibility" className="dark:invert" >
              <Image src="/images/menu.png" width={iconSize} height={iconSize} alt="menu icon" />
            </button>
          </div>

          <div className={`fixed bg-white dark:bg-gray-800 border-l-4 top-0 ${showCart ? "right-0" : "-right-300"} h-screen p-4 transition-all duration-1000`}>
            {/* Close cart button */}
            <button className="absolute right-4 top-4 dark:invert" aria-label="toggle cart visibility" onClick={() => { setShowCart(!showCart) }}>
              <Image src="/images/x-button.png" alt="x button icon" height={iconSize} width={iconSize} />
            </button>
            <section id="cart" className="w-75 pt-10">
              <Suspense fallback={<Spinner />}>
                <Cart />
              </Suspense>
            </section>
          </div>
        </header>
        <main className="pt-18 px-4 w-full min-h-screen">
          {children}
        </main>
        <footer className="bg-slate-700 text-white pt-10 px-6 pb-4 border-t-4 border-black mt-8">
          <h2 className="text-xl mb-4 border-b-2">Credits</h2>
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
