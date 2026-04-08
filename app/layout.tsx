import "./globals.css";
import localFont from 'next/font/local'

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
      <body className={`min-h-full w-full flex flex-col max-w-500 mx-auto ${fontAseprite.className}`}>
        <header className="w-full border px-5">
          <p>header</p>
        </header>
        {children}
      </body>
    </html>
  );
}
