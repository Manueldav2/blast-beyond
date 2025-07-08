import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blast & Beyond',
  description: 'Professional cleaning and maintenance services',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/blastnbeyond_logo.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
