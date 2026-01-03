"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { PageHeader } from "@/components/page-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { caseStudies } from "@/lib/case-studies"

export default function CaseStudiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Case Studies"
        subtitle="Results from corporate structuring, citizenship, and real estate mandates delivered for clients worldwide."
        backgroundImage="/professional-team-office.jpg"
      />

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={study.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow h-full p-0 gap-0">
                  <div className="relative h-56">
                    <Image
                      src={study.heroImage || "/placeholder.svg"}
                      alt={study.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <CardHeader className="pt-6">
                    <p className="text-sm text-muted-foreground">{study.location}</p>
                    <CardTitle className="text-2xl text-primary">{study.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{study.summary}</p>
                    <div className="flex flex-wrap gap-4 text-sm">
                      {study.stats.map((stat) => (
                        <div key={stat.label} className="rounded-full bg-slate-100 px-4 py-1 text-slate-600">
                          <span className="font-semibold text-primary mr-2">{stat.value}</span>
                          {stat.label}
                        </div>
                      ))}
                    </div>
                    <Button variant="link" className="px-0" asChild>
                      <Link href={`/case-studies/${study.slug}`}>View Case Study →</Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
