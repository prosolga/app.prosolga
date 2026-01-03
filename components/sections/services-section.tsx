"use client"

import { motion } from "framer-motion"
import { Building2, Globe2, Landmark, BriefcaseBusiness } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const services = [
  {
    title: "Corporate Services",
    description:
      "Comprehensive company formation and management across key international jurisdictions. Support for businesses of all sizes.",
    icon: Building2,
    href: "/corporate-services",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Citizenship & Residency by Investment",
    description:
      "Expert guidance on citizenship-by-investment, residency permits, and concierge relocation for families and executives.",
    icon: Globe2,
    href: "/citizenship-relocation",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  {
    title: "International Real Estate Advisory",
    description:
      "Discreet advisory and acquisition services for prime residential and commercial properties worldwide.",
    icon: Landmark,
    href: "/real-estate-services",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    title: "Employment Migration",
    description:
      "Workforce mobility strategies, visas, and compliance support for senior executives and specialised talent.",
    icon: BriefcaseBusiness,
    href: "/employment-migration",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Our Core Services</h2>
          <p className="text-lg text-muted-foreground">
            Integrated solutions that protect assets, enhance mobility, and unlock new opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 border-none shadow-md overflow-hidden group">
                <CardHeader>
                  <div
                    className={`w-14 h-14 rounded-2xl ${service.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <service.icon className={`h-7 w-7 ${service.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-primary">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <CardDescription className="text-base leading-relaxed">{service.description}</CardDescription>
                  <Button variant="link" className={`p-0 h-auto font-semibold ${service.color}`} asChild>
                    <Link href={service.href}>Learn More &rarr;</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
