import type { Metadata } from "next"
import { Cinzel, Sora } from "next/font/google"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
})

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Mobile Auto Detailing Tallahassee FL | Blast & Beyond LLC",
  description:
    "Professional mobile auto detailing in Tallahassee, FL. Interior details, exterior wash, ceramic coating & paint protection. We come to you — home, apartment, or workplace. Student discounts available for FAMU, FSU & TCC students.",
}

const businessSchema = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "name": "Blast & Beyond LLC",
  "url": "https://blastnbeyond.com/detailing",
  "telephone": "+14793542848",
  "description": "Professional mobile auto detailing and paint protection in Tallahassee, FL.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Tallahassee",
    "addressRegion": "FL",
    "postalCode": "32301",
    "addressCountry": "US"
  },
  "areaServed": ["Tallahassee", "Quincy", "Havana", "Crawfordville", "Monticello", "Woodville"],
  "priceRange": "$",
  "makesOffer": [
    "Interior Detail", "Exterior Detail", "Full Detail",
    "Ceramic Coating", "Paint Protection", "Headlight Restoration"
  ]
}

export default function DetailingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`${cinzel.variable} ${sora.variable}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
      />
      {children}
    </div>
  )
}
