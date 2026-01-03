"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, FileText, Users, Globe, Calculator, Scale, Monitor, CheckCircle2 } from "lucide-react"

const services = [
  {
    title: "Company Formation & Structuring",
    description:
      "We manage incorporations in leading jurisdictions, establishing trading entities, holding companies, IBCs, and LLPs aligned with your tax strategy.",
    icon: Building,
  },
  {
    title: "Domiciliary & Registered Agent Services",
    description:
      "Provision of registered offices, resident agents, and handling of statutory mail and legal notices on your behalf.",
    icon: FileText,
  },
  {
    title: "Corporate Director & Officer Services",
    description:
      "Appointment of experienced directors, nominee shareholders, and company secretaries to satisfy substance requirements.",
    icon: Users,
  },
  {
    title: "International Bank Account Opening",
    description:
      "We leverage banking relationships across Africa, the Gulf, and Europe to open and maintain robust multi-currency accounts.",
    icon: Globe,
  },
  {
    title: "Accounting & Payroll",
    description:
      "Full-service bookkeeping, management accounts, and end-to-end payroll support for global teams and contractors.",
    icon: Calculator,
  },
  {
    title: "Tax & Regulatory Compliance",
    description:
      "Economic substance monitoring, corporate tax filings, and liaison with regulators to keep your entities compliant.",
    icon: Scale,
  },
  {
    title: "Back-Office & Virtual Office Solutions",
    description:
      "Dedicated admin support, call handling, and document management so you can operate leanly across borders.",
    icon: Monitor,
  },
]

const programs = [
  {
    title: "Governance & Compliance Suite",
    description:
      "Board support, substance monitoring, and risk reporting designed for multinational holding structures.",
    bullets: ["Resident director appointments", "Automated compliance calendars", "Board and shareholder pack preparation"],
  },
  {
    title: "Financial Operations Hub",
    description:
      "Centralised bookkeeping, payroll, and treasury management with dashboards executives can access in real time.",
    bullets: ["Multi-jurisdiction payroll", "Cash-flow forecasting", "Consolidated management accounts"],
  },
  {
    title: "Strategic Expansion Pod",
    description:
      "A project office that handles visas, licensing, hiring, and vendor onboarding whenever you enter a new market.",
    bullets: ["Regulatory liaison", "Mobility & HR coordination", "Vendor procurement and lease negotiations"],
  },
]

export default function CorporateServicesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Comprehensive Corporate Services"
        subtitle="Entity formation, governance, and operational support for ambitious global companies."
        backgroundImage="/collated/corporate-services.png"
      />

      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Your Trusted Partner for Global Business</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We provide the infrastructure and local substance you need to operate compliantly across Africa, the
                Gulf, Europe, and the Caribbean. Our corporate administrators become an extension of your leadership
                team.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                From governance and accounting to director services and banking, every mandate is delivered by a
                dedicated pod with clear KPIs and secure client collaboration portals.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/collated/trusted.png"
                alt="Corporate advisors collaborating"
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
                <Card className="h-full border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                      <service.icon className="h-6 w-6 text-primary" />
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
              <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/collated/global.png"
                  alt="Strategic corporate planning"
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex-1 space-y-6 order-1 md:order-2">
              <h3 className="text-2xl font-bold text-primary">Global Entity Management</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Precision entity administration keeps your structure investment-ready. We coordinate filings, renewals,
                and regulatory updates across every jurisdiction in your portfolio.
              </p>
              <ul className="space-y-3">
                {[
                  "Multi-jurisdictional coordination",
                  "Annual statutory filings",
                  "Corporate governance support",
                  "Regulatory liaison services",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h3 className="text-2xl font-bold text-primary">Financial & Operational Excellence</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Beyond formation, we deliver the operational backbone your business needs—accurate books, disciplined
                payroll, and proactive tax planning.
              </p>
              <ul className="space-y-3">
                {[
                  "International tax planning",
                  "Cross-border payroll solutions",
                  "Financial reporting & analysis",
                  "Audit coordination",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <div className="relative h-[380px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/collated/finance.png"
                  alt="Financial excellence"
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
        <div className="container px-4 md:px-6 text-center mb-12">
          <h2 className="text-3xl font-bold text-primary mb-4">Specialist Delivery Pods</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Each pod embeds with your leadership team to handle governance, finance, and rapid expansion so you can stay
            focused on growth.
          </p>
        </div>
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {programs.map((program, index) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl text-primary">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{program.description}</p>
                    <ul className="space-y-2">
                      {program.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-center gap-2 text-sm text-slate-600">
                          <CheckCircle2 className="h-4 w-4 text-secondary" />
                          {bullet}
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

      <section className="py-16 bg-slate-50">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-primary">Structuring Your Success</h2>
            <p className="text-xl text-muted-foreground">
              Let us build the corporate foundation your organisation needs to expand confidently.
            </p>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white px-8 rounded-full" asChild>
              <Link href="/contact">Schedule a Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
