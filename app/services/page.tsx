"use client"

import Link from "next/link"
import Image from "next/image"
import { Building2, Globe2, Home, ArrowRight, Shield, BriefcaseBusiness } from "lucide-react"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const serviceCategories = [
  {
    title: "Corporate Services",
    description:
      "Entity formation, governance, and outsourced administration that keeps your business compliant across multiple jurisdictions.",
    icon: Building2,
    link: "/corporate-services",
    highlights: ["Entity formation & governance", "Director & registered agent services", "Accounting & payroll"],
  },
  {
    title: "Citizenship & Residency",
    description:
      "Tailored citizenship-by-investment strategies, residency planning, and relocation concierge support for families and executives.",
    icon: Globe2,
    link: "/citizenship-relocation",
    highlights: ["Citizenship by investment", "Residency permits", "Mobility & lifestyle planning"],
  },
  {
    title: "International Real Estate Advisory",
    description:
      "Acquisition support, due diligence, and portfolio management for prime residential and commercial assets.",
    icon: Home,
    link: "/real-estate-services",
    highlights: ["Deal sourcing", "Transaction management", "Asset repositioning"],
  },
  {
    title: "Employment Migration",
    description:
      "Visa strategy, mobility compliance, and concierge relocation for executives and specialised talent.",
    icon: BriefcaseBusiness,
    link: "/employment-migration",
    highlights: ["Executive visas", "Mobility compliance", "Talent relocation"],
  },
]

const differentiators = [
  {
    title: "Multi Cultural Expertise",
    copy: "On-the-ground insight across Global markets paired with established hubs in Dubai and London.",
  },
  {
    title: "Confidential & Compliant",
    copy: "Secure client portals, vetted partners, and rigorous compliance protocols at every step.",
  },
  {
    title: "Pod-Based Delivery",
    copy: "Cross-functional teams assigned to each mandate for faster execution and single-point accountability.",
  },
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
       <PageHeader
        title="Employment Migration & Global Talent Mobility"
        subtitle="Connecting skilled workers, professionals, and executives with compliant pathways to work in the Middle East, EU, US, and UK."
        backgroundImage="/collated/2.png"
            //  backgroundImage="/emplo.png"
      />


      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Three Practices. One Seamless Experience.</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every engagement starts with a shared discovery workshop so our corporate, mobility, and real estate
                teams align on your objectives. You gain a unified roadmap, fewer handoffs, and measurable outcomes.
              </p>
              
            </div>
            <div className="relative h-[460px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/collated/seamless.png"
                alt="Prosolutions team session"
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {serviceCategories.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 flex-1 flex flex-col">
                    <p className="text-muted-foreground leading-relaxed break-words">{service.description}</p>
                    <ul className="space-y-2 text-sm text-slate-600">
                      {service.highlights.map((item) => (
                        <li key={item} className="flex items-center gap-2">
                          <Shield className="h-4 w-4 text-secondary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <Button
                      size="lg"
                      className="mt-auto w-full justify-center gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 py-3"
                      asChild
                    >
                      <Link href={service.link} className="flex w-full items-center justify-center gap-2 text-center px-2">
                        <span className="text-base font-semibold leading-snug whitespace-normal break-words text-center">Explore More</span>
                        <ArrowRight className="h-5 w-5 shrink-0" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentiators.map((item) => (
              <Card key={item.title} className="border border-slate-100 shadow-sm h-full">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.copy}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6 text-center space-y-6">
          <h2 className="text-3xl font-bold text-primary">Ready to Map Your Next Move?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Book a discovery call and we&lsquo;ll build a custom implementation roadmap across corporate, mobility, and
            real estate objectives.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white" asChild>
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/case-studies">View Case Studies</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
