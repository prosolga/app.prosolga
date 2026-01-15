"use client"

import { PageHeader } from "@/components/page-header"
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useState } from "react"
import Image from "next/image"

const programs = [
  // CBI
  { id: "grenada", coat: "/collated/coat/grenada.png", name: "Grenada", tagline: "Only Caribbean CBI with E-2 Visa to USA", cost: "$235,000", time: "6–9 months", requirements: "Clean criminal record • Pass due diligence • Age 18+ • No residency required", benefits: ["E-2 Visa access to live/work in USA", "Visa-free to 140+ countries (UK, China, Schengen)", "Dependents up to age 30 + siblings", "Zero worldwide income/wealth/inheritance tax"], investment: "$235,000 donation (family of 4) or $270,000 real estate", intro: "A stable, politically neutral Caribbean island nation known as the \"Spice Isle.\" The only CBI program in the region with an E-2 Visa Treaty with the USA.", image: "/collated/investment/granada.png" },
  { id: "stkitts", coat: "/collated/coat/evis.png", name: "St. Kitts & Nevis", tagline: "World’s oldest CBI program since 1984", cost: "$250,000", time: "4–6 months", requirements: "Clean record • Due diligence • Age 18+ • Interview may apply", benefits: ["157+ visa-free countries", "Hereditary citizenship", "No income/inheritance tax", "Platinum-standard reputation"], investment: "$250,000 donation (family of 4) or $350,000 real estate", intro: "The original and most prestigious citizenship-by-investment program with unmatched reputation and speed.", image: "/collated/investment/st.png" },
  { id: "dominica", coat: "/collated/coat/dominica.png", name: "Dominica", tagline: "Most affordable & eco-friendly citizenship", cost: "$200,000", time: "6–9 months", requirements: "Clean record • Due diligence • Age 18+", benefits: ["Lowest-cost reputable CBI", "140+ visa-free countries", "No global income tax", "Children up to age 30"], investment: "$200,000 donation or real estate", intro: "Known as the \"Nature Isle,\" offering one of the world’s most cost-effective and reputable CBI programs.", image: "/collated/investment/dominica.png" },
  { id: "turkey", coat: "/collated/coat/turkey.png", name: "Turkey", tagline: "Fast citizenship + E-2 Visa + strategic location", cost: "$400,000", time: "6–8 months", requirements: "Age 18+ • Clean record • Hold property 3 years", benefits: ["US E-2 Visa access", "110+ visa-free countries", "Recoverable investment", "Europe-Asia bridge"], investment: "$400,000 real estate (resale after 3 years)", intro: "Eurasian powerhouse with recoverable real estate investment and access to the US E-2 Visa.", image: "/collated/investment/turkey.png" },

  // RBI
  { id: "portugal", coat: "/collated/coat/portugal.png", name: "Portugal Golden Visa", tagline: "Europe’s #1 – only 7 days/year stay", cost: "€250,000", time: "12–18 months", requirements: "Non-EU • Clean record • Avg. 7 days/year stay", benefits: ["Path to EU passport in 5 years", "Only 7 days/year required", "Schengen freedom", "Full family inclusion"], investment: "€250,000 cultural or €500,000 fund", intro: "The leading European residency program with minimal presence and a clear path to EU citizenship.", image: "/collated/investment/portugal.png" },
  { id: "greece", coat: "/collated/coat/greece.png", name: "Greece Golden Visa", tagline: "Europe’s most accessible residency-by-investment program", cost: "€250,000", time: "4–6 months", requirements: "Clean record • Due diligence • Age 18+ • Property purchase or qualifying investment • Valid health insurance", benefits: ["Fast EU residency with no physical stay requirement", "Visa-free movement across the Schengen Area", "Include spouse, children up to 21, and parents", "Secure long-term asset through property investment", "Pathway to EU permanent residency and citizenship"], investment: "€250,000 real estate (higher in prime regions)", intro: "Enjoy the Mediterranean lifestyle and a strategic EU base through Greece’s flexible residency-by-investment route.", image: "/collated/investment/greece.png" },
  { id: "uae", coat: "/collated/coat/uae.png", name: "UAE Golden Visa", tagline: "10-year residency • No minimum stay", cost: "$545,000", time: "1–3 months", requirements: "Real estate, funds, or talent route", benefits: ["10-year renewable visa", "No 180-day rule", "Sponsor parents & all children", "0% personal tax"], investment: "AED 2M (~$545K) real estate/funds", intro: "Live tax-free in Dubai/Abu Dhabi with zero stay requirement and family sponsorship.", image: "/collated/investment/dubai.png" },
  { id: "usa-eb5", coat: "/collated/coat/usa.webp", name: "USA EB-5", tagline: "Direct U.S. Green Card via investment", cost: "$800,000", time: "2–5 years", requirements: "Invest in approved project • Create 10 jobs", benefits: ["U.S. Green Card for family", "Live/work anywhere", "Path to citizenship", "In-state tuition"], investment: "$800,000 in Targeted Employment Area", intro: "Permanent residency (Green Card) for you and your family through job-creating investment.", image: "/collated/investment/eb-5.png" },
  { id: "usa-eb3", coat: "/collated/coat/usa.webp", name: "USA EB-3 Program", tagline: "Work & live in the United States through employment sponsorship", cost: "$0 Investment", time: "12–18 months", requirements: "Age 18+ • Clean medical and criminal record • Job offer from a certified U.S. employer • Ability to meet role requirements • PERM labor certification approval", benefits: ["Direct Green Card pathway for the whole family", "Live, work, and study anywhere in the USA", "Access to world-class education and healthcare", "No investment required", "Citizenship eligibility after 5 years of residency"], investment: "Approved U.S. employer sponsorship (EB-3 Skilled/Unskilled/Professional)", intro: "A straight employment-based route for skilled and unskilled workers seeking long-term stability in America.", image: "/collated/investment/eb-3.png" },
  { id: "usa-business", coat: "/collated/coat/usa.webp", name: "U.S. L-1 / EB-2 NIW", tagline: "For executives & top talent – no big investment", cost: "Fees only", time: "1–18 months", requirements: "L-1: 1 year with foreign company • EB-2 NIW: advanced degree + national interest", benefits: ["Start working in USA immediately", "Lower cost", "Direct Green Card path", "Family included"], investment: "Legal & filing fees only", intro: "Fast U.S. residency for company owners and exceptional professionals.", image: "/collated/investment/l1-Visa.png" },
  { id: "canada-pr", coat: "/collated/coat/canada.png", name: "Canada Permanent Residency", tagline: "One of the world’s most welcoming immigration pathways", cost: "Varies by program", time: "6–18 months", requirements: "Clean record • Education & skills assessment • Language test (IELTS/CELPIP) • Age 18+ • Proof of funds (program-dependent)", benefits: ["Direct pathway to Canadian permanent residency", "Access to high-quality education and healthcare", "Safe, diverse, and family-friendly environment", "Multiple immigration routes (Express Entry, PNP, Study-to-PR, Work Permits)", "Citizenship eligibility after 3 years of residency"], investment: "Program-based eligibility (Express Entry, PNP, Study-to-PR, Work Permits)", intro: "Canada’s mix of Express Entry, Provincial Nominee, and study/work pathways offers flexible options for families and professionals.", image: "/collated/investment/canada.png" },
]

function ProgramCard({ program, isOpen, onToggle }: { 
  program: typeof programs[0]
  isOpen: boolean
  onToggle: () => void 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
        {/* Collapsed Header */}
        <button
          onClick={onToggle}
          className="w-full px-5 sm:px-6 lg:px-8 py-5 sm:py-6 lg:py-8 flex items-center justify-between gap-4 sm:gap-6 text-left hover:bg-gray-50 transition-colors"
          aria-expanded={isOpen}
          aria-controls={`details-${program.id}`}
        >
          <div className="flex items-center gap-4 sm:gap-5 flex-1">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 flex-shrink-0">
              <Image
                src={program.coat}
                alt={`${program.name} coat of arms`}
                fill
                className="object-contain"
                sizes="64px"
              />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary leading-tight">
                {program.name}
              </h3>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mt-0.5 sm:mt-1 line-clamp-2 sm:line-clamp-none">
                {program.tagline}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6 lg:gap-8 flex-shrink-0">
            <div className="bg-primary/5 text-primary px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 rounded-xl sm:rounded-2xl text-lg sm:text-xl lg:text-2xl font-bold shadow-sm border border-primary/10 whitespace-nowrap">
              {program.cost}
            </div>

            {isOpen ? (
              <ChevronUp className="w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground flex-shrink-0" />
            ) : (
              <ChevronDown className="w-6 h-6 sm:w-7 sm:h-7 text-muted-foreground flex-shrink-0" />
            )}
          </div>
        </button>

        {/* Expanded Content */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="px-5 sm:px-6 lg:px-8 pb-6 sm:pb-8 border-t border-gray-200">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
                  {/* Image + Investment - First on mobile */}
                  <div className="lg:col-span-1 order-1 lg:order-2 flex flex-col items-center justify-start gap-4 sm:gap-6">
                    <div className="relative w-full aspect-[4/3] sm:aspect-[5/3] lg:aspect-auto lg:h-80 xl:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-md sm:shadow-lg">
                      <Image
                        src={program.image}
                        alt={`${program.name} scenic view`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                      />
                    </div>

                    <div className="text-center">
                      <p className="text-lg sm:text-xl lg:text-2xl font-bold text-primary">{program.investment}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                        Minimum Qualifying Investment
                      </p>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="lg:col-span-2 order-2 lg:order-1 space-y-6 sm:space-y-8">
                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-primary mb-3 sm:mb-4">Requirements</h4>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
                        {program.requirements}
                      </p>

                      <div className="bg-gray-100 px-4 py-3 sm:px-5 sm:py-4 rounded-lg sm:rounded-xl">
                        <h5 className="font-semibold text-primary text-sm sm:text-base mb-1">
                          Processing Duration
                        </h5>
                        <p className="text-base sm:text-lg font-medium text-primary">{program.time}</p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg sm:text-xl font-bold text-primary mb-3">Key Benefits</h4>
                      <ul className="space-y-2">
                        {program.benefits.map((b) => (
                          <li key={b} className="flex items-start gap-2 text-sm sm:text-base">
                            <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="pt-4 sm:pt-6 border-t border-gray-200 text-center">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {program.intro}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function CitizenshipRelocationPage() {
  const [openId, setOpenId] = useState<string | null>(null)

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  const cbiPrograms = programs.slice(0, 4)
  const rbiPrograms = programs.slice(4)

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <PageHeader
        title="Citizenship & Residency by Investment"
        subtitle="Your gateway to global mobility, security, and lifestyle flexibility."
        backgroundImage="/collated/citizen.png"
      />

      {/* CBI Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Citizenship by Investment</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Full second citizenship in months — powerful passport & generational security
            </p>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {cbiPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                isOpen={openId === program.id}
                onToggle={() => toggleOpen(program.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* RBI Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-5 sm:px-6 max-w-7xl">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary mb-3">Residency by Investment</h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Live, work & study in the world’s top destinations
            </p>
          </div>

          <div className="space-y-5 sm:space-y-6">
            {rbiPrograms.map((program) => (
              <ProgramCard
                key={program.id}
                program={program}
                isOpen={openId === program.id}
                onToggle={() => toggleOpen(program.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="container mx-auto px-5 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-5 sm:mb-6">
            Start Your Journey Today
          </h2>
          <p className="text-lg sm:text-xl opacity-90 mb-8 sm:mb-10 max-w-xl sm:max-w-2xl mx-auto">
            Get confidential advice from our senior migration experts
          </p>
          <Button 
            size="lg" 
            className="text-base sm:text-lg px-8 sm:px-12 py-6 sm:py-8 rounded-full font-semibold"
            asChild
          >
            <Link href="/contact">Request Free Consultation</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
