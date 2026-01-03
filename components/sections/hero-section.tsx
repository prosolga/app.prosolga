"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const slides = [
  {
    id: 1,
    image: "/collated/home1.png",
    title: "Your Global Future, Secured",
    subtitle:
      "Prosolutions Global Advisory is a premier, independent provider of specialised services for international corporations, private investors, and globally mobile individuals.",
    cta: "Schedule Consultation",
    link: "/contact",
  },
  {
    id: 2,
    image: "/collated/home2.png",
    title: "Strategic Corporate Solutions",
    subtitle:
      "Comprehensive company formation, management, and advisory services tailored to your international business needs.",
    cta: "Explore Services",
    link: "/services",
  },
  {
    id: 3,
    image: "/collated/home3.png",
    title: "Citizenship & Mobility",
    subtitle:
      "Unlock global mobility and secure your family's future with our expert guidance on premier citizenship and residency programs.",
    cta: "Learn More",
    link: "/services",
  },
  {
    id: 4,
    image: "/collated/home4.png",
    title: "Real Estate Investment Advisory",
    subtitle:
      "Secure prime assets across emerging African and global cities with our on-the-ground research and transaction support.",
    cta: "Get Started",
    link: "/contact",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [firstImageLoaded, setFirstImageLoaded] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-slate-900"
      style={{
        backgroundImage: `url(${slides[0].image})`,
        backgroundSize: "cover",
        backgroundPosition: "right center",
      }}
    >
      {/* Background Carousel */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div key={slide.id} className="absolute inset-0">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              onLoadingComplete={() => {
                if (index === 0) setFirstImageLoaded(true)
              }}
              className={`object-cover object-right transition-opacity duration-700 ${currentSlide === index ? "opacity-100" : "opacity-0"}`}
              sizes="100vw"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-900/30 z-10 pointer-events-none" />
      </div>

      <div className="container relative z-20 px-4 md:px-6">
        <div className="max-w-4xl space-y-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${currentSlide}-${firstImageLoaded ? "loaded" : "loading"}`}
              initial={false}
              animate={{ opacity: firstImageLoaded ? 1 : 0, y: firstImageLoaded ? 0 : 10 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-secondary backdrop-blur-sm mb-6">
                <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
                Global Advisory Excellence
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight mb-6">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl leading-relaxed mb-8">
                {slides[currentSlide].subtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8 h-14 rounded-full"
                  asChild
                >
                  <Link href={slides[currentSlide].link}>
                    {slides[currentSlide].cta}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 text-lg px-8 h-14 rounded-full backdrop-blur-sm bg-transparent"
                  asChild
                >
                  <Link href="#services">Our Expertise</Link>
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Carousel Controls */}
      <div className="absolute bottom-10 right-10 z-30 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          className="rounded-full bg-white/10 border-white/20 text-white hover:bg-white/20"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === index ? "w-8 bg-secondary" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  )
}
