"use client"

import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Shield, BarChart, Globe, Building, Gavel, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const services = [
  {
    title: "Buyer's Advisory & Acquisition",
    description:
      "Acting exclusively for you, the buyer. We manage the entire search, negotiation, and acquisition process, providing unbiased advice and due diligence.",
    icon: Search,
  },
  {
    title: "Property Ownership Structuring",
    description:
      "We advise on the most effective structures for holding international real estate to provide privacy, asset protection, and succession planning benefits.",
    icon: Shield,
  },
  {
    title: "Real Estate Portfolio Management",
    description:
      "Consolidated oversight and administration for clients with multiple properties across different jurisdictions, including performance reporting and liaising with local property managers.",
    icon: BarChart,
  },
  {
    title: "Residency & Citizenship-Linked Real Estate",
    description:
      "Specialised sourcing of properties that qualify for Residency or Citizenship-by-Investment programs, ensuring full compliance with program requirements.",
    icon: Globe,
  },
  {
    title: "Commercial & Hospitality Advisory",
    description:
      "Sourcing and due diligence for commercial property, hotels, and development projects for institutional or private investors.",
    icon: Building,
  },
  {
    title: "Financing & Legal Support",
    description:
      "Through our network, we introduce clients to international mortgage lenders and a panel of expert legal counsel to execute transactions smoothly.",
    icon: Gavel,
  },
]

export default function RealEstateServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Global Real Estate Advisory"
        subtitle="Strategic Acquisition and Structuring of International Property"
        backgroundImage="/caribbean-luxury-resort-beach.jpg"
        backgroundVideo="/estate.mp4"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Strategic International Property Investment</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                International real estate is a cornerstone of a well-diversified global asset portfolio. Whether for
                personal use, investment, or as part of a residency or corporate strategy, acquiring property abroad
                requires specialist knowledge.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Prosolutions Global Advisory provides discreet, expert services for the acquisition, structuring, and
                management of international real estate. We are not a broker; we are your independent advisors. Our team
                sources and vets on- and off-market opportunities, from luxury residential homes and vacation properties
                to high-yield commercial and hospitality assets.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/sky.jpg"
                alt="Real Estate Investment"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-amber-50 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-amber-600" />
                    </div>
                    <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-12 mb-24">
            <div className="flex-1 order-2 md:order-1">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/collated/luxury.png"
                  alt="Luxury Residential Properties"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex-1 space-y-6 order-1 md:order-2">
              <h3 className="text-2xl font-bold text-primary">Luxury Residential Properties</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From beachfront villas to penthouse apartments in global capitals, we source exceptional residential
                properties that meet your lifestyle and investment criteria.
              </p>
              <ul className="space-y-3">
                {[
                  "Prime location analysis",
                  "Off-market property access",
                  "Comprehensive due diligence",
                  "Negotiation and closing support",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-amber-600" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h3 className="text-2xl font-bold text-primary">Commercial & Investment Properties</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Build wealth through strategic commercial real estate investments. We identify high-yield opportunities
                in office buildings, retail spaces, and hospitality assets across key markets.
              </p>
              <ul className="space-y-3">
                {[
                  "Market analysis and feasibility studies",
                  "ROI projections and risk assessment",
                  "Portfolio diversification strategies",
                  "Property management coordination",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-amber-600" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/collated/commercial.png"
                  alt="Commercial Properties"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Featured Markets</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We specialize in the world's most dynamic and stable real estate markets.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "London & UK",
                image: "/collated/london.png",
                description: "Prime central London and regional investment opportunities",
              },
              {
                title: "Dubai & UAE",
                image: "/collated/dubai_Preferred.png",
                description: "Tax-free property ownership in the world's fastest-growing city",
              },
              {
                title: "Mediterranean",
                image: "/collated/mediterranean.png",
                description: "Luxury coastal properties in Portugal, Spain, Greece, and Cyprus",
              },
            ].map((market, index) => (
              <motion.div
                key={market.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48">
                    <Image
                      src={market.image || "/placeholder.svg"}
                      alt={market.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{market.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{market.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* </CHANGE> */}

      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-primary">Secure Your Global Asset</h2>
            <p className="text-xl text-muted-foreground">
              Find and structure your next international property investment with confidence.
            </p>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white px-8 rounded-full" asChild>
              <Link href="/contact">Discuss Your Property Goals</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
