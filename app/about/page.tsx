"use client"

import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Globe2, Award, CheckCircle2, TrendingUp } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

const values = [
  {
    title: "Client-Centric Excellence",
    description:
      "Every recommendation aligns with your stated ambitions. We tailor governance, mobility, and investment roadmaps to the people behind the mandates.",
    icon: Target,
  },
  {
    title: "Integrity & Confidentiality",
    description:
      "Absolute discretion underpins our work. We safeguard data, relationships, and decisions with the highest professional ethics.",
    icon: Award,
  },
  {
    title: "Speed, Competence & Innovation",
    description:
      "Dedicated pods execute quickly with the latest tools, ensuring your organisation benefits from fresh insight and decisive action.",
    icon: TrendingUp,
  },
  {
    title: "Full Compliance",
    description:
      "Our teams coordinate with leading legal and tax partners to keep every structure, filing, and visa fully compliant.",
    icon: CheckCircle2,
  },
  {
    title: "Global Expertise",
    description:
      "Deep knowledge of African, Gulf, European, and Caribbean jurisdictions gives you a single advisor with true worldwide reach.",
    icon: Globe2,
  },
]

const stats = [
  { value: "20+", label: "Years Combined Experience" },
  { value: "20+", label: "Countries Served" },
  { value: "$12.5M+", label: "Transaction Value" },
  { value: "45+", label: "Satisfied Clients" },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
 

        <PageHeader
        title="About Prosolutions Global Advisory"
        subtitle="Your Trusted Partner in Global Migration, Corporate Structuring & International Real Estate Solutions"
        backgroundImage="/collated/about.png"
      />


            {/* NEW: MESSAGE FROM GLOBAL MANAGING PARTNER */}
   

      {/* WHO WE ARE */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-12">
          
            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/collated/who.png"
                alt="Our Team"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
              <div className="space-y-6">
              <h2 className="text-3xl font-bold text-primary">Who We Are</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Prosolutions Global Advisory is a premier international advisory firm specializing in corporate
                services, citizenship and residency programs, and global real estate investment. Founded on the
                principles of excellence, integrity, and client-focused service, we help individuals and businesses
                navigate the complexities of international expansion and wealth management.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our team of seasoned professionals brings together decades of combined experience in international law,
                finance, tax planning, and corporate structuring. We serve a diverse clientele ranging from
                high-net-worth individuals and families to multinational corporations and institutional investors.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                With a global network of trusted partners and a deep understanding of regulatory environments across
                multiple jurisdictions, we deliver comprehensive solutions that protect your assets, optimize your tax
                position, and unlock new opportunities for growth.
              </p>
            </div>
          </div>
        </div>
      </section>



      {/* STATS SECTION */}
      <section className="py-14 lg:py-20 bg-primary text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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

      {/* CORE VALUES */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do and every relationship we build.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-14 h-14 rounded-lg bg-blue-50 flex items-center justify-center mb-6">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="py-14 lg:py-20 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
            <div className="flex-1 order-2 md:order-1">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/collated/mission.png"
                  alt="Our Mission"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  loading="lazy"
                />
              </div>
            </div>
            <div className="flex-1 space-y-6 order-1 md:order-2">
              <h3 className="text-2xl font-bold text-primary">Our Mission</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At ProSolutions Global Advisory, our mission is to empower individuals, families, and businesses with
                strategic pathways to global mobility, global opportunities, wealth preservation &amp; sustainable
                growth.
              </p>
              <ul className="space-y-3">
                {[
                  "Simplify complex international processes",
                  "Provide transparent, ethical guidance",
                  "Deliver measurable results and value",
                  "Build lasting client relationships",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-secondary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1 space-y-6">
              <h3 className="text-2xl font-bold text-primary">Our Vision</h3>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the most trusted global partner of choice for alternative residency and citizenship, international
                real estate investment, global business structuring, and wealth planning solutions, recognised for our
                expertise, integrity, and client success stories.
              </p>
              <ul className="space-y-3">
                {[
                  "Leading innovation in global advisory",
                  "Expanding our network of excellence",
                  "Setting industry standards for service",
                  "Creating opportunities for global citizens",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <TrendingUp className="h-5 w-5 text-secondary" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex-1">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/collated/vision.png"
                  alt="Our Vision"
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

      {/* WHY CHOOSE US */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Why Choose Prosolutions?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine global reach with local expertise to deliver unparalleled service.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {[
              {
                title: "Comprehensive Services",
                description:
                  "From corporate formation to citizenship programs and real estate investment, we offer end-to-end solutions under one roof.",
              },
              {
                title: "Expert Team",
                description:
                  "Our professionals hold advanced degrees and certifications in law, finance, and international business.",
              },
              {
                title: "Global Network",
                description:
                  "Strategic partnerships with leading firms, banks, and government agencies in over 50 countries.",
              },
              {
                title: "Proven Track Record",
                description:
                  "45+ cross-border mandates completed since launch, with measurable value delivered for every client.",
              },
              {
                title: "Personalized Approach",
                description:
                  "No two clients are the same. We tailor every solution to your specific needs, goals, and circumstances.",
              },
              {
                title: "Ongoing Support",
                description:
                  "Our relationship doesn't end at project completion. We provide continuous support and guidance as your needs evolve.",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full border-none shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-primary mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

         <section className="py-14 lg:py-20 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="relative max-w-5xl mx-auto">
            {/* Red corner flag */}
            <div className="absolute -top-8 -left-8 w-32 h-32 bg-red-600 clip-path-polygon-[0_0,100%_0,0_100%] -z-10" />

            <h2 className="text-4xl lg:text-5xl font-bold text-primary mb-10">
              Message from our Global Managing Partner
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              {/* Left column: main text */}
              <div className="lg:col-span-2 space-y-6 mt-22 text-lg text-muted-foreground leading-relaxed">
                <p>
                  At ProSolutions, we are driven by a commitment to excellence, innovation, and meaningful impact. Our goal has been to provide strategic solutions that empower individuals and businesses to thrive in an ever-evolving global landscape. We believe in building lasting relationships, delivering real value, and creating opportunities for long-term success.
                </p>
                <p>
                  Our team, the backbone of ProSolution&apos;s success, is a group of experts in their respective fields. Each member brings specialized knowledge and a shared dedication to excellence. This allows us to tailor solutions to our clients&apos; needs comprehensively and effectively.
                </p>
                <p>
                  As we look to the future, our unwavering commitment to innovation, collaboration, and most importantly, your success, continues to drive us forward. Every challenge presents an opportunity, and it is through our shared vision and expertise that we help our clients turn aspirations into reality.
                </p>
                <p>
                  We deeply appreciate your trust in ProSolutions Global Advisory.
                </p>
                <p className="font-medium">Thank you for choosing us.</p>
              </div>

              {/* Right column: pull-quote + photo + signature */}
              <div className="space-y-8">
                {/* Pull-quote */}
                <div className="relative bg-white p-8 rounded-2xl shadow-lg">
                  <span className="absolute -top-6 left-8 text-8xl text-red-600 font-serif leading-none">&ldquo;</span>
                  <p className="text-xl lg:text-2xl font-medium text-primary relative z-10">
                    Our collaborative approach ensures that we provide not just advice but actionable solutions that deliver exceptional results.
                  </p>
                  <span className="absolute -bottom-6 right-8 text-8xl text-red-600 font-serif leading-none">&rdquo;</span>
                </div>

                {/* Photo */}
                <div className="relative mx-auto w-72 h-96 rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="/ceo.png" // ← Replace with the actual path to the photo
                    alt="Chinwe Azikiwe - Global Managing Partner"
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Name & Title */}
                <div className="text-center">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <div className="w-4 h-4 rounded-full bg-red-600" />
                    <h3 className="text-2xl font-bold text-primary">Chinwe Azikiwe</h3>
                  </div>
                  <p className="text-lg text-muted-foreground">Global Managing Partner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 lg:py-20 bg-slate-50">
        <div className="container px-4 md:px-6 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold text-primary">Ready to Start Your Global Journey?</h2>
            <p className="text-xl text-muted-foreground">
              Let's discuss how Prosolutions Global Advisory can help you achieve your international goals.
            </p>
            <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-white px-8 rounded-full" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}