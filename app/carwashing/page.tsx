"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import {
  Droplets, Truck, Leaf, CheckCircle2, Phone, Mail,
  MapPin, Menu, X, ArrowRight, CreditCard, DollarSign,
  ChevronDown, Star, Home, Car, ChevronLeft
} from "lucide-react"

const easeOut = [0.0, 0.0, 0.2, 1] as [number, number, number, number]

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: easeOut },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
}

const services = [
  {
    icon: <Truck className="w-7 h-7" />,
    title: "Garage Cleanouts + Light Hauling",
    desc: "Clear out, organize, and sweep garages",
    details: [
      "Light junk hauling (non-hazardous items)",
      "Old furniture and boxes removal",
      "Help listing valuable items on Facebook Marketplace",
    ],
  },
  {
    icon: <Droplets className="w-7 h-7" />,
    title: "Pressure Washing",
    desc: "Driveways, patios, porches, fences, sidewalks, trash cans",
    highlight: true,
    details: [
      "Custom Rate: $0.25 per square foot",
      "Free quotes via satellite imaging",
      "In-person inspection for tough jobs",
    ],
  },
  {
    icon: <Leaf className="w-7 h-7" />,
    title: "Light Yard Work + Debris Removal",
    desc: "Weed removal, sweeping, blowing, and cleanup",
    details: [
      "Haul away bagged yard waste",
      "Debris removal",
      "General yard cleanup",
    ],
  },
  {
    icon: <Home className="w-7 h-7" />,
    title: "Roof Washing",
    desc: "Professional roof cleaning services",
    details: [
      "Custom quote after site inspection",
      "Safe and effective cleaning methods",
      "Extends roof life and improves appearance",
      "*Contact us for a custom quote after inspection",
    ],
  },
  {
    icon: <Car className="w-7 h-7" />,
    title: "Car Detailing",
    desc: "Interior + Exterior Detailing Services",
    details: [
      "Custom quote based on vehicle size and condition",
      "Professional interior and exterior cleaning",
      "Paint protection and restoration available",
      "*Contact us for a custom quote after inspection",
    ],
    link: "/detailing",
  },
]

const packages = [
  {
    title: "Basic Refresh",
    desc: "Front driveway (standard 2-car width)",
    features: ["Professional pressure washing", "Removes dirt, grime & stains", "Makes your driveway look new again"],
  },
  {
    title: "Deluxe Refresh",
    desc: "Driveway + Sidewalk + Trash Can Cleaning",
    popular: true,
    features: ["Everything in Basic package", "Sidewalk cleaning", "Trash can cleaning & sanitizing"],
  },
  {
    title: "Premium Refresh",
    desc: "Driveway + Sidewalk + Porch/Patio + Trash Cans",
    features: ["Everything in Deluxe package", "Porch or patio cleaning", "Complete exterior refresh"],
  },
]

const testimonials = [
  {
    quote: "Aiden and Ini did an incredible job on our driveway. It looked like brand new concrete when they were done. The stains we thought were permanent just disappeared. Will definitely be calling them again!",
    name: "Sandra M.",
    location: "Bentonville, AR",
    service: "Pressure Washing",
  },
  {
    quote: "These guys are the real deal. They cleaned out our entire garage in under 3 hours — hauled away old furniture, swept everything, even helped us list some items on Marketplace. Professional and respectful the whole time.",
    name: "Robert & Linda K.",
    location: "Rogers, AR",
    service: "Garage Cleanout",
  },
  {
    quote: "I'm a senior and can't do the yard work like I used to. Blast Beyond came out, cleaned up all the debris, pulled weeds, and left my yard looking beautiful. They were so kind and the price was very fair.",
    name: "Dorothy H.",
    location: "Fayetteville, AR",
    service: "Yard Cleanup",
  },
  {
    quote: "Got the Deluxe Refresh package — driveway, sidewalk, and trash cans. The difference is night and day. My neighbors have already asked me for their number. Great work, great guys.",
    name: "Marcus T.",
    location: "Springdale, AR",
    service: "Deluxe Refresh Package",
  },
]

const galleryImages = [
  { src: "/driveway_clean.webp", label: "Driveway Cleaning" },
  { src: "/driveway2.jpg", label: "Driveway Restoration" },
  { src: "/driveway3.webp", label: "Concrete Wash" },
  { src: "/sidewalk_clean.jpg", label: "Sidewalk Detail" },
  { src: "/garage_clean_out.jpg", label: "Garage Cleanout" },
  { src: "/junk_cleanout.jpeg", label: "Junk Removal" },
  { src: "/junk_removal2.jpg", label: "Hauling Service" },
  { src: "/yard_cleanup.jpg", label: "Yard Cleanup" },
  { src: "/weed_removal.webp", label: "Weed Removal" },
  { src: "/fence.webp", label: "Fence Washing" },
  { src: "/side_patio_clean.jpeg", label: "Patio Clean" },
]

export default function CarWashingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [galleryTab, setGalleryTab] = useState<"washing" | "cleanouts" | "yard">("washing")

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      const form = e.target as HTMLFormElement
      const res = await fetch("/api/contact", {
        method: "POST",
        body: new FormData(form),
      })
      if (!res.ok) throw new Error("Failed")
      setSubmitted(true)
      setSelectedFiles([])
      form.reset()
      setTimeout(() => setSubmitted(false), 5000)
    } catch {
      alert("Something went wrong. Please try again or call us directly.")
    } finally {
      setSubmitting(false)
    }
  }

  const galleryFiltered = {
    washing: galleryImages.slice(0, 4),
    cleanouts: galleryImages.slice(4, 7),
    yard: galleryImages.slice(7),
  }

  const rose = "#AD7A80"
  const roseDark = "#A2676D"

  return (
    <>
      <style>{`
        html { scroll-behavior: smooth; }
        .rose-btn {
          background: linear-gradient(135deg, #A2676D, #AD7A80, #C49499);
          color: white;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .rose-btn:hover {
          box-shadow: 0 8px 24px rgba(173, 122, 128, 0.35);
          transform: translateY(-2px);
        }
        .rose-border {
          border: 1px solid rgba(173, 122, 128, 0.15);
          transition: all 0.4s ease;
        }
        .rose-border:hover {
          border-color: rgba(173, 122, 128, 0.4);
          box-shadow: 0 4px 20px rgba(173, 122, 128, 0.1);
          transform: translateY(-3px);
        }
        .input-rose {
          border: 1px solid #e5d5d7;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          width: 100%;
          background: white;
        }
        .input-rose:focus {
          outline: none;
          border-color: #AD7A80;
          box-shadow: 0 0 0 3px rgba(173, 122, 128, 0.15);
        }
      `}</style>

      <div className="min-h-screen bg-white text-gray-800" style={{ fontFamily: "'Montserrat', Arial, sans-serif" }}>

        {/* ═══ HEADER ═══ */}
        <motion.header
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, ease: easeOut }}
          className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg border-b border-gray-100 shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src="/blastnbeyond_logo.png"
                alt="Blast & Beyond"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
              <span className="text-xl sm:text-2xl font-extrabold tracking-tight" style={{ color: rose }}>
                Blast & Beyond
              </span>
            </div>

            <nav className="hidden md:flex items-center gap-6">
              {["Services", "Pricing", "Quote", "About", "Gallery"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item.toLowerCase())}
                  className="text-sm font-medium text-gray-500 hover:text-[#AD7A80] transition-colors"
                >
                  {item === "Quote" ? "Get a Quote" : item}
                </button>
              ))}
            </nav>

            <div className="hidden md:flex items-center gap-3">
              <a href="tel:4798022157" className="text-sm text-gray-500 hover:text-[#AD7A80] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                (479) 802-2157
              </a>
              <button onClick={() => scrollTo("quote")} className="rose-btn px-5 py-2 rounded-full text-sm">
                Free Quote
              </button>
            </div>

            <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-6 h-6 text-gray-600" /> : <Menu className="w-6 h-6 text-gray-600" />}
            </button>
          </div>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
              >
                <div className="px-6 py-4 space-y-3">
                  {["Services", "Pricing", "Quote", "About", "Gallery"].map((item) => (
                    <button
                      key={item}
                      onClick={() => scrollTo(item.toLowerCase())}
                      className="block text-base text-gray-600 hover:text-[#AD7A80]"
                    >
                      {item === "Quote" ? "Get a Quote" : item}
                    </button>
                  ))}
                  <a href="tel:4798022157" className="flex items-center gap-2 text-[#AD7A80] pt-2 font-semibold">
                    <Phone className="w-4 h-4" />
                    (479) 802-2157
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ═══ HERO ═══ */}
        <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#faf5f5] to-[#EAD7D8]/30 py-20 sm:py-28 lg:py-36">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#AD7A80]/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: easeOut }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#AD7A80]/20 bg-[#AD7A80]/5 text-sm mb-6" style={{ color: rose }}>
                  <MapPin className="w-3.5 h-3.5" />
                  Serving Northwest Arkansas
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 mb-5 leading-[1.1]">
                  Pressure Washing,{" "}
                  <span style={{ color: rose }}>Cleanouts</span> &{" "}
                  <span style={{ color: rose }}>Yard Help</span>
                </h1>
                <p className="text-lg text-gray-500 mb-8 max-w-lg leading-relaxed">
                  Professional home services at fair prices. We transform driveways, patios, garages, and yards across NWA.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button onClick={() => scrollTo("quote")} className="rose-btn px-6 py-3 rounded-full text-base flex items-center gap-2">
                    Request a Free Quote
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button onClick={() => scrollTo("services")} className="px-6 py-3 rounded-full border-2 border-[#AD7A80]/20 text-gray-600 hover:border-[#AD7A80]/40 hover:text-[#AD7A80] transition-all text-base">
                    Our Services
                  </button>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: easeOut }}
                className="hidden lg:block"
              >
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-100">
                    <Image
                      src="/driveway_clean.webp"
                      alt="Professional pressure washing"
                      width={600}
                      height={400}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100">
                    <p className="text-2xl font-bold" style={{ color: rose }}>$0.25</p>
                    <p className="text-xs text-gray-400">per sq ft</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ SERVICES ═══ */}
        <section id="services" className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4" style={{ background: "rgba(173,122,128,0.1)", color: rose }}>
                Our Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                Professional Home Services
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Comprehensive solutions to enhance your home&apos;s exterior and keep things clean
              </p>
            </motion.div>

            {/* Row 1 — first 3 services */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-3 mb-6"
            >
              {services.slice(0, 3).map((svc) => (
                <motion.div
                  key={svc.title}
                  variants={staggerItem}
                  whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(173,122,128,0.2)" }}
                  whileTap={{ scale: 0.98 }}
                  className={`rose-border rounded-2xl p-7 bg-white group cursor-pointer ${svc.highlight ? "border-[#AD7A80] shadow-lg ring-2 ring-[#AD7A80]/25" : ""}`}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(173,122,128,0.1)", color: rose }}>
                    {svc.icon}
                  </div>
                  <h3 className={`text-gray-900 mb-2 text-lg ${svc.highlight ? "font-extrabold" : "font-bold"}`}>{svc.title}</h3>
                  <p className="text-sm text-gray-400 mb-5">{svc.desc}</p>
                  <ul className="space-y-2.5">
                    {svc.details.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-gray-500">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: rose }} />
                        {d}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>

            {/* Row 2 — remaining services */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2"
            >
              {services.slice(3).map((svc) => {
                const card = (
                  <motion.div
                    key={svc.title}
                    variants={staggerItem}
                    whileHover={{ scale: 1.04, boxShadow: "0 8px 32px rgba(173,122,128,0.2)" }}
                    whileTap={{ scale: 0.98 }}
                    className="rose-border rounded-2xl p-7 bg-white group cursor-pointer"
                  >
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: "rgba(173,122,128,0.1)", color: rose }}>
                      {svc.icon}
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{svc.title}</h3>
                    <p className="text-sm text-gray-400 mb-5">{svc.desc}</p>
                    <ul className="space-y-2.5">
                      {svc.details.map((d) => (
                        <li key={d} className="flex items-start gap-2 text-sm text-gray-500">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: rose }} />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
                return svc.link ? <Link key={svc.title} href={svc.link}>{card}</Link> : card
              })}
            </motion.div>
          </div>
        </section>

        {/* ═══ PRICING ═══ */}
        <section id="pricing" className="py-20 sm:py-28 bg-gradient-to-b from-[#faf5f5] to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-14">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4" style={{ background: "rgba(173,122,128,0.1)", color: rose }}>
                Summer Special
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                Flat Rate Packages
              </h2>
              <p className="text-gray-500 max-w-lg mx-auto">
                Simple pricing to refresh your home&apos;s exterior
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-10"
            >
              {packages.map((pkg) => (
                <motion.div
                  key={pkg.title}
                  variants={staggerItem}
                  className={`rose-border rounded-2xl p-6 bg-white relative ${pkg.popular ? "ring-2 ring-[#AD7A80]/30 shadow-lg" : ""}`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white" style={{ background: rose }}>
                      Most Popular
                    </span>
                  )}
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{pkg.title}</h3>
                  <p className="text-sm text-gray-400 mb-5">{pkg.desc}</p>
                  <ul className="space-y-2.5 mb-6">
                    {pkg.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: rose }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => scrollTo("quote")}
                    className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all ${pkg.popular ? "rose-btn" : "border-2 border-[#AD7A80]/20 text-[#AD7A80] hover:bg-[#AD7A80]/5"}`}
                  >
                    Get Quote
                  </button>
                </motion.div>
              ))}
            </motion.div>

            {/* Custom pricing */}
            <motion.div {...fadeInUp} className="rose-border rounded-2xl p-6 sm:p-8 bg-white max-w-3xl mx-auto">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Custom Job Pricing</h3>
                  <p className="text-2xl font-extrabold mb-3" style={{ color: rose }}>$0.25 <span className="text-sm font-normal text-gray-400">per sq ft</span></p>
                  <ul className="space-y-2">
                    {["Extra-large patios", "Multi-car driveways", "Fences and decks"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle2 className="w-4 h-4" style={{ color: rose }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">Free Quote Process</h3>
                  <ul className="space-y-2">
                    {["Satellite imaging for most jobs", "In-person inspection when needed", "No obligation quotes"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle2 className="w-4 h-4" style={{ color: rose }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ QUOTE FORM ═══ */}
        <section id="quote" className="py-20 sm:py-28">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4" style={{ background: "rgba(173,122,128,0.1)", color: rose }}>
                Get Started
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                Request a Free Quote
              </h2>
              <p className="text-gray-500">Fill out this form and we&apos;ll get back to you quickly</p>
            </motion.div>

            <motion.div {...fadeInUp}>
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                autoComplete="on"
                className="rose-border rounded-2xl p-6 sm:p-8 bg-white shadow-sm space-y-5"
              >
                <input type="hidden" name="_subject" value="New Car Wash Quote Request" />
                <input type="hidden" name="_source" value="carwashing" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cw-name" className="block text-sm font-medium text-gray-600 mb-1.5">Full Name *</label>
                    <input id="cw-name" name="name" required placeholder="Your full name" autoComplete="name" className="input-rose" />
                  </div>
                  <div>
                    <label htmlFor="cw-email" className="block text-sm font-medium text-gray-600 mb-1.5">Email *</label>
                    <input id="cw-email" name="email" type="email" required placeholder="you@email.com" autoComplete="email" className="input-rose" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cw-phone" className="block text-sm font-medium text-gray-600 mb-1.5">Phone *</label>
                    <input id="cw-phone" name="phone" type="tel" required placeholder="(555) 555-5555" autoComplete="tel" className="input-rose" />
                  </div>
                  <div>
                    <label htmlFor="cw-address" className="block text-sm font-medium text-gray-600 mb-1.5">Address *</label>
                    <input id="cw-address" name="address" required placeholder="Your address or neighborhood" autoComplete="street-address" className="input-rose" />
                  </div>
                </div>

                <div>
                  <label htmlFor="cw-message" className="block text-sm font-medium text-gray-600 mb-1.5">Tell us about your project *</label>
                  <textarea
                    id="cw-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="What services do you need? Include details like driveway size, specific areas, etc."
                    autoComplete="on"
                    className="input-rose resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">Upload Photos (Optional)</label>
                  <label
                    className={`relative block input-rose text-center py-6 border-dashed cursor-pointer transition-colors ${
                      selectedFiles.length > 0 ? "border-[#AD7A80] bg-[#AD7A80]/5" : "hover:border-[#AD7A80]"
                    }`}
                  >
                    <input
                      type="file"
                      name="photos"
                      multiple
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const files = e.target.files
                        if (files) setSelectedFiles(Array.from(files))
                      }}
                    />
                    {selectedFiles.length > 0 ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 mx-auto mb-1.5" style={{ color: "#AD7A80" }} />
                        <p className="text-sm font-medium" style={{ color: "#AD7A80" }}>
                          {selectedFiles.length} photo{selectedFiles.length !== 1 ? "s" : ""} selected
                        </p>
                        <div className="mt-1.5 space-y-0.5 max-h-20 overflow-y-auto">
                          {selectedFiles.map((f, i) => (
                            <p key={i} className="text-xs text-gray-400 truncate max-w-xs mx-auto">{f.name}</p>
                          ))}
                        </div>
                        <p className="text-xs text-gray-300 mt-1.5">Click to change</p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-gray-400">Click to upload photos of the area</p>
                        <p className="text-xs text-gray-300 mt-1">Helps us provide a more accurate quote</p>
                      </>
                    )}
                  </label>
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-4"
                    >
                      <CheckCircle2 className="w-8 h-8 mx-auto mb-2" style={{ color: rose }} />
                      <p className="font-semibold" style={{ color: rose }}>Quote request submitted!</p>
                      <p className="text-gray-400 text-sm">We&apos;ll get back to you soon.</p>
                    </motion.div>
                  ) : (
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rose-btn w-full py-3 rounded-xl text-base disabled:opacity-50"
                    >
                      {submitting ? "Submitting..." : "Request Free Quote"}
                    </button>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </section>

        {/* ═══ PAYMENT ═══ */}
        <section className="py-16 bg-[#faf5f5]/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="rose-border rounded-2xl p-6 sm:p-8 bg-white">
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">Invoicing & Payment</h3>
                  <p className="text-sm text-gray-400 mb-4">We use InvoiceFly for simple, professional invoicing</p>
                  <p className="text-sm text-gray-500 mb-4">What we need:</p>
                  <ul className="space-y-2">
                    {["Name", "Address", "Phone number", "List of services requested"].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-gray-500">
                        <CheckCircle2 className="w-4 h-4" style={{ color: rose }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Options</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: <CreditCard className="w-5 h-5" />, label: "Card (InvoiceFly)" },
                      { icon: <DollarSign className="w-5 h-5" />, label: "Cash" },
                      { icon: <CheckCircle2 className="w-5 h-5" />, label: "Check" },
                      { icon: <Phone className="w-5 h-5" />, label: "Venmo" },
                    ].map((pay) => (
                      <div key={pay.label} className="flex items-center gap-2.5 p-3 rounded-xl bg-[#faf5f5] text-sm text-gray-600">
                        <span style={{ color: rose }}>{pay.icon}</span>
                        {pay.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ ABOUT ═══ */}
        <section id="about" className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src="/Blast_And_Beyond_Logo.JPG"
                    alt="Aiden and Ini from Blast Beyond"
                    width={600}
                    height={600}
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </motion.div>
              <motion.div {...fadeInUp}>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4" style={{ background: "rgba(173,122,128,0.1)", color: rose }}>
                  About Us
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-5">
                  Meet Aiden & Ini
                </h2>
                <div className="space-y-4 text-gray-500 leading-relaxed">
                  <p>
                    We&apos;re two hardworking college students from Northwest Arkansas who started Blast &amp; Beyond to provide reliable home refresh services at a fair price.
                  </p>
                  <p>
                    We&apos;re passionate about doing things right, working hard, and helping our community — especially seniors — get their homes looking their best.
                  </p>
                  <p>
                    Our business is built on reliability, respect, and quality work at fair prices. We take pride in transforming driveways, patios, and garages across NWA.
                  </p>
                </div>
                <button onClick={() => scrollTo("quote")} className="rose-btn mt-6 px-6 py-3 rounded-full text-base inline-flex items-center gap-2">
                  Get in Touch <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ TESTIMONIALS ═══ */}
        <section className="py-20 sm:py-28 bg-gradient-to-b from-[#faf5f5] to-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4" style={{ background: "rgba(173,122,128,0.1)", color: rose }}>
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                What Our Customers Say
              </h2>
            </motion.div>

            <div className="relative max-w-2xl mx-auto">
              <div className="rose-border rounded-2xl p-8 sm:p-10 bg-white shadow-sm" style={{ minHeight: "240px" }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTestimonial}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35 }}
                  >
                    <div className="flex gap-0.5 justify-center mb-4">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star key={s} className="w-5 h-5 fill-[#AD7A80]" style={{ color: rose }} />
                      ))}
                    </div>
                    <p className="text-gray-600 text-base sm:text-lg italic leading-relaxed text-center mb-5">
                      &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                    </p>
                    <div className="text-center">
                      <p className="font-semibold text-gray-800">&mdash; {testimonials[activeTestimonial].name}</p>
                      <p className="text-sm text-gray-400">{testimonials[activeTestimonial].service}</p>
                      <p className="text-xs text-gray-300 mt-0.5">{testimonials[activeTestimonial].location}</p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <button
                onClick={() => setActiveTestimonial((p) => (p - 1 + testimonials.length) % testimonials.length)}
                className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-5 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-[#AD7A80] hover:border-[#AD7A80]/30 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                onClick={() => setActiveTestimonial((p) => (p + 1) % testimonials.length)}
                className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-5 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-[#AD7A80] hover:border-[#AD7A80]/30 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </button>

              <div className="flex justify-center gap-2 mt-5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${i === activeTestimonial ? "w-6" : "w-2"}`}
                    style={{ background: i === activeTestimonial ? rose : "#e5d5d7" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ═══ GALLERY ═══ */}
        <section id="gallery" className="py-20 sm:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-10">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase mb-4" style={{ background: "rgba(173,122,128,0.1)", color: rose }}>
                Our Work
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                See the Difference
              </h2>
            </motion.div>

            <div className="flex justify-center gap-2 mb-8">
              {([["washing", "Pressure Washing"], ["cleanouts", "Cleanouts"], ["yard", "Yard Work"]] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setGalleryTab(key)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    galleryTab === key
                      ? "text-white shadow-md"
                      : "text-gray-500 bg-gray-100 hover:bg-gray-200"
                  }`}
                  style={galleryTab === key ? { background: rose } : {}}
                >
                  {label}
                </button>
              ))}
            </div>

            <motion.div
              key={galleryTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {galleryFiltered[galleryTab].map((img) => (
                <div key={img.src} className="relative group rounded-xl overflow-hidden rose-border aspect-square bg-gray-100">
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="absolute bottom-3 left-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ═══ FOOTER ═══ */}
        <footer className="bg-gray-50 border-t border-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Droplets className="w-5 h-5" style={{ color: rose }} />
                  <span className="text-lg font-bold text-gray-900">Blast & Beyond</span>
                </div>
                <p className="text-sm text-gray-400">
                  Pressure Washing, Cleanouts & Yard Help — Serving NWA
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Contact Us</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> (479) 802-2157</li>
                  <li className="flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> (479) 354-2848</li>
                  <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> aiden.deshommes@gmail.com</li>
                  <li className="flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> inisamade@gmail.com</li>
                  <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> Fayetteville, Springdale, Bentonville, Rogers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-3">Payments Accepted</h4>
                <ul className="space-y-2 text-sm text-gray-400">
                  <li>Card (via InvoiceFly)</li>
                  <li>Cash</li>
                  <li>Check</li>
                  <li>Venmo</li>
                </ul>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-gray-200 text-center text-xs text-gray-300">
              &copy; {new Date().getFullYear()} Blast & Beyond LLC. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Floating CTA — mobile only */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="fixed bottom-6 right-6 z-40 md:hidden"
        >
          <button
            onClick={() => scrollTo("quote")}
            className="rose-btn w-14 h-14 rounded-full flex items-center justify-center shadow-xl"
          >
            <Mail className="w-6 h-6" />
          </button>
        </motion.div>

        {/* Back to Service Selector — persistent bottom-left */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 1, duration: 0.5, ease: easeOut }}
          className="fixed bottom-6 left-6 z-40"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-gray-200 shadow-lg text-sm font-medium text-gray-600 hover:text-[#AD7A80] hover:border-[#AD7A80]/30 transition-all hover:shadow-xl"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">All Services</span>
            <span className="sm:hidden">Back</span>
          </Link>
        </motion.div>
      </div>
    </>
  )
}
