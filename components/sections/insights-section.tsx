"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import type { InsightSummary } from "@/lib/insights"

type InsightsSectionProps = {
  insights: InsightSummary[]
}

export function InsightsSection({ insights }: InsightsSectionProps) {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Latest Insights</h2>
            <p className="text-lg text-muted-foreground">
              Expert analysis and updates on global business, investment, and mobility.
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link href="/insights">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((item, index) => (
            <motion.div
              key={item.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-300 group border border-slate-200 rounded-xl bg-white flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.coverImage || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    {item.category}
                  </div>
                </div>
                <div className="px-6 pt-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(item.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="text-xl font-bold group-hover:text-secondary transition-colors line-clamp-2 text-primary">
                    {item.title}
                  </h3>
                </div>
                <div className="px-6 pb-6 pt-3 flex-1 flex flex-col">
                  <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">{item.excerpt}</p>
                  <Button variant="link" className="p-0 h-auto font-semibold text-primary" asChild>
                    <Link href={`/insights/${item.slug}`}>Read More &rarr;</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
