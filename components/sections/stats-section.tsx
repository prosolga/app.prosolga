"use client"

import { motion } from "framer-motion"

const stats = [
  { value: "20+", label: "Years Combined Experience" },
  { value: "20+", label: "Countries Served" },
  { value: "$12.5M+", label: "Transaction Value" },
  { value: "45+", label: "Satisfied Clients" },
]

export function StatsSection() {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="space-y-2"
            >
              <div className="text-4xl md:text-5xl font-bold text-secondary">{stat.value}</div>
              <div className="text-sm md:text-base text-blue-100 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
