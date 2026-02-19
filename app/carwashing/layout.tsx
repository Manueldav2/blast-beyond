import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pressure Washing & Yard Services Arkansas | Blast & Beyond LLC",
  description:
    "Professional pressure washing, garage cleanouts, yard cleanup, and junk removal in Northwest Arkansas. Free quotes via satellite imaging. Blast & Beyond LLC.",
  alternates: {
    canonical: "/carwashing",
  },
  openGraph: {
    title: "Pressure Washing & Yard Services Arkansas | Blast & Beyond LLC",
    description:
      "Professional pressure washing, garage cleanouts, yard cleanup, and junk removal in Northwest Arkansas by Blast & Beyond LLC.",
    url: "https://blastnbeyond.com/carwashing",
    images: [
      {
        url: "/driveway_clean.webp",
        width: 800,
        height: 600,
        alt: "Blast & Beyond LLC pressure washing driveway Arkansas",
      },
    ],
  },
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Blast & Beyond LLC",
  url: "https://blastnbeyond.com/carwashing",
  telephone: "+14793542848",
  description:
    "Professional pressure washing, garage cleanouts, yard cleanup, and junk removal in Northwest Arkansas.",
  address: {
    "@type": "PostalAddress",
    addressRegion: "AR",
    addressCountry: "US",
  },
  areaServed: "Northwest Arkansas",
  priceRange: "$",
  makesOffer: [
    "Pressure Washing",
    "Garage Cleanouts",
    "Yard Cleanup",
    "Junk Removal",
    "Weed Removal",
  ],
}

export default function CarwashingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {children}
    </>
  )
}
