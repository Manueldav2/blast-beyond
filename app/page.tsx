'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Droplets, Truck, Leaf } from "lucide-react"
import Image from "next/image"
import QuoteForm from "@/components/quote-form"
import Testimonials from "@/components/testimonials"
import ServiceCard from "@/components/service-card"
import PricingPackage from "@/components/pricing-package"
import Gallery from "@/components/gallery"
import { motion } from "framer-motion"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b bg-white-500">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-4">
            <Image
              src="/blastnbeyond_logo.png"
              alt="Blast & Beyond Logo"
              width={90}
              height={90}
              className="object-contain h-20 w-20 drop-shadow-lg"
              priority
            />
            <span className="text-3xl font-extrabold tracking-tight text-old_rose-500 drop-shadow-md">Blast Beyond</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: "#services", label: "Services" },
              { href: "#pricing", label: "Pricing" },
              { href: "#quote", label: "Get a Quote" },
              { href: "#about", label: "About Us" },
              { href: "#gallery", label: "Gallery" },
            ].map((item, idx) => (
              <motion.a
                key={item.href}
                href={item.href}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                className="px-4 py-2 rounded-full font-bold text-base transition-colors duration-200 text-old_rose-500 hover:bg-old_rose-100 focus:bg-old_rose-200 focus:outline-none shadow-sm hover:shadow-md"
                style={{ letterSpacing: '0.02em' }}
              >
                {item.label}
              </motion.a>
            ))}
          </nav>
          <Button asChild size="sm" className="hidden md:inline-flex bg-old_rose-500 text-white-500 hover:bg-old_rose-400">
            <a href="#quote">Request a Free Quote</a>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden">
            <span className="sr-only">Toggle menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-white-500">
          <motion.div
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-0 z-0"
          >
            <Image
              src="/blastnbeyond_logo.png"
              alt="Blast & Beyond Logo Hero"
              fill
              className="object-contain opacity-60 scale-110"
              priority
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-white-500 to-misty_rose-200 opacity-20 z-10" />
          <motion.div
            className="relative z-20 flex flex-col items-center justify-center text-center w-full px-4"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <motion.h1
              className="text-4xl sm:text-6xl font-extrabold tracking-tight text-rose_taupe-500 drop-shadow-xl mb-4 [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
            >
              Pressure Washing, Cleanouts & Yard Help
            </motion.h1>
            <motion.p
              className="text-2xl font-bold text-rose_taupe-500 mb-6 [text-shadow:_-1px_-1px_0_#000,_1px_-1px_0_#000,_-1px_1px_0_#000,_1px_1px_0_#000]"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            >
              Serving Northwest Arkansas
            </motion.p>
            <motion.div
              className="flex flex-col gap-3 min-[400px]:flex-row justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                <Button size="lg" asChild className="bg-old_rose-500 text-white-500 hover:bg-old_rose-400 shadow-lg">
                  <a href="#quote">Request a Free Quote</a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.96 }}>
                <Button size="lg" variant="outline" asChild className="border-old_rose-500 text-old_rose-500 hover:bg-old_rose-100 shadow-lg">
                  <a href="#services">Our Services</a>
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <motion.div
            className="container px-4 md:px-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Services</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Professional Home Services</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  We offer a comprehensive range of professional services to enhance your home
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <motion.div whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #AD7A8033' }} whileTap={{ scale: 0.98 }}>
                <ServiceCard
                  icon={<Truck className="h-10 w-10 text-old_rose-500 transition-transform duration-300 hover:scale-125" />}
                  title="Garage Cleanouts + Light Hauling"
                  description="Clear out, organize, and sweep garages"
                  details={[
                    "Light junk hauling (non-hazardous items)",
                    "Old furniture and boxes removal",
                    "Help listing valuable items on Facebook Marketplace",
                  ]}
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #AD7A8033' }} whileTap={{ scale: 0.98 }}>
                <ServiceCard
                  icon={<Droplets className="h-10 w-10 text-old_rose-500 transition-transform duration-300 hover:scale-125" />}
                  title="Pressure Washing"
                  description="Driveways, patios, porches, fences, sidewalks, trash cans"
                  details={[
                    "Custom Rate: $0.25 per square foot",
                    "Free quotes via satellite imaging",
                    "In-person inspection for tough jobs",
                  ]}
                  className="font-bold"
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #AD7A8033' }} whileTap={{ scale: 0.98 }}>
                <ServiceCard
                  icon={<Leaf className="h-10 w-10 text-old_rose-500 transition-transform duration-300 hover:scale-125" />}
                  title="Light Yard Work + Debris Removal"
                  description="Weed removal, sweeping, blowing, and cleanup"
                  details={["Haul away bagged yard waste", "Debris removal", "General yard cleanup"]}
                />
              </motion.div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <motion.div whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #AD7A8033' }} whileTap={{ scale: 0.98 }}>
                <ServiceCard
                  icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-old_rose-500 transition-transform duration-300 hover:scale-125"><path d="M20 12v8H4v-8"/><path d="m12 3-8 6h16l-8-6z"/></svg>}
                  title="Roof Washing"
                  description="Professional roof cleaning services"
                  details={[
                    "Custom quote after site inspection",
                    "Safe and effective cleaning methods",
                    "Extends roof life and improves appearance",
                    "*Contact us for a custom quote after inspection",
                  ]}
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #AD7A8033' }} whileTap={{ scale: 0.98 }}>
                <ServiceCard
                  icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-old_rose-500 transition-transform duration-300 hover:scale-125"><path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"/><path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0-4 0"/><path d="M5 17H3v-6h18v6h-2"/><path d="M3 11l2-5h14l2 5"/><path d="M8 17h8"/></svg>}
                  title="Car Detailing"
                  description="Interior + Exterior Detailing Services"
                  details={[
                    "Custom quote based on vehicle size and condition",
                    "Professional interior and exterior cleaning",
                    "Paint protection and restoration available",
                    "*Contact us for a custom quote after inspection",
                  ]}
                />
              </motion.div>
            </div>
          </motion.div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <motion.div
            className="container px-4 md:px-6"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Limited Time Offer
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Summer Special Packages</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Flat rate packages to refresh your home's exterior
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <motion.div whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #AD7A8033' }} whileTap={{ scale: 0.98 }}>
                <PricingPackage
                  title="Basic Refresh"
                  price=""
                  description="Front driveway (standard 2-car width)"
                  features={[
                    "Professional pressure washing",
                    "Removes dirt, grime & stains",
                    "Makes your driveway look new again",
                  ]}
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #AD7A8033' }} whileTap={{ scale: 0.98 }}>
                <PricingPackage
                  title="Deluxe Refresh"
                  price=""
                  description="Driveway + Sidewalk + Trash Can Cleaning"
                  features={["Everything in Basic package", "Sidewalk cleaning", "Trash can cleaning & sanitizing"]}
                  highlighted={true}
                />
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, boxShadow: '0 8px 32px #AD7A8033' }} whileTap={{ scale: 0.98 }}>
                <PricingPackage
                  title="Premium Refresh"
                  price=""
                  description="Driveway + Sidewalk + Porch/Patio + Trash Cans"
                  features={["Everything in Deluxe package", "Porch or patio cleaning", "Complete exterior refresh"]}
                />
              </motion.div>
            </div>
            <div className="mx-auto max-w-3xl text-center">
              <p className="text-muted-foreground">
                Custom projects like large patios, extra-long driveways, and fences are still available at $0.25/sq ft.
                Contact us for a free quote!
              </p>
            </div>
          </motion.div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Custom Job Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  For projects outside of our flat-rate packages
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-12">
              <Card className="p-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="text-xl font-bold">Pressure Washing</h3>
                    <p className="text-2xl font-bold text-primary mt-2">$0.25 per square foot</p>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-rose_taupe-500" />
                        <span>Extra-large patios</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-rose_taupe-500" />
                        <span>Multi-car driveways</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-rose_taupe-500" />
                        <span>Fences and decks</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Free Quote Process</h3>
                    <ul className="mt-4 space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-rose_taupe-500" />
                        <span>Satellite imaging for most jobs</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-rose_taupe-500" />
                        <span>In-person inspection when needed</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-rose_taupe-500" />
                        <span>No obligation quotes</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="quote" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Request a Free Quote</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Fill out this simple form and we'll get back to you quickly
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-lg py-12">
              <QuoteForm />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Invoicing & Payment</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple, transparent, and flexible payment options
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl space-y-4 py-12">
              <Card className="p-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold">How It Works</h3>
                  <p>
                    We use an invoicing app called InvoiceFly to send professional invoices right to your phone or
                    email.
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="font-bold">What We Need</h4>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-rose_taupe-500" />
                          <span>Name</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-rose_taupe-500" />
                          <span>Address</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-rose_taupe-500" />
                          <span>Phone number</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-rose_taupe-500" />
                          <span>List of services requested</span>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold">Payment Options</h4>
                      <ul className="mt-2 space-y-2">
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-rose_taupe-500" />
                          <span>Card (via InvoiceFly)</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-rose_taupe-500" />
                          <span>Cash</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-rose_taupe-500" />
                          <span>Check</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <CheckCircle className="h-5 w-5 text-rose_taupe-500" />
                          <span>Venmo</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full">
                <Image
                  alt="Aiden and Ini from Blast Beyond"
                  className="aspect-square object-cover"
                  height={600}
                  width={600}
                  src="/Blast_And_Beyond_Logo.JPG"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">About Us</h2>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    We're Aiden and Ini—two hardworking college students from Northwest Arkansas who started Blast
                    Beyond to provide reliable home refresh services at a fair price.
                  </p>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We're passionate about doing things right, working hard, and helping our community—especially
                    seniors—get their homes looking their best.
                  </p>
                  <p>
                    Our business is built on reliability, respect, and quality work at fair prices. We take pride in
                    transforming driveways, patios, and garages across Northwest Arkansas.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <a href="#quote">Get in Touch</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Customers Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Don't just take our word for it
                </p>
              </div>
            </div>
            <div className="mx-auto py-12">
              <Testimonials />
            </div>
          </div>
        </section>

        <section id="gallery" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Our Work</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  See the difference we can make
                </p>
              </div>
            </div>
            <div className="mx-auto py-12">
              <Gallery />
            </div>
          </div>
        </section>

        <motion.a
          href="#quote"
          className="fixed bottom-8 right-8 z-50 bg-old_rose-500 text-white-500 px-6 py-3 rounded-full shadow-xl text-lg font-bold hover:bg-old_rose-400 transition-colors"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
        >
          Get a Free Quote
        </motion.a>
      </main>
      <footer className="w-full border-t bg-background py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Droplets className="h-6 w-6 text-old_rose-500" />
                <span className="text-xl font-bold">Blast Beyond</span>
              </div>
              <p className="text-sm text-muted-foreground">Pressure Washing, Cleanouts & Yard Help – Serving NWA</p>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Contact Us</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Phone: (479) 123-4567</li>
                <li>Email: aiden.deshommes@gmail.com</li>
                <li>Email: inisamade@gmail.com</li>
                <li>Area Served: Fayetteville, Springdale, Bentonville, Rogers, and nearby NWA</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium">Payments Accepted</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Card (via InvoiceFly)</li>
                <li>Cash</li>
                <li>Check</li>
                <li>Venmo</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Blast Beyond. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
