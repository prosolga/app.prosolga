"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BriefcaseBusiness, Globe2, ShieldCheck, Users2, Plane, CheckCircle2 } from "lucide-react"

const whatWeDo = [
  {
    title: "Work Permits & Visa Programs",
    description: "Full advisory, documentation, and processing for:",
    bullets: [
      "EU work permits (construction, caregiving, hospitality, engineering, logistics)",
      "UK Skilled Worker visas (healthcare, IT, trades, finance, hospitality)",
      "US employment programs (EB-3 skilled/unskilled, H-1B, L-1 for executives)",
    ],
    icon: BriefcaseBusiness,
  },
  {
    title: "Blue-Collar & Skilled Worker Mobilisation",
    description: "We support multinational recruitment drives for roles such as:",
    bullets: [
      "Construction teams, factory staff, welders, plumbers, electricians",
      "Truck drivers, warehouse operatives, logistics coordinators",
      "Caregivers, nurses, medical assistants, hospitality teams",
    ],
    icon: Users2,
  },
  {
    title: "White-Collar & Executive Relocation",
    description: "End-to-end mobility management for:",
    bullets: [
      "Senior executives relocating to HQs in the US, UK, or EU",
      "Managers, analysts, and specialists on project assignments",
      "Founders and leadership teams expanding into new markets",
      "Intra-company transfers (L-1, ICT, EU Blue Card)",
    ],
    icon: Globe2,
  },
]

const corporateMobility = [
  {
    title: "Global Mobility Compliance",
    description:
      "Policy design, employer-of-record structures, regulatory training for HR teams, and tax guidance aligned with corporate governance.",
    icon: ShieldCheck,
  },
  {
    title: "Workforce Deployment for Multinationals",
    description:
      "Move staff into new subsidiaries, transfer teams for short- and long-term projects, and secure bulk work permits for large recruitment needs.",
    icon: Plane,
  },
  {
    title: "Relocation Concierge for Employees",
    description:
      "Housing, schooling, onboarding, and family support so employees transition seamlessly into their new markets.",
    icon: Users2,
  },
]

const corridors = [
  {
    region: "Africa → EU",
    focus: "Manufacturing, care, logistics, construction, and engineering hires entering European labour markets.",
  },
  {
    region: "Africa → UK",
    focus: "Healthcare professionals, hospitality workers, IT specialists, and skilled trades securing UK sponsorship.",
  },
  {
    region: "Africa → USA",
    focus: "EB-3 (food processing, caregiving, hospitality), L-1 executives, and H-1B tech professionals relocating to America.",
  },
  {
    region: "GCC → Europe",
    focus: "Re-mobilisation of technical staff, nurses, and skilled trades to fill EU shortages.",
  },
]

export default function EmploymentMigrationPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader
        title="Employment Migration & Global Talent Mobility"
        subtitle="Connecting skilled workers, professionals, and executives with compliant pathways to work in the Middle East, EU, US, and UK."
        backgroundImage="/collated/employment.png"
      />

      <section className="py-16 md:py-20">
        <div className="container px-4 md:px-6 max-w-5xl space-y-6">
          <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
            <h2 className="text-3xl font-bold text-primary">Move Talent. Fill Roles. Power Global Expansion.</h2>
            <p>
              Our Employment Migration practice supports companies, recruiters, and government-approved hiring programs to
              mobilise blue-collar workers, skilled tradespeople, healthcare professionals, tech specialists, and senior
              executives across the world’s most in-demand labour markets.
            </p>
            <p>
              We combine recruitment facilitation, immigration strategy, HR compliance, and relocation support to build
              frictionless work-permit pathways for both employers and candidates.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-12 space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-secondary">What We Do</p>
            <h3 className="text-3xl font-bold text-primary">Work Permits, Worker Mobilisation, Executive Relocation</h3>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Integrated delivery teams manage recruitment, immigration, documentation, and on-ground resettlement for every
              talent tier.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whatWeDo.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-slate-100 shadow-sm">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-xl text-primary">{item.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">{item.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {item.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-secondary mt-0.5 flex-shrink-0" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-12 space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-secondary">Corporate Mobility & ICT Support</p>
            <h3 className="text-3xl font-bold text-primary">
              Compliance, Workforce Deployment, and Relocation Concierge
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corporateMobility.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-slate-100 shadow-sm">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                      <item.icon className="h-6 w-6 text-secondary" />
                    </div>
                    <CardTitle className="text-xl text-primary">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-10 space-y-3">
            <p className="text-sm uppercase tracking-[0.3em] text-secondary">Priority Hiring & Mobility Corridors</p>
            <h3 className="text-3xl font-bold text-primary">High-volume and high-skilled movement where we specialise</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {corridors.map((corridor) => (
              <Card key={corridor.region} className="border border-slate-100 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg text-primary">{corridor.region}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">{corridor.focus}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container px-4 md:px-6 text-center space-y-6 max-w-3xl">
          <h3 className="text-3xl md:text-4xl font-bold">Need to Mobilise Workers or Relocate Staff?</h3>
          <p className="text-lg opacity-90">
            Share your recruitment or expansion plan — we will design a compliant, end-to-end employment migration strategy
            within two weeks.
          </p>
          <Button size="lg" className="bg-white text-black hover:bg-gray-100 px-8 rounded-full" asChild>
            <Link href="/contact">Speak with an Advisor</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
