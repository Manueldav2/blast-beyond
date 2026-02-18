"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, X, ChevronRight } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
}

const galleryImages = [
  { src: "/images/detailing/Audi_Q7_-_Interior_Detail.jpg", vehicle: "Audi Q7", desc: "Interior Detail", alt: "Audi Q7 interior detail Tallahassee FL" },
  { src: "/images/detailing/Audi_Q7_-_Rear_Seats.jpg", vehicle: "Audi Q7", desc: "Rear Seats", alt: "Audi Q7 rear seat cleaning Tallahassee mobile detailing" },
  { src: "/images/detailing/Ceramic_Coated_Honda_Passport.jpg", vehicle: "Honda Passport", desc: "Ceramic Coated", alt: "Honda Passport ceramic coating Tallahassee FL" },
  { src: "/images/detailing/2014_Tahoe_-_Interior_Detail.jpg", vehicle: "Chevrolet Tahoe", desc: "Interior Detail", alt: "Chevrolet Tahoe interior detail Tallahassee" },
  { src: "/images/detailing/2004_Cadillac_DeVille_-_Interior_Restoration.jpg", vehicle: "Cadillac DeVille", desc: "Interior Restoration", alt: "Cadillac DeVille interior restoration Tallahassee FL" },
  { src: "/images/detailing/2004_Cadillac_DeVille_-_Rear_Detail.jpg", vehicle: "Cadillac DeVille", desc: "Rear Detail", alt: "Cadillac DeVille rear detail Tallahassee mobile detailing" },
]

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState<number | null>(null)

  const openLightbox = (i: number) => setLightbox(i)
  const closeLightbox = () => setLightbox(null)
  const prev = () => setLightbox((c) => (c !== null ? (c - 1 + galleryImages.length) % galleryImages.length : null))
  const next = () => setLightbox((c) => (c !== null ? (c + 1) % galleryImages.length : null))

  return (
    <>
      <style>{`
        .gold-border { border: 1px solid rgba(201,168,76,0.15); transition: all 0.4s ease; }
        .gold-border:hover { border-color: rgba(201,168,76,0.4); box-shadow: 0 4px 20px rgba(201,168,76,0.1); }
        .gold-text { background: linear-gradient(135deg, #a88a3d, #f0d78c, #c9a84c); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
      `}</style>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Header */}
        <div className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link
              href="/detailing"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-[#c9a84c] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Detailing
            </Link>
            <span
              className="text-lg font-bold tracking-wider"
              style={{ fontFamily: "var(--font-cinzel)", color: "#c9a84c" }}
            >
              Gallery
            </span>
            <div className="w-[120px]" />
          </div>
        </div>

        {/* Hero */}
        <section className="py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
              className="text-center mb-16"
            >
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-sm mb-4">Our Work</p>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Project{" "}
                <span className="gold-text">Gallery</span>
              </h1>
              <p className="text-white/40 max-w-xl mx-auto">
                Browse our portfolio of detailing work. Click any image for a closer look.
              </p>
            </motion.div>

            {/* Grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {galleryImages.map((img, i) => (
                <motion.div
                  key={img.src}
                  variants={staggerItem}
                  onClick={() => openLightbox(i)}
                  className="relative group rounded-2xl overflow-hidden gold-border bg-[#111] aspect-[4/3] cursor-pointer"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[#c9a84c] text-sm font-semibold">{img.vehicle}</p>
                    <p className="text-white/70 text-sm">{img.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="text-center mt-16"
            >
              <p className="text-white/30 mb-4">Like what you see?</p>
              <Link
                href="/detailing#quote"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-base tracking-wider font-semibold"
                style={{
                  fontFamily: "var(--font-cinzel)",
                  background: "linear-gradient(135deg, #a88a3d, #c9a84c, #e8c547)",
                  color: "#0a0a0a",
                }}
              >
                Request an Estimate
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Lightbox */}
        <AnimatePresence>
          {lightbox !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center"
              onClick={closeLightbox}
            >
              <button
                onClick={closeLightbox}
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all z-10"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <motion.div
                key={lightbox}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="relative w-[90vw] h-[75vh] max-w-5xl"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={galleryImages[lightbox].src}
                  alt={galleryImages[lightbox].alt}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
                <div className="absolute bottom-0 left-0 right-0 text-center py-4">
                  <p className="text-[#c9a84c] font-semibold">{galleryImages[lightbox].vehicle}</p>
                  <p className="text-white/50 text-sm">{galleryImages[lightbox].desc}</p>
                  <p className="text-white/20 text-xs mt-1">{lightbox + 1} / {galleryImages.length}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
