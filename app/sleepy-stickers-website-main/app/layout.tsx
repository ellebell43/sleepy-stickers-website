import "./globals.css";
import localFont from 'next/font/local'

const fontBasis33 = localFont({ src: '../public/fonts/basis33/basis33.ttf' })
const font712Serif = localFont({ src: '../public/fonts/7-12-serif/712_serif.ttf' })
const fontAgamefont = localFont({ src: '../public/fonts/agamefont-font/Agamefont-YB4v.ttf' })
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
      <body className={`min-h-full flex flex-col ${fontAseprite.className}`}>{children}</body>
    </html>
  );
}
