"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-secondary rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white">Ready to Start Your Global Journey?</h2>
          <p className="text-xl text-slate-300 leading-relaxed">
            Let&apos;s discuss how Prosolutions Global Advisory can help you achieve your international growth, mobility, and
            lifestyle goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white text-lg px-8 h-14 rounded-full"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 text-lg px-8 h-14 rounded-full bg-transparent"
              asChild
            >
              <Link href="/services">View Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
