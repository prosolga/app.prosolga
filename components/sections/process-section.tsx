"use client"

import { motion } from "framer-motion"
import { MessageSquare, FileSearch, CheckCircle2, Rocket } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Consultation",
    description: "We begin with a confidential discussion to understand your specific goals and requirements.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Strategy",
    description: "Our experts develop a tailored roadmap addressing your corporate or personal objectives.",
    icon: FileSearch,
  },
  {
    number: "03",
    title: "Execution",
    description: "We handle all documentation, legalities, and processes with precision and efficiency.",
    icon: Rocket,
  },
  {
    number: "04",
    title: "Success",
    description: "Achieve your goals with our ongoing support and commitment to your long-term success.",
    icon: CheckCircle2,
  },
]

export function ProcessSection() {
  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Engagement Process</h2>
          <p className="text-lg text-slate-400">
            A streamlined, transparent approach to delivering exceptional results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-slate-700 -z-10 transform -translate-y-1/2" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 rounded-full bg-slate-800 border-4 border-slate-700 flex items-center justify-center mb-6 group-hover:border-secondary transition-colors duration-300 relative z-10 shadow-xl">
                  <step.icon className="h-10 w-10 text-secondary" />
                </div>
                <div className="absolute top-0 right-1/2 translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-sm font-bold text-slate-500">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
