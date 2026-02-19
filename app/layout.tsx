import type { Metadata } from 'next'
import './globals.css'

const siteUrl = 'https://blastnbeyond.com'

export const metadata: Metadata = {
  title: {
    default: 'Blast & Beyond LLC | Professional Cleaning & Auto Detailing Services',
    template: '%s | Blast & Beyond LLC',
  },
  description:
    'Blast & Beyond LLC offers professional mobile auto detailing in Tallahassee FL and pressure washing services in Northwest Arkansas. Interior & exterior detailing, ceramic coating, paint protection, pressure washing, and yard services.',
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'Blast & Beyond LLC',
    title: 'Blast & Beyond LLC | Professional Cleaning & Auto Detailing Services',
    description:
      'Blast & Beyond LLC offers professional mobile auto detailing in Tallahassee FL and pressure washing services in Northwest Arkansas.',
    images: [
      {
        url: '/Blast_And_Beyond_Logo.JPG',
        width: 800,
        height: 600,
        alt: 'Blast & Beyond LLC Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blast & Beyond LLC',
    description:
      'Professional mobile auto detailing in Tallahassee FL and pressure washing in Northwest Arkansas.',
    images: ['/Blast_And_Beyond_Logo.JPG'],
  },
  keywords: [
    'Blast & Beyond LLC',
    'Blast and Beyond LLC',
    'Blast and Beyond',
    'blastnbeyond',
    'mobile auto detailing Tallahassee',
    'pressure washing Arkansas',
    'ceramic coating Tallahassee FL',
    'car detailing near me',
    'mobile detailing Tallahassee FL',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
}

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Blast & Beyond LLC',
  alternateName: ['Blast and Beyond LLC', 'Blast and Beyond', 'Blast & Beyond'],
  url: siteUrl,
  logo: `${siteUrl}/Blast_And_Beyond_Logo.JPG`,
  image: `${siteUrl}/Blast_And_Beyond_Logo.JPG`,
  description:
    'Professional mobile auto detailing and pressure washing services. Serving Tallahassee FL and Northwest Arkansas.',
  telephone: '+14793542848',
  foundingDate: '2024',
  areaServed: [
    {
      '@type': 'City',
      name: 'Tallahassee',
      containedInPlace: { '@type': 'State', name: 'Florida' },
    },
    {
      '@type': 'State',
      name: 'Arkansas',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile Auto Detailing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Ceramic Coating' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Pressure Washing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Yard Services' } },
    ],
  },
  sameAs: [
    'https://www.google.com/maps/place/Blast+%26+Beyond+LLC',
  ],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Blast & Beyond LLC',
  alternateName: ['Blast and Beyond LLC', 'Blast and Beyond'],
  url: siteUrl,
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
