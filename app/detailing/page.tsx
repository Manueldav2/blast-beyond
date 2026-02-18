"use client"

import { useState, useRef, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Phone, MapPin, Clock, Star, Shield, Droplets, Sparkles,
  ChevronDown, CheckCircle2, Menu, X, Camera, Mail,
  Car, Gift, Calendar, Users, Zap, Sun, ArrowRight,
  GraduationCap, Paintbrush, CircleDot, Waves, Bug,
  Scissors, Wind, Eye, RefreshCw, Heart, Award, ChevronLeft
} from "lucide-react"

/* ─── animation variants ─── */
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number]

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, ease },
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

/* ─── data ─── */
const baseServices = [
  {
    title: "Interior Detail",
    price: "$75",
    label: "starting",
    time: "1.5–2 hours",
    icon: <Car className="w-6 h-6" />,
    description: "Ideal for regularly maintained vehicles or first-time interior care.",
    features: [
      "Full vacuum (seats, carpets, mats)",
      "Interior surface cleaning",
      "Leather cleaned & conditioned",
      "Interior glass cleaned",
      "Light door jamb wipe-down",
    ],
  },
  {
    title: "Exterior Detail",
    price: "$75",
    label: "starting",
    time: "1.5–2 hours",
    icon: <Droplets className="w-6 h-6" />,
    description: "Professional hand wash and protection for daily drivers.",
    features: [
      "Bug and road film pre-treatment",
      "Foam + hand wash",
      "Wheel and tire cleaning with dressing",
      "Trim cleaned and refreshed",
      "Exterior glass cleaned",
    ],
  },
  {
    title: "Student Discount",
    price: "$50",
    label: "starting",
    time: "1–1.5 hours",
    icon: <GraduationCap className="w-6 h-6" />,
    badge: "FAMU • FSU • TCC",
    description: "Available for students with valid ID. Interior or Exterior only.",
    features: [
      "Same scope as base packages",
      "Valid student ID required",
      "Lightly used vehicles",
      "Interior OR Exterior",
      "Upsells priced separately",
    ],
  },
]

const premiumServices = [
  {
    title: "Standard Full Detail",
    price: "$200",
    label: "starting",
    time: "2.5–3 hours",
    description: "Comprehensive interior and exterior detail with off-the-lot results — ideal for higher-mileage or neglected vehicles.",
    features: [
      "Complete interior + exterior",
      "Steam cleaning treatment",
      "Enhanced protection applied",
      "Door jambs detailed",
      "Ideal for regular maintenance",
    ],
  },
  {
    title: "Premium Detail",
    price: "$250–$300",
    label: "starting",
    time: "2.5–3 hours",
    popular: true,
    description: "Deep restoration and decontamination with enhanced protection.",
    features: [
      "Deep interior restoration",
      "Exterior decontamination",
      "Enhanced protection",
      "First-time client recommended",
      "Significant correction work",
    ],
  },
]

const addOns = [
  { title: "Hand Wax", price: "$25", desc: "Quick shine boost and 6-8 weeks of protection.", icon: <Sparkles className="w-5 h-5" /> },
  { title: "Clay Bar Decontamination", price: "$50", desc: "Removes embedded contaminants for a smooth finish.", icon: <CircleDot className="w-5 h-5" /> },
  { title: "Steam Cleaning", price: "$50", desc: "Deep sanitization for interior surfaces and vents.", icon: <Wind className="w-5 h-5" /> },
  { title: "Headlight Restoration", price: "$50", desc: "Restores clarity and brightness to foggy headlights.", icon: <Eye className="w-5 h-5" /> },
  { title: "Pet Hair Removal", price: "$30–$50", desc: "Thorough removal of pet hair. Price based on severity.", icon: <Scissors className="w-5 h-5" /> },
  { title: "Carpet & Seat Extraction", price: "$50+", desc: "Deep cleans tough stains and removes odors.", icon: <Waves className="w-5 h-5" /> },
]

const galleryImages = [
  { src: "/images/detailing/Audi_Q7_-_Interior_Detail.jpg", vehicle: "Audi Q7", desc: "Interior Detail", alt: "Audi Q7 interior detail Tallahassee FL" },
  { src: "/images/detailing/Audi_Q7_-_Rear_Seats.jpg", vehicle: "Audi Q7", desc: "Rear Seats", alt: "Audi Q7 rear seat cleaning Tallahassee mobile detailing" },
  { src: "/images/detailing/Ceramic_Coated_Honda_Passport.jpg", vehicle: "Honda Passport", desc: "Ceramic Coated", alt: "Honda Passport ceramic coating Tallahassee FL" },
  { src: "/images/detailing/2014_Tahoe_-_Interior_Detail.jpg", vehicle: "Chevrolet Tahoe", desc: "Interior Detail", alt: "Chevrolet Tahoe interior detail Tallahassee" },
  { src: "/images/detailing/2004_Cadillac_DeVille_-_Interior_Restoration.jpg", vehicle: "Cadillac DeVille", desc: "Interior Restoration", alt: "Cadillac DeVille interior restoration Tallahassee FL" },
  { src: "/images/detailing/2004_Cadillac_DeVille_-_Rear_Detail.jpg", vehicle: "Cadillac DeVille", desc: "Rear Detail", alt: "Cadillac DeVille rear detail Tallahassee mobile detailing" },
]

const testimonials = [
  {
    quote: "D completely transformed my Q7. The interior looked brand new — every surface was spotless, leather was conditioned perfectly, and it smelled amazing. You can tell he genuinely cares about the work. I've already booked my next appointment.",
    name: "Marcus J.",
    service: "Interior Detail",
    location: "Tallahassee, FL",
  },
  {
    quote: "I brought my Tahoe in after a road trip with the kids and honestly thought the stains were permanent. Blast & Beyond got everything out — seats, carpets, door panels, all of it. Better than when I bought it. Worth every dollar.",
    name: "Brianna T.",
    service: "Premium Detail",
    location: "Killearn Estates",
  },
  {
    quote: "Got the 5-year ceramic coating on my Passport and the results are unreal. Water literally rolls right off and the paint has this deep showroom gloss. D walked me through the whole process and was super professional. Highly recommend.",
    name: "Jaylen W.",
    service: "Ceramic Coating",
    location: "Midtown Tallahassee",
  },
  {
    quote: "As a student at FAMU I was on a tight budget but still wanted my car looking right. The student discount made it affordable and D still gave me the full treatment. My car hasn't looked this good since I drove it off the lot.",
    name: "Destiny A.",
    service: "Student Discount — Exterior",
    location: "FAMU Campus",
  },
  {
    quote: "I've tried other detailers in Tallahassee and nobody comes close. The attention to detail is on another level — door jambs, vents, trim, everything. Plus he comes to you which makes it so convenient. Blast & Beyond is the only one I trust with my DeVille.",
    name: "Kevin R.",
    service: "Standard Full Detail",
    location: "Havana, FL",
  },
]

const faqItems = [
  {
    q: "How much does mobile auto detailing cost in Tallahassee?",
    a: "Our services start at $50 for students and $75 for interior or exterior details. Standard full details start at $200 and premium details at $250–$300. Final pricing depends on vehicle size and condition. Submit a quote request for a personalized estimate.",
  },
  {
    q: "Do you detail cars at apartments and dorms?",
    a: "Yes! We're fully mobile and come to you — whether that's your apartment complex, dorm parking lot, home driveway, or workplace. We serve FAMU, FSU, and TCC campus areas regularly.",
  },
  {
    q: "How long does a full car detail take?",
    a: "A standard full detail takes approximately 2.5–3 hours. Interior or exterior-only services take about 1.5–2 hours. Timing may vary based on vehicle size and condition.",
  },
  {
    q: "What is the difference between a standard and premium detail?",
    a: "The standard full detail covers comprehensive interior and exterior cleaning with steam treatment. The premium detail adds deep restoration, exterior decontamination, and enhanced protection — recommended for first-time clients or neglected vehicles.",
  },
  {
    q: "Do you offer ceramic coating in Tallahassee?",
    a: "Yes, we offer 3-year graphene, 5-year ceramic, and 8-year ceramic coating options. All ceramic services include wash, decontamination, and panel prep. Coatings are offered by consultation to ensure the best results.",
  },
  {
    q: "Is there a student discount for FAMU, FSU, or TCC students?",
    a: "Yes! Students with a valid ID from FAMU, FSU, or TCC can get interior or exterior details starting at $50. It's the same quality service at a student-friendly price.",
  },
  {
    q: "How do I book a mobile detail in Tallahassee?",
    a: "You can request a quote directly on our website, call us at (479) 354-2848, or submit photos of your vehicle for a personalized estimate. We'll confirm your appointment and come to your location.",
  },
  {
    q: "How far do you travel for mobile detailing?",
    a: "We're based in Tallahassee and travel up to 25+ miles to surrounding areas including Quincy, Havana, Crawfordville, Monticello, Woodville, and Midway.",
  },
  {
    q: "What areas near Tallahassee do you serve?",
    a: "We serve Tallahassee and the surrounding areas: North Tallahassee, Quincy, Havana, Crawfordville, Monticello, Woodville, and Midway. Target ZIP codes include 32301, 32303, 32304, 32308, and 32312.",
  },
]

const serviceAreas = [
  "North Tallahassee", "Quincy", "Havana", "Crawfordville",
  "Monticello", "Woodville", "Midway",
]
const targetZips = ["32301", "32303", "32304", "32308", "32312"]

const serviceCheckboxes = [
  "Interior Detail", "Exterior Detail", "Student Discount",
  "Standard Full Detail", "Premium Detail", "Ceramic Coating", "Maintenance Plan",
]

/* ─── component ─── */
export default function DetailingPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [reviewOpen, setReviewOpen] = useState(false)
  const [reviewRating, setReviewRating] = useState(0)
  const [reviewHover, setReviewHover] = useState(0)
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

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

  const handleReviewSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setReviewSubmitting(true)
    try {
      const form = e.target as HTMLFormElement
      const formData = new FormData(form)
      formData.set("rating", String(reviewRating))
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      })
      if (!res.ok) throw new Error("Failed")
      setReviewSubmitted(true)
      setReviewRating(0)
      form.reset()
      setTimeout(() => {
        setReviewSubmitted(false)
        setReviewOpen(false)
      }, 4000)
    } catch {
      alert("Something went wrong. Please try again.")
    } finally {
      setReviewSubmitting(false)
    }
  }

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMenuOpen(false)
  }

  return (
    <>
      {/* ─── injected styles ─── */}
      <style>{`
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes floatParticle {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0; }
          100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(201,168,76,0.1); }
          50% { box-shadow: 0 0 40px rgba(201,168,76,0.25); }
        }
        @keyframes grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); }
          30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); }
          50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); }
          70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); }
          90% { transform: translate(-10%, 10%); }
        }
        .gold-text {
          background: linear-gradient(135deg, #a88a3d 0%, #f0d78c 25%, #c9a84c 50%, #f0d78c 75%, #a88a3d 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s ease-in-out infinite;
        }
        .gold-border {
          border: 1px solid rgba(201,168,76,0.15);
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .gold-border:hover {
          border-color: rgba(201,168,76,0.5);
          box-shadow: 0 0 30px rgba(201,168,76,0.12), 0 0 60px rgba(201,168,76,0.06);
          transform: translateY(-4px);
        }
        .gold-btn {
          background: linear-gradient(135deg, #a88a3d, #c9a84c, #f0d78c, #c9a84c, #a88a3d);
          background-size: 300% 300%;
          animation: shimmer 3s ease-in-out infinite;
          color: #0a0a0a;
          font-weight: 600;
          transition: all 0.3s ease;
        }
        .gold-btn:hover {
          box-shadow: 0 0 30px rgba(201,168,76,0.4);
          transform: translateY(-2px);
        }
        .noise::before {
          content: '';
          position: fixed;
          top: -50%;
          left: -50%;
          right: -50%;
          bottom: -50%;
          width: 200%;
          height: 200%;
          background: transparent url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='512' height='512' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E") repeat;
          animation: grain 8s steps(10) infinite;
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }
        .input-dark {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.1);
          color: white;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.3s ease;
          font-size: 0.95rem;
          width: 100%;
        }
        .input-dark:focus {
          outline: none;
          border-color: rgba(201,168,76,0.6);
          box-shadow: 0 0 20px rgba(201,168,76,0.1);
          background: rgba(255,255,255,0.05);
        }
        .input-dark::placeholder {
          color: rgba(255,255,255,0.3);
        }
        .checkbox-gold {
          appearance: none;
          width: 18px;
          height: 18px;
          border: 1.5px solid rgba(201,168,76,0.4);
          border-radius: 4px;
          background: rgba(255,255,255,0.03);
          cursor: pointer;
          transition: all 0.2s ease;
          flex-shrink: 0;
          position: relative;
        }
        .checkbox-gold:checked {
          background: #c9a84c;
          border-color: #c9a84c;
        }
        .checkbox-gold:checked::after {
          content: '✓';
          position: absolute;
          color: #0a0a0a;
          font-size: 12px;
          font-weight: bold;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
        }
        html { scroll-behavior: smooth; }
      `}</style>

      <div className="bg-[#0a0a0a] text-white min-h-screen noise relative" style={{ fontFamily: "var(--font-sora)" }}>

        {/* ═══════════════ HEADER ═══════════════ */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#0a0a0a]/80 border-b border-white/5"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
            {/* Logo */}
            <Link href="/detailing" className="flex items-center gap-3 group">
              <Image
                src="/images/detailing/Blast_Beyond_LLC.png"
                alt="Blast & Beyond LLC"
                width={40}
                height={40}
                className="rounded transition-transform group-hover:scale-110"
              />
              <div className="hidden sm:block">
                <p className="text-sm font-semibold tracking-wider gold-text" style={{ fontFamily: "var(--font-cinzel)" }}>
                  BLAST & BEYOND
                </p>
                <p className="text-[10px] tracking-[0.2em] text-white/40 uppercase">Auto Detailing</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {["Services", "About", "Gallery", "Quote"].map((item) => (
                item === "Gallery" ? (
                  <Link
                    key={item}
                    href="/detailing/gallery"
                    className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors tracking-wide uppercase"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    Gallery
                  </Link>
                ) : (
                  <button
                    key={item}
                    onClick={() => scrollTo(item.toLowerCase())}
                    className="text-sm text-white/50 hover:text-[#c9a84c] transition-colors tracking-wide uppercase"
                    style={{ fontFamily: "var(--font-sora)" }}
                  >
                    {item === "Quote" ? "Book Now" : item}
                  </button>
                )
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <a href="tel:4793542848" className="flex items-center gap-2 text-sm text-white/60 hover:text-[#c9a84c] transition-colors">
                <Phone className="w-4 h-4" />
                (479) 354-2848
              </a>
              <button
                onClick={() => scrollTo("quote")}
                className="gold-btn px-5 py-2 rounded-full text-sm tracking-wide"
              >
                Get Quote
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-white/60"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/5 overflow-hidden"
              >
                <div className="px-6 py-6 space-y-4">
                  {["Services", "About", "Gallery", "Quote"].map((item) => (
                    item === "Gallery" ? (
                      <Link
                        key={item}
                        href="/detailing/gallery"
                        className="block text-lg text-white/70 hover:text-[#c9a84c] transition-colors"
                      >
                        Gallery
                      </Link>
                    ) : (
                    <button
                      key={item}
                      onClick={() => scrollTo(item.toLowerCase())}
                      className="block text-lg text-white/70 hover:text-[#c9a84c] transition-colors"
                    >
                      {item === "Quote" ? "Book Now" : item}
                    </button>
                    )
                  ))}
                  <a
                    href="tel:4793542848"
                    className="flex items-center gap-2 text-[#c9a84c] pt-2"
                  >
                    <Phone className="w-5 h-5" />
                    (479) 354-2848
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>

        {/* ═══════════════ HERO ═══════════════ */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
          {/* Particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  background: `rgba(201, 168, 76, ${Math.random() * 0.5 + 0.2})`,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animation: `floatParticle ${Math.random() * 10 + 8}s ${Math.random() * 5}s infinite`,
                }}
              />
            ))}
          </div>

          {/* Radial gradient bg */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08)_0%,transparent_70%)]" />
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />

          <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8"
            >
              <Image
                src="/images/detailing/Blast_Beyond_LLC.png"
                alt="Blast & Beyond LLC"
                width={200}
                height={200}
                className="mx-auto"
                priority
              />
            </motion.div>

            {/* Location badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#c9a84c]/20 bg-[#c9a84c]/5 mb-8"
            >
              <MapPin className="w-4 h-4 text-[#c9a84c]" />
              <span className="text-sm text-white/70 tracking-wide">Tallahassee, FL &bull; Mobile Service</span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Professional Mobile{" "}
              <span className="gold-text">Auto Detailing</span>{" "}
              <span className="text-white/90">&</span>{" "}
              <span className="gold-text">Paint Protection</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7 }}
              className="text-lg sm:text-xl text-white/40 tracking-[0.15em] uppercase mb-10"
              style={{ fontFamily: "var(--font-cinzel)" }}
            >
              Driven by Design. Powered by Protection.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={() => scrollTo("quote")}
                className="gold-btn px-8 py-3.5 rounded-full text-base tracking-wider flex items-center gap-2"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Book Now
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => scrollTo("quote")}
                className="px-8 py-3.5 rounded-full border border-white/10 text-white/70 hover:text-white hover:border-white/30 transition-all text-base tracking-wide flex items-center gap-2"
              >
                <Camera className="w-4 h-4" />
                Submit Photos
              </button>
              <a
                href="tel:4793542848"
                className="px-8 py-3.5 rounded-full border border-white/10 text-white/70 hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-all text-base tracking-wide flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                (479) 354-2848
              </a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-6 h-6 text-[#c9a84c]/50" />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══════════════ BASE SERVICES ═══════════════ */}
        <section id="services" className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-sm mb-4">Our Services</p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Tailored to{" "}
                <span className="gold-text">Your Vehicle</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto text-base leading-relaxed">
                All services are fully mobile and performed at your home, apartment, or workplace.
                Pricing based on vehicle size and condition. Time estimates may vary slightly.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {baseServices.map((svc, i) => (
                <motion.div
                  key={svc.title}
                  variants={staggerItem}
                  className="gold-border rounded-2xl p-6 sm:p-8 bg-[#111] relative overflow-hidden group"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {svc.badge && (
                      <span className="inline-block px-3 py-1 rounded-full bg-[#c9a84c]/10 text-[#c9a84c] text-xs tracking-wider mb-4">
                        {svc.badge}
                      </span>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2.5 rounded-xl bg-[#c9a84c]/10 text-[#c9a84c]">
                        {svc.icon}
                      </div>
                      <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-cinzel)" }}>{svc.title}</h3>
                    </div>

                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold gold-text">{svc.price}</span>
                      <span className="text-white/30 text-sm">{svc.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/40 text-sm mb-4">
                      <Clock className="w-3.5 h-3.5" />
                      {svc.time}
                    </div>

                    <p className="text-white/50 text-sm mb-5 leading-relaxed">{svc.description}</p>

                    <ul className="space-y-2.5 mb-6">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-white/60">
                          <CheckCircle2 className="w-4 h-4 text-[#c9a84c] mt-0.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => scrollTo("quote")}
                      className="w-full py-3 rounded-xl border border-[#c9a84c]/20 text-[#c9a84c] hover:bg-[#c9a84c]/10 transition-all text-sm tracking-wider"
                    >
                      Get Quote
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ═══════════════ STANDARD & PREMIUM ═══════════════ */}
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-sm mb-4">Standard & Premium</p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Deeper Cleaning &{" "}
                <span className="gold-text">Restoration</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto">
                For vehicles requiring deeper cleaning or first-time restoration.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
            >
              {premiumServices.map((svc) => (
                <motion.div
                  key={svc.title}
                  variants={staggerItem}
                  className={`gold-border rounded-2xl p-6 sm:p-8 relative overflow-hidden group ${
                    svc.popular
                      ? "bg-gradient-to-b from-[#c9a84c]/10 to-[#111] border-[#c9a84c]/30"
                      : "bg-[#111]"
                  }`}
                  style={svc.popular ? { animation: "pulse-glow 4s ease-in-out infinite" } : {}}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-[#c9a84c]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">
                    {svc.popular && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#c9a84c] text-[#0a0a0a] text-xs font-bold tracking-wider mb-4">
                        <Star className="w-3 h-3" fill="currentColor" />
                        MOST POPULAR
                      </span>
                    )}

                    <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: "var(--font-cinzel)" }}>
                      {svc.title}
                    </h3>

                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-bold gold-text">{svc.price}</span>
                      <span className="text-white/30 text-sm">{svc.label}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-white/40 text-sm mb-5">
                      <Clock className="w-3.5 h-3.5" />
                      {svc.time}
                    </div>

                    <p className="text-white/50 text-sm mb-5 leading-relaxed">{svc.description}</p>

                    <ul className="space-y-2.5 mb-6">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-start gap-2.5 text-sm text-white/60">
                          <CheckCircle2 className="w-4 h-4 text-[#c9a84c] mt-0.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => scrollTo("quote")}
                      className={`w-full py-3 rounded-xl text-sm tracking-wider transition-all ${
                        svc.popular
                          ? "gold-btn"
                          : "border border-[#c9a84c]/20 text-[#c9a84c] hover:bg-[#c9a84c]/10"
                      }`}
                    >
                      Get Quote
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ═══════════════ MAINTENANCE PLANS ═══════════════ */}
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-sm mb-4">Maintenance Plans</p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Keep Your Vehicle{" "}
                <span className="gold-text">Pristine</span>
              </h2>
              <p className="text-white/40 max-w-xl mx-auto">
                Regular maintenance keeps your vehicle looking its best and protects your investment.
                Enroll in a plan that fits your schedule.
              </p>
              <p className="text-white/30 text-sm mt-3">
                Note: Initial steam clean required before enrollment to establish baseline condition.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12"
            >
              {[
                { icon: <RefreshCw className="w-6 h-6" />, title: "Discounted Rates", desc: "Save on recurring services" },
                { icon: <Calendar className="w-6 h-6" />, title: "Priority Booking", desc: "Skip the wait times" },
                { icon: <Shield className="w-6 h-6" />, title: "Ceramic Maintenance", desc: "Specialized care available" },
                { icon: <Clock className="w-6 h-6" />, title: "Flexible Scheduling", desc: "Bi-weekly, monthly, or custom" },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className="gold-border rounded-xl p-6 bg-[#111] text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c]">
                    {item.icon}
                  </div>
                  <p className="font-semibold text-sm text-white/80">{item.title}</p>
                  <p className="text-xs text-white/40 mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeInUp} className="text-center">
              <button
                onClick={() => scrollTo("quote")}
                className="gold-btn px-8 py-3.5 rounded-full text-base tracking-wider inline-flex items-center gap-2"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ═══════════════ CERAMIC COATING ═══════════════ */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          {/* Bg glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a84c]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-sm mb-4">Premium Protection</p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Ceramic Coating &{" "}
                <span className="gold-text">Paint Protection</span>
              </h2>
              <p className="text-white/40 max-w-2xl mx-auto leading-relaxed">
                Ceramic coatings provide long-term gloss, protection, and easier maintenance.
                Ideal for clients looking to protect their investment and simplify future cleanings.
              </p>
              <p className="text-white/30 text-sm mt-3 max-w-xl mx-auto">
                All ceramic services include proper wash, decontamination, and panel prep.
                Coatings are offered by consultation to ensure correct prep and durability.
              </p>
            </motion.div>

            {/* Feature icons */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 max-w-3xl mx-auto"
            >
              {[
                { icon: <Sun className="w-6 h-6" />, title: "UV Protection", desc: "Guards against sun damage" },
                { icon: <Sparkles className="w-6 h-6" />, title: "Superior Gloss", desc: "Showroom-quality shine" },
                { icon: <Droplets className="w-6 h-6" />, title: "Hydrophobic", desc: "Water beads and rolls off" },
                { icon: <Shield className="w-6 h-6" />, title: "Long-lasting", desc: "Years of protection" },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={staggerItem}
                  className="text-center group"
                >
                  <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] group-hover:bg-[#c9a84c]/20 transition-colors">
                    {item.icon}
                  </div>
                  <p className="font-semibold text-sm text-white/80">{item.title}</p>
                  <p className="text-xs text-white/40 mt-1">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Consultation CTA */}
            <motion.div {...fadeInUp} className="text-center mb-16">
              <button
                onClick={() => scrollTo("quote")}
                className="gold-btn px-8 py-3.5 rounded-full text-base tracking-wider inline-flex items-center gap-2"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Request Consultation
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            {/* Coatings grid */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {[
                { name: "3-Year Graphene Coating", desc: "Entry-level protection with superior gloss" },
                { name: "5-Year Ceramic Coating", desc: "Professional-grade durability and shine" },
                { name: "8-Year Ceramic Coating", desc: "Ultimate long-term protection" },
              ].map((coat) => (
                <motion.div
                  key={coat.name}
                  variants={staggerItem}
                  className="gold-border rounded-2xl p-6 bg-[#111] text-center group"
                >
                  <div className="w-10 h-10 mx-auto mb-3 rounded-full bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c]">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-white/90 mb-1" style={{ fontFamily: "var(--font-cinzel)" }}>
                    {coat.name}
                  </h4>
                  <p className="text-sm text-white/40">{coat.desc}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Add-on protection */}
            <motion.div {...fadeInUp} className="text-center">
              <p className="text-sm font-semibold text-white/60 mb-3">Add-On Protection</p>
              <div className="flex flex-wrap justify-center gap-3 mb-4">
                {["Glass coating", "Trim and plastic coating", "Wheel and metal protection"].map((item) => (
                  <span key={item} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-white/50">
                    {item}
                  </span>
                ))}
              </div>
              <p className="text-xs text-[#c9a84c]/60 italic">Coatings by DIY Detail</p>
            </motion.div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ═══════════════ ADD-ONS ═══════════════ */}
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-sm mb-4">Enhance Your Detail</p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Popular{" "}
                <span className="gold-text">Add-On Services</span>
              </h2>
              <p className="text-white/40 max-w-xl mx-auto">
                Take your detail to the next level with these optional services, available with any package.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {addOns.map((addon) => (
                <motion.div
                  key={addon.title}
                  variants={staggerItem}
                  className="gold-border rounded-xl p-5 bg-[#111] flex items-start gap-4 group"
                >
                  <div className="p-2 rounded-lg bg-[#c9a84c]/10 text-[#c9a84c] flex-shrink-0 group-hover:bg-[#c9a84c]/20 transition-colors">
                    {addon.icon}
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-1">
                      <h4 className="font-semibold text-white/90">{addon.title}</h4>
                      <span className="text-[#c9a84c] font-bold text-sm">{addon.price}</span>
                    </div>
                    <p className="text-sm text-white/40 leading-relaxed">{addon.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ═══════════════ QUOTE FORM ═══════════════ */}
        <section id="quote" className="relative py-24 sm:py-32">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#c9a84c]/5 rounded-full blur-[150px] pointer-events-none" />

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div {...fadeInUp} className="text-center mb-12">
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-sm mb-4">Get Started</p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Request Your{" "}
                <span className="gold-text">Estimate</span>
              </h2>
              <p className="text-white/40">
                Submit your information for a fast, personalized quote.
              </p>
            </motion.div>

            <motion.div {...fadeInUp}>
              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                autoComplete="on"
                className="gold-border rounded-2xl p-6 sm:p-10 bg-[#111]/80 backdrop-blur-sm space-y-6"
              >
                <input type="hidden" name="_subject" value="New Detailing Quote Request" />
                <input type="hidden" name="_source" value="detailing" />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="quote-name" className="block text-sm text-white/50 mb-2">Name *</label>
                    <input id="quote-name" name="name" required placeholder="Your name" autoComplete="name" className="input-dark" />
                  </div>
                  <div>
                    <label htmlFor="quote-phone" className="block text-sm text-white/50 mb-2">Phone *</label>
                    <input id="quote-phone" name="phone" type="tel" required placeholder="(555) 555-5555" autoComplete="tel" className="input-dark" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="quote-email" className="block text-sm text-white/50 mb-2">Email *</label>
                    <input id="quote-email" name="email" type="email" required placeholder="you@email.com" autoComplete="email" className="input-dark" />
                  </div>
                  <div>
                    <label htmlFor="quote-city" className="block text-sm text-white/50 mb-2">City / ZIP *</label>
                    <input id="quote-city" name="city_zip" required placeholder="Tallahassee, 32301" autoComplete="address-level2" className="input-dark" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="quote-vehicle" className="block text-sm text-white/50 mb-2">Vehicle (Year, Make, Model) *</label>
                    <input id="quote-vehicle" name="vehicle_model" required placeholder="2020 Honda Accord" autoComplete="on" className="input-dark" />
                  </div>
                  <div>
                    <label htmlFor="quote-date" className="block text-sm text-white/50 mb-2">Preferred Date & Time</label>
                    <input id="quote-date" name="preferred_date" type="text" placeholder="e.g., Saturday morning, March 1st" className="input-dark" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/50 mb-3">Services Interested In *</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {serviceCheckboxes.map((svc) => (
                      <label key={svc} className="flex items-center gap-3 cursor-pointer group/check">
                        <input
                          type="checkbox"
                          name={`service-${svc.toLowerCase().replace(/\s+/g, "-")}`}
                          value={svc}
                          className="checkbox-gold"
                        />
                        <span className="text-sm text-white/50 group-hover/check:text-white/70 transition-colors">
                          {svc}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-white/50 mb-2">
                    Upload Photos & Videos (Interior / Exterior)
                  </label>
                  <label
                    className={`relative block input-dark text-center py-8 border-dashed cursor-pointer transition-colors ${
                      selectedFiles.length > 0 ? "border-[#c9a84c]/50 bg-[#c9a84c]/5" : "hover:border-[#c9a84c]/40"
                    }`}
                  >
                    <input
                      type="file"
                      name="photos"
                      multiple
                      accept="image/*,video/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const files = e.target.files
                        if (files) setSelectedFiles(Array.from(files))
                      }}
                    />
                    {selectedFiles.length > 0 ? (
                      <>
                        <CheckCircle2 className="w-6 h-6 text-[#c9a84c] mx-auto mb-2" />
                        <p className="text-sm text-[#c9a84c] font-medium">
                          {selectedFiles.length} file{selectedFiles.length !== 1 ? "s" : ""} selected
                        </p>
                        <div className="mt-2 space-y-1 max-h-24 overflow-y-auto">
                          {selectedFiles.map((f, i) => (
                            <p key={i} className="text-xs text-white/40 truncate max-w-xs mx-auto">{f.name}</p>
                          ))}
                        </div>
                        <p className="text-xs text-white/20 mt-2">Click to change files</p>
                      </>
                    ) : (
                      <>
                        <Camera className="w-6 h-6 text-white/20 mx-auto mb-2" />
                        <p className="text-sm text-white/30">Click or drag files to upload</p>
                        <p className="text-xs text-white/20 mt-1">Supports photos and videos — helps us provide an accurate estimate</p>
                      </>
                    )}
                  </label>
                </div>

                <div>
                  <label htmlFor="quote-notes" className="block text-sm text-white/50 mb-2">Additional Notes</label>
                  <textarea
                    id="quote-notes"
                    name="message"
                    rows={4}
                    placeholder="Any specific concerns, stains, or requests..."
                    autoComplete="on"
                    className="input-dark resize-none"
                  />
                </div>

                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-4"
                    >
                      <CheckCircle2 className="w-8 h-8 text-[#c9a84c] mx-auto mb-2" />
                      <p className="text-[#c9a84c] font-semibold">Quote request submitted!</p>
                      <p className="text-white/40 text-sm">We&apos;ll get back to you soon.</p>
                    </motion.div>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={submitting}
                      className="gold-btn w-full py-4 rounded-xl text-base tracking-wider disabled:opacity-50"
                      style={{ fontFamily: "var(--font-cinzel)" }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {submitting ? "Submitting..." : "Get Your Estimate"}
                    </motion.button>
                  )}
                </AnimatePresence>
              </form>
            </motion.div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ═══════════════ ABOUT ═══════════════ */}
        <section id="about" className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeInUp}>
                <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-sm mb-4">About Blast & Beyond</p>
                <h2
                  className="text-3xl sm:text-4xl font-bold mb-4"
                  style={{ fontFamily: "var(--font-cinzel)" }}
                >
                  Driven by Design.{" "}
                  <span className="gold-text">Powered by Protection.</span>
                </h2>
                <div className="space-y-4 text-white/50 leading-relaxed">
                  <p>
                    I&apos;m Aiden &ldquo;D&rdquo; Deshommes, an architecture student at Florida A&M University
                    with a focus on precision, presentation, and long-term results.
                  </p>
                  <p>
                    Blast & Beyond LLC was built to bring professional-grade mobile detailing and
                    paint protection directly to clients who value their vehicles.
                  </p>
                  <p>
                    I work with daily drivers, student vehicles, and clients looking for long-term
                    protection. Every service is tailored to the condition of the vehicle and the
                    level of protection requested.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: <Car className="w-6 h-6" />, label: "Fully Mobile", desc: "We come to you" },
                    { icon: <GraduationCap className="w-6 h-6" />, label: "Student-Friendly", desc: "Special rates available" },
                    { icon: <Shield className="w-6 h-6" />, label: "Paint Protection", desc: "Long-term care" },
                    { icon: <Award className="w-6 h-6" />, label: "Premium Quality", desc: "Attention to detail" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="gold-border rounded-xl p-5 bg-[#111] text-center"
                    >
                      <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c]">
                        {item.icon}
                      </div>
                      <p className="font-semibold text-sm text-white/80">{item.label}</p>
                      <p className="text-xs text-white/40 mt-1">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ═══════════════ TESTIMONIALS ═══════════════ */}
        <section className="relative py-24 sm:py-32">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div {...fadeInUp}>
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-sm mb-4">Testimonials</p>
              <h2
                className="text-3xl sm:text-4xl font-bold mb-12"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                What Our Clients{" "}
                <span className="gold-text">Say</span>
              </h2>

              {/* Testimonial Carousel */}
              <div className="relative max-w-2xl mx-auto mb-10">
                <div className="gold-border rounded-2xl p-8 sm:p-12 bg-[#111] overflow-hidden" style={{ minHeight: "280px" }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTestimonial}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      {/* Stars */}
                      <div className="flex justify-center gap-1 mb-5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-5 h-5 text-[#c9a84c] fill-[#c9a84c]" />
                        ))}
                      </div>

                      {/* Quote icon */}
                      <div className="text-[#c9a84c]/20 mb-4">
                        <svg className="w-8 h-8 mx-auto" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      {/* Quote text */}
                      <p className="text-white/60 text-base sm:text-lg italic leading-relaxed mb-6">
                        &ldquo;{testimonials[activeTestimonial].quote}&rdquo;
                      </p>

                      {/* Author */}
                      <p className="text-white/80 text-sm font-semibold">
                        &mdash; {testimonials[activeTestimonial].name}
                      </p>
                      <p className="text-[#c9a84c]/60 text-xs mt-1">
                        {testimonials[activeTestimonial].service}
                      </p>
                      <p className="text-white/20 text-xs mt-0.5">
                        {testimonials[activeTestimonial].location}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6 w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white/40 hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6 w-10 h-10 rounded-full bg-[#111] border border-white/10 flex items-center justify-center text-white/40 hover:text-[#c9a84c] hover:border-[#c9a84c]/30 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Dots */}
                <div className="flex justify-center gap-2 mt-6">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveTestimonial(i)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        i === activeTestimonial
                          ? "bg-[#c9a84c] w-6"
                          : "bg-white/15 hover:bg-white/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Leave a Review - Toggle Button */}
              {!reviewOpen && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onClick={() => setReviewOpen(true)}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#c9a84c]/20 text-[#c9a84c] text-sm hover:bg-[#c9a84c]/10 transition-all"
                >
                  <Star className="w-4 h-4" />
                  Leave a Review
                </motion.button>
              )}

              {/* Review Form */}
              <AnimatePresence>
                {reviewOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 20, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <div className="gold-border rounded-2xl p-6 sm:p-8 bg-[#111] max-w-lg mx-auto text-left">
                      <h3
                        className="text-xl font-bold text-center mb-6"
                        style={{ fontFamily: "var(--font-cinzel)" }}
                      >
                        Share Your Experience
                      </h3>

                      <AnimatePresence mode="wait">
                        {reviewSubmitted ? (
                          <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-8"
                          >
                            <CheckCircle2 className="w-10 h-10 text-[#c9a84c] mx-auto mb-3" />
                            <p className="text-[#c9a84c] font-semibold text-lg">Thank you!</p>
                            <p className="text-white/40 text-sm mt-1">Your review has been submitted.</p>
                          </motion.div>
                        ) : (
                          <motion.form
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onSubmit={handleReviewSubmit}
                            className="space-y-5"
                          >
                            <input type="hidden" name="_subject" value="New Customer Review" />
                            <input type="hidden" name="_source" value="detailing-review" />

                            <div>
                              <label className="block text-sm text-white/50 mb-2">Your Name</label>
                              <input
                                name="reviewer_name"
                                required
                                placeholder="John Doe"
                                className="input-dark"
                              />
                            </div>

                            <div>
                              <label className="block text-sm text-white/50 mb-2">Service Received</label>
                              <input
                                name="service_received"
                                required
                                placeholder="e.g., Interior Detail, Premium Detail"
                                className="input-dark"
                              />
                            </div>

                            <div>
                              <label className="block text-sm text-white/50 mb-2">Rating</label>
                              <div className="flex gap-1.5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setReviewRating(star)}
                                    onMouseEnter={() => setReviewHover(star)}
                                    onMouseLeave={() => setReviewHover(0)}
                                    className="transition-transform hover:scale-110"
                                  >
                                    <Star
                                      className={`w-8 h-8 transition-colors ${
                                        star <= (reviewHover || reviewRating)
                                          ? "text-[#c9a84c] fill-[#c9a84c]"
                                          : "text-white/15"
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                              <input type="hidden" name="rating" value={reviewRating} />
                            </div>

                            <div>
                              <label className="block text-sm text-white/50 mb-2">Your Review</label>
                              <textarea
                                name="review_text"
                                required
                                rows={4}
                                placeholder="Tell us about your experience..."
                                className="input-dark resize-none"
                              />
                            </div>

                            <div className="flex gap-3 pt-2">
                              <button
                                type="button"
                                onClick={() => {
                                  setReviewOpen(false)
                                  setReviewRating(0)
                                  setReviewHover(0)
                                }}
                                className="flex-1 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white/70 hover:border-white/20 transition-all text-sm"
                              >
                                Cancel
                              </button>
                              <button
                                type="submit"
                                disabled={reviewSubmitting || reviewRating === 0}
                                className="flex-1 gold-btn py-3 rounded-xl text-sm tracking-wider disabled:opacity-40 flex items-center justify-center gap-2"
                              >
                                {reviewSubmitting ? "Submitting..." : "Submit Review"}
                                {!reviewSubmitting && (
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                  </svg>
                                )}
                              </button>
                            </div>
                          </motion.form>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ GALLERY TEASER ═══════════════ */}
        <section id="gallery" className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-sm mb-4">Our Work</p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Recent{" "}
                <span className="gold-text">Projects</span>
              </h2>
              <p className="text-white/40 max-w-xl mx-auto">
                Real results from real clients. See the quality and attention to detail we bring to every vehicle.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-10"
            >
              {galleryImages.slice(0, 3).map((img) => (
                <motion.div
                  key={img.src}
                  variants={staggerItem}
                  className="relative group rounded-2xl overflow-hidden gold-border bg-[#111] aspect-[4/3]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="text-[#c9a84c] text-sm font-semibold">{img.vehicle}</p>
                    <p className="text-white/70 text-sm">{img.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.div {...fadeInUp} className="text-center">
              <Link
                href="/detailing/gallery"
                className="gold-btn px-8 py-3.5 rounded-full text-base tracking-wider inline-flex items-center gap-2"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                View Full Gallery
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ═══════════════ SERVICE AREA ═══════════════ */}
        <section className="relative py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-sm mb-4">Service Area</p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Serving Tallahassee &{" "}
                <span className="gold-text">Beyond</span>
              </h2>
              <p className="text-white/40 max-w-xl mx-auto">
                Based in Tallahassee, FL — serving up to 25+ miles in surrounding areas.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <motion.div {...fadeInUp} className="gold-border rounded-2xl p-8 bg-[#111]">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-xl bg-[#c9a84c]/10 text-[#c9a84c]">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-white/90">Tallahassee, FL</p>
                    <p className="text-sm text-white/40">25+ Mile Radius</p>
                  </div>
                </div>

                <p className="text-sm font-semibold text-white/60 mb-3">Areas We Serve</p>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <span key={area} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/50">
                      {area}
                    </span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="gold-border rounded-2xl p-8 bg-[#111]"
              >
                <p className="text-sm font-semibold text-white/60 mb-4">Target ZIP Codes</p>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {targetZips.map((zip) => (
                    <span key={zip} className="text-center py-2 rounded-lg bg-[#c9a84c]/5 border border-[#c9a84c]/15 text-[#c9a84c] text-sm font-mono">
                      {zip}
                    </span>
                  ))}
                </div>

                <div className="section-divider mb-8" />

                <p className="text-sm font-semibold text-white/60 mb-3">Referral Program</p>
                <p className="text-sm text-white/40 mb-4">
                  Love your results? Refer a friend and get rewarded when they book a full detail or ceramic service.
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: <Gift className="w-5 h-5" />, reward: "$20 off", desc: "Your next service" },
                    { icon: <Heart className="w-5 h-5" />, reward: "Gift Card", desc: "Redeemable for any service" },
                    { icon: <Zap className="w-5 h-5" />, reward: "Free Upgrade", desc: "Headlight, wax, etc." },
                  ].map((ref) => (
                    <div key={ref.reward} className="text-center">
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c]">
                        {ref.icon}
                      </div>
                      <p className="text-sm font-semibold gold-text">{ref.reward}</p>
                      <p className="text-[10px] text-white/30 mt-0.5">{ref.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-white/20 mt-4 text-center">
                  Referral must book a full detail or ceramic service to qualify.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ═══════════════ FIRST-TIME POLICY ═══════════════ */}
        <section className="relative py-16">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              className="gold-border rounded-2xl p-6 sm:p-8 bg-[#111] text-center"
            >
              <Shield className="w-8 h-8 text-[#c9a84c] mx-auto mb-4" />
              <h3 className="text-lg font-bold mb-3" style={{ fontFamily: "var(--font-cinzel)" }}>
                First-Time Detail Policy
              </h3>
              <p className="text-sm text-white/40 leading-relaxed max-w-lg mx-auto">
                First-time details often require more time and labor. Pricing reflects vehicle condition
                and service level. Maintenance and repeat services are faster and more affordable
                once the vehicle is properly established.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ═══════════════ FAQ ═══════════════ */}
        <section className="relative py-24 sm:py-32">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div {...fadeInUp} className="text-center mb-16">
              <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-sm mb-4">FAQ</p>
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
                style={{ fontFamily: "var(--font-cinzel)" }}
              >
                Frequently Asked{" "}
                <span className="gold-text">Questions</span>
              </h2>
            </motion.div>

            <motion.div {...fadeInUp} className="space-y-3">
              {faqItems.map((faq, i) => (
                <div
                  key={i}
                  className="gold-border rounded-xl bg-[#111] overflow-hidden"
                  style={{ transform: "none" }}
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-sm font-medium text-white/80 pr-4">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#c9a84c] flex-shrink-0 transition-transform duration-300 ${
                        openFaq === i ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{
                      maxHeight: openFaq === i ? "300px" : "0px",
                      opacity: openFaq === i ? 1 : 0,
                    }}
                  >
                    <p className="px-5 pb-5 text-sm text-white/40 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* FAQPage JSON-LD */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqItems.map((faq) => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a,
                  },
                })),
              }),
            }}
          />
        </section>

        <div className="section-divider max-w-5xl mx-auto" />

        {/* ═══════════════ FOOTER ═══════════════ */}
        <footer className="border-t border-white/5 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/images/detailing/Blast_Beyond_LLC.png"
                    alt="Blast & Beyond LLC"
                    width={36}
                    height={36}
                    className="rounded"
                  />
                  <div>
                    <p className="font-bold gold-text" style={{ fontFamily: "var(--font-cinzel)" }}>
                      Blast & Beyond LLC
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/40 mb-2">Professional Mobile Auto Detailing & Paint Protection</p>
                <p className="text-xs text-white/30 italic">Driven by Design. Powered by Protection.</p>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-sm font-semibold text-white/60 mb-4 tracking-wider uppercase">Contact</h4>
                <div className="space-y-3">
                  <a href="tel:4793542848" className="flex items-center gap-2 text-sm text-white/40 hover:text-[#c9a84c] transition-colors">
                    <Phone className="w-4 h-4" />
                    (479) 354-2848
                  </a>
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <MapPin className="w-4 h-4" />
                    Tallahassee, FL
                  </div>
                </div>
              </div>

              {/* Service Area */}
              <div>
                <h4 className="text-sm font-semibold text-white/60 mb-4 tracking-wider uppercase">Service Area</h4>
                <p className="text-sm text-white/30 leading-relaxed">
                  Serving Tallahassee and surrounding areas within 25+ miles including Quincy,
                  Havana, Crawfordville, Monticello, Woodville, and Midway.
                </p>
              </div>
            </div>

            <div className="section-divider mt-12 mb-8" />

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-white/20">
                &copy; {new Date().getFullYear()} Blast & Beyond LLC. All rights reserved.
              </p>
              <p className="text-xs text-white/20">
                Fully Mobile &bull; Student-Friendly &bull; Photo Uploads Accepted
              </p>
            </div>
          </div>
        </footer>

        {/* ═══════════════ FLOATING CTA (Mobile) ═══════════════ */}
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="fixed bottom-6 right-6 z-40 md:hidden"
        >
          <button
            onClick={() => scrollTo("quote")}
            className="gold-btn w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
            style={{ boxShadow: "0 0 30px rgba(201,168,76,0.3)" }}
          >
            <Mail className="w-6 h-6" />
          </button>
        </motion.div>

        {/* ═══════════════ BACK TO SERVICES ═══════════════ */}
        <motion.div
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ delay: 1.5, duration: 0.5, ease }}
          className="fixed bottom-6 left-6 z-40"
        >
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2.5 rounded-full border text-sm font-medium transition-all hover:shadow-xl"
            style={{
              background: "rgba(10,10,10,0.85)",
              backdropFilter: "blur(12px)",
              borderColor: "rgba(201,168,76,0.3)",
              color: "#c9a84c",
            }}
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
