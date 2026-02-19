'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CheckCircle, Car, Sparkles, Shield, Clock, GraduationCap } from "lucide-react"
import Image from "next/image"
import QuoteFormFL from "@/components/quote-form-fl"
import TestimonialsFL from "@/components/testimonials-fl"
import ServiceCard from "@/components/service-card"
import PricingPackage from "@/components/pricing-package"
import GalleryFL from "@/components/gallery-fl"
import { motion } from "framer-motion"

export default function FloridaPage() {
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
            <span className="text-2xl font-extrabold tracking-tight text-old_rose-500 drop-shadow-md hidden sm:inline-block">Blast & Beyond LLC</span>
            <span className="text-2xl font-extrabold tracking-tight text-old_rose-500 drop-shadow-md sm:hidden">Blast & Beyond</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {[
              { href: "#services", label: "Services" },
              { href: "#pricing", label: "Packages" },
              { href: "#quote", label: "Book Now" },
              { href: "#about", label: "About" },
              { href: "#gallery", label: "Our Work" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full font-bold text-base transition-colors duration-200 text-old_rose-500 hover:bg-old_rose-100 focus:bg-old_rose-200 focus:outline-none shadow-sm hover:shadow-md"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button asChild size="sm" className="hidden md:inline-flex bg-old_rose-500 text-white-500 hover:bg-old_rose-400">
            <a href="#quote">Get Quote</a>
          </Button>
          <Button variant="outline" size="icon" className="md:hidden" asChild>
            <a href="#quote">
                <span className="sr-only">Book</span>
                <Clock className="h-5 w-5" />
            </a>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden bg-white-500">
          <div
            className="absolute inset-0 z-0"
          >
            <Image
              src="/blastnbeyond_logo.png"
              alt="Blast & Beyond Logo Hero"
              fill
              className="object-contain opacity-60 scale-110"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-white-500 to-misty_rose-200 opacity-20 z-10" />
          <motion.div
            className="relative z-20 flex flex-col items-center justify-center text-center w-full px-4"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          >
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-rose_taupe-500 drop-shadow-xl mb-4">
              Professional Mobile Auto Detailing<br/>& Paint Protection
            </h1>
            <p className="text-2xl font-bold text-rose_taupe-500 mb-6">
              Tallahassee, FL • Mobile Service
            </p>
            <p className="text-xl font-medium text-rose_taupe-500 mb-8 italic">
              "Driven by Design. Powered by Protection."
            </p>
            <div className="flex flex-col gap-3 min-[400px]:flex-row justify-center">
              <Button size="lg" asChild className="bg-old_rose-500 text-white-500 hover:bg-old_rose-400 shadow-lg">
                <a href="#quote">Book Now</a>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-old_rose-500 text-old_rose-500 hover:bg-old_rose-100 shadow-lg">
                <a href="#services">Our Services</a>
              </Button>
            </div>
          </motion.div>
        </section>

        <section id="services" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Our Services</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Tailored to Your Vehicle</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  All services are fully mobile and performed at your home, apartment, or workplace.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
              <ServiceCard
                icon={<Car className="h-10 w-10 text-old_rose-500" />}
                title="Interior Detail"
                description="$75 starting • 1–1.5 hours"
                details={[
                  "Ideal for regularly maintained vehicles",
                  "Full vacuum (seats, carpets, mats)",
                  "Interior surface cleaning",
                  "Leather cleaned & conditioned",
                  "Interior glass cleaned",
                ]}
              />
              <ServiceCard
                icon={<Sparkles className="h-10 w-10 text-old_rose-500" />}
                title="Exterior Detail"
                description="$75 starting • 1–1.5 hours"
                details={[
                  "Professional hand wash & protection",
                  "Bug and road film pre-treatment",
                  "Foam + hand wash",
                  "Wheel and tire cleaning with dressing",
                  "Exterior glass cleaned",
                ]}
              />
              <ServiceCard
                icon={<GraduationCap className="h-10 w-10 text-old_rose-500" />}
                title="Student Discount"
                description="$50 starting • 1–1.5 hours"
                details={[
                  "FAMU • FSU • TCC Students",
                  "Interior OR Exterior only",
                  "Same scope as base packages",
                  "Valid student ID required",
                  "Discounted for lightly used vehicles",
                ]}
              />
            </div>
          </div>
        </section>

        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Standard & Premium Packages</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  For vehicles requiring deeper cleaning or restoration
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-2">
              <PricingPackage
                title="Standard Full Detail"
                price="$200 starting"
                description="2.5–3 hours • Deep cleaning"
                features={[
                  "Complete interior + exterior",
                  "Deep cleaning treatment",
                  "Enhanced protection applied",
                  "Door jambs detailed",
                  "Ideal for regular maintenance",
                ]}
              />
              <PricingPackage
                title="Premium Detail"
                price="$250–$300 starting"
                description="2.5–3 hours • Restoration & Decon"
                features={[
                  "Deep interior restoration",
                  "Exterior decontamination",
                  "Enhanced protection",
                  "Significant correction work",
                  "Recommended for first-time clients",
                ]}
                highlighted={true}
              />
            </div>
            
             <div className="mx-auto grid max-w-5xl gap-6 py-4 lg:grid-cols-1">
                <Card className="p-6 border-old_rose-200 border-2">
                    <div className="text-center space-y-4">
                        <Shield className="h-12 w-12 text-old_rose-500 mx-auto" />
                        <h3 className="text-2xl font-bold">Premium Protection & Ceramic Coating</h3>
                        <p className="text-muted-foreground max-w-2xl mx-auto">
                            Ceramic coatings provide long-term gloss, protection, and easier maintenance. 
                            Available Coatings: 3-Year Graphene, 5-Year Ceramic, 8-Year Ceramic.
                        </p>
                        <Button asChild size="lg" className="mt-4">
                            <a href="#quote">Request Consultation</a>
                        </Button>
                    </div>
                </Card>
             </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32">
             <div className="container px-4 md:px-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter">Enhance Your Detail</h2>
                        <p className="text-muted-foreground">Add-on services available with any package.</p>
                        <ul className="grid gap-4 md:grid-cols-2">
                            <li className="flex gap-2 items-start"><CheckCircle className="h-5 w-5 text-old_rose-500 shrink-0"/> <span>Headlight Restoration ($30)</span></li>
                            <li className="flex gap-2 items-start"><CheckCircle className="h-5 w-5 text-old_rose-500 shrink-0"/> <span>Clay Bar Decontamination ($70)</span></li>
                            <li className="flex gap-2 items-start"><CheckCircle className="h-5 w-5 text-old_rose-500 shrink-0"/> <span>Steam Cleaning ($35)</span></li>
                            <li className="flex gap-2 items-start"><CheckCircle className="h-5 w-5 text-old_rose-500 shrink-0"/> <span>Carpet/Seat Extraction ($50)</span></li>
                            <li className="flex gap-2 items-start"><CheckCircle className="h-5 w-5 text-old_rose-500 shrink-0"/> <span>Pet Hair Removal ($30–$60)</span></li>
                            <li className="flex gap-2 items-start"><CheckCircle className="h-5 w-5 text-old_rose-500 shrink-0"/> <span>Spray Wax Protection ($25)</span></li>
                        </ul>
                    </div>
                    <div className="space-y-4">
                        <h2 className="text-3xl font-bold tracking-tighter">Maintenance Plans</h2>
                        <p className="text-muted-foreground">Keep your vehicle pristine with regular care.</p>
                         <ul className="space-y-2">
                            <li className="flex gap-2 items-center"><CheckCircle className="h-5 w-5 text-old_rose-500"/> Discounted rates on recurring services</li>
                            <li className="flex gap-2 items-center"><CheckCircle className="h-5 w-5 text-old_rose-500"/> Priority booking (skip the wait)</li>
                            <li className="flex gap-2 items-center"><CheckCircle className="h-5 w-5 text-old_rose-500"/> Flexible scheduling (Bi-weekly, monthly)</li>
                        </ul>
                        <p className="text-sm text-muted-foreground italic">*Initial deep clean required before enrollment.</p>
                    </div>
                </div>
             </div>
        </section>

        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="mx-auto aspect-square overflow-hidden rounded-xl object-cover object-center sm:w-full">
                 <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                    {/* Placeholder for About Image if available, otherwise just color */}
                    <span className="text-lg">Driven by Design</span>
                 </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">About Blast & Beyond</h2>
                  <p className="text-xl font-medium text-old_rose-500">Driven by Design. Powered by Protection.</p>
                  <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    I'm Aiden "D" Deshommes, an architecture student at Florida A&M University with a focus on precision, presentation, and long-term results.
                  </p>
                </div>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Blast & Beyond LLC was built to bring professional-grade mobile detailing and paint protection directly to clients who value their vehicles.
                  </p>
                  <p>
                    I work with daily drivers, student vehicles, and clients looking for long-term protection. Every service is tailored to the condition of the vehicle and the level of protection requested.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm font-medium">
                    <div>
                        <div className="text-old_rose-500">Fully Mobile</div>
                        <div className="text-muted-foreground">We come to you</div>
                    </div>
                     <div>
                        <div className="text-old_rose-500">Student-Friendly</div>
                        <div className="text-muted-foreground">Special rates</div>
                    </div>
                     <div>
                        <div className="text-old_rose-500">Paint Protection</div>
                        <div className="text-muted-foreground">Long-term care</div>
                    </div>
                     <div>
                        <div className="text-old_rose-500">Premium Quality</div>
                        <div className="text-muted-foreground">Attention to detail</div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="gallery" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Recent Projects</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Real results from real clients
                </p>
              </div>
            </div>
            <div className="mx-auto py-12">
              <GalleryFL />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Clients Say</h2>
              <div className="mx-auto w-full max-w-3xl">
                <TestimonialsFL />
              </div>
            </div>
          </div>
        </section>

        <section id="quote" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Request Your Estimate</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  First-time details often require more time and labor. Pricing reflects vehicle condition.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-lg py-12">
              <QuoteFormFL />
            </div>
          </div>
        </section>
        
        <footer className="w-full border-t bg-background py-6 md:py-12">
            <div className="container px-4 md:px-6">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                             <Image
                                src="/blastnbeyond_logo.png"
                                alt="Blast & Beyond Logo"
                                width={40}
                                height={40}
                                className="object-contain"
                            />
                            <span className="text-xl font-bold">Blast & Beyond LLC</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Professional Mobile Auto Detailing & Paint Protection.</p>
                        <p className="text-sm font-medium italic">Driven by Design. Powered by Protection.</p>
                    </div>
                     <div className="space-y-4">
                        <h3 className="font-medium">Contact & Area</h3>
                         <ul className="space-y-2 text-sm text-muted-foreground">
                            <li>Phone: (479) 354-2848</li>
                            <li>Based in Tallahassee, FL</li>
                            <li>Serving 25+ mile radius including:</li>
                            <li>Quincy, Havana, Crawfordville, Monticello, Woodville, Midway</li>
                         </ul>
                    </div>
                     <div className="space-y-4">
                        <h3 className="font-medium">Referral Program</h3>
                        <p className="text-sm text-muted-foreground">$20 off your next service for referring a friend who books a full detail!</p>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
                    © 2026 Blast & Beyond LLC. All rights reserved. | Fully Mobile • Student-Friendly
                </div>
            </div>
        </footer>
      </main>
    </div>
  )
}
