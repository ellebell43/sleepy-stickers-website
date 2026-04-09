import "./globals.css";
import localFont from 'next/font/local'
import Image from "next/image";
import Link from "next/link";

const fontAseprite = localFont({ src: '../public/fonts/aseprite.otf/aseprite.otf' })

const iconSize = 16 * 2

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full ${fontAseprite.className}`}
    >
      <body className={`min-h-full w-full flex flex-col max-w-500 mx-auto antialiased transition-all ${fontAseprite.className}`}>
        <header className="w-full px-5 flex justify-between md:justify-center md:gap-8 shadow-md pb-2 pt-3 fixed z-10">
          {/* ==========  ABOUT LINK ========== */}
          {/* ========== GALLERY LINK ========== */}
          {/* ========== SHOP LINK ========== */}
          <Link href="#/shop" className="hover:opacity-70 transition-all">
            <div className="flex items-center">
              <Image src="/images/shop.png" alt="A store front icon on a 16x16 pixel art canvas using just simple black lines" title="Shop" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} />
              <p className="ml-1 hidden md:block">Shop</p>
            </div>
          </Link>
          {/* ========== CART LINK ========== */}
          <Link href="#/cart" className="hover:opacity-70 transition-all">
            <div className="flex items-center">
              <p className="text-sm">0</p>
              <Image src="/images/cart.png" alt="A shopping cart icon on a 16x16 pixel art canvas using just simple black lines" title="Cart" className="dark:invert relative bottom-1" height={iconSize} width={iconSize} />
              <p className="ml-1 hidden md:block">Cart</p>
            </div>
          </Link>
        </header>
        <main className="py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
