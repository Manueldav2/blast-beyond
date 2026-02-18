"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Droplets, Car, ArrowRight } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col">
      {/* Hero Section */}
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(201,168,76,0.06)_0%,transparent_60%)]" />

        {/* Hero photo placeholder - replace src with fishing photo of Ini and D */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden mb-10 border border-white/10"
          style={{ boxShadow: "0 0 60px rgba(201,168,76,0.1)" }}
        >
          {/* TODO: Replace with fishing photo of Ini and D */}
          <Image
            src="/Blast_And_Beyond_Logo.JPG"
            alt="Blast & Beyond - Ini and D"
            fill
            className="object-contain bg-white"
            priority
          />
        </motion.div>

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-3">
            Blast{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a88a3d, #f0d78c, #c9a84c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              & Beyond
            </span>
          </h1>
          <p className="text-white/40 tracking-[0.15em] uppercase text-sm">
            Choose Your Service
          </p>
        </motion.div>

        {/* Two service cards */}
        <div className="grid gap-6 md:grid-cols-2 max-w-3xl w-full">
          {/* Car Washing */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/carwashing"
              className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:border-sky-400/40 hover:bg-sky-400/5 transition-all duration-500"
              style={{ backdropFilter: "blur(10px)" }}
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-400/10 flex items-center justify-center text-sky-400 mb-5 group-hover:bg-sky-400/20 transition-colors">
                <Droplets className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-sky-400 transition-colors">
                Exterior Pressure Washing
              </h2>
              <p className="text-white/40 text-sm mb-5 leading-relaxed">
                Pressure Washing & Yard Services<br />
                Northwest Arkansas Area
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-sky-400/70 group-hover:text-sky-400 group-hover:gap-3 transition-all">
                View Services
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>

          {/* Detailing */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/detailing"
              className="group block rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:border-[#c9a84c]/40 hover:bg-[#c9a84c]/5 transition-all duration-500"
              style={{ backdropFilter: "blur(10px)" }}
            >
              <div className="w-14 h-14 rounded-2xl bg-[#c9a84c]/10 flex items-center justify-center text-[#c9a84c] mb-5 group-hover:bg-[#c9a84c]/20 transition-colors">
                <Car className="w-7 h-7" />
              </div>
              <h2 className="text-2xl font-bold mb-2 group-hover:text-[#c9a84c] transition-colors">
                Detailing
              </h2>
              <p className="text-white/40 text-sm mb-5 leading-relaxed">
                Mobile Auto Detailing & Paint Protection<br />
                Tallahassee & Surrounding Areas
              </p>
              <span className="inline-flex items-center gap-2 text-sm text-[#c9a84c]/70 group-hover:text-[#c9a84c] group-hover:gap-3 transition-all">
                View Services
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-6 text-xs text-white/20">
        &copy; {new Date().getFullYear()} Blast & Beyond LLC
      </footer>
    </div>
  )
}
