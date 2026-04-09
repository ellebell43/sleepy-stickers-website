import "./globals.css";
import localFont from 'next/font/local'
import Image from "next/image";
import Link from "next/link";

const fontAseprite = localFont({ src: '../public/fonts/aseprite.otf/aseprite.otf' })

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
      <body className={`min-h-full w-full flex flex-col max-w-500 mx-auto antialiased ${fontAseprite.className}`}>
        <header className="w-full px-5 flex justify-between shadow-md py-2 fixed z-10">
          {/* ==========  ABOUT LINK ========== */}
          {/* ========== GALLERY LINK ========== */}
          {/* ========== SHOP LINK ========== */}
          <Link href="#/shop">
            <Image src="/images/shop.png" alt="Shop" className="dark:invert" height={16 * 2} width={16 * 2} />
          </Link>
          {/* ========== CART LINK ========== */}
          <Link href="#/cart" className="relative">
            <div className="flex items-center">
              <p className="text-sm relative top-1">0</p>
              <Image src="/images/cart.png" alt="Shopping Cart" className="dark:invert" height={16 * 2} width={16 * 2} />
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
