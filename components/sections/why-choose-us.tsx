"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ShieldCheck, Layers, Lock, Globe } from "lucide-react"

const features = [
  {
    title: "Independent Expertise",
    description:
      "Impartial advice exclusively focused on your best interests. We are not tied to any single institution.",
    icon: ShieldCheck,
  },
  {
    title: "Integrated Solutions",
    description:
      "Structure your corporate entity, secure your new residency, and acquire property, all under one roof.",
    icon: Layers,
  },
  {
    title: "Confidentiality & Trust",
    description:
      "Discretion is the cornerstone of our business. We handle all client affairs with the utmost confidentiality.",
    icon: Lock,
  },
  {
    title: "Global Reach",
    description: "With a presence in key financial hubs, we offer a truly global service with expert local knowledge.",
    icon: Globe,
  },
]

export function WhyChooseUsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
              A Global Perspective, <br />
              <span className="text-secondary">A Personalised Approach</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We understand that navigating the complexities of global business, residency, and property investment
              requires a trusted, expert partner. Our integrated approach ensures seamless, confidential, and effective
              advice.
            </p>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/collated/4.png"
                alt="Professional Consultation"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-primary/10 mix-blend-multiply" />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col space-y-3"
              >
                <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold text-primary">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
