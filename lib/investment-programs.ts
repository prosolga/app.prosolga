export type InvestmentProgram = {
  slug: string
  name: string
  category: "cbi" | "rbi" | "golden-visa"
  country: string
  minimumInvestment: string
  timeline: string
  summary: string
  benefits: string[]
}

export const investmentPrograms: InvestmentProgram[] = [
  {
    slug: "grenada-cbi",
    name: "Grenada Citizenship by Investment",
    category: "cbi",
    country: "Grenada",
    minimumInvestment: "$150,000 donation or $220,000 real estate",
    timeline: "120–150 days",
    summary:
      "Dual citizenship with visa-free access to 140+ countries and an E-2 treaty with the United States, ideal for entrepreneurs.",
    benefits: ["No residency requirement", "Family-inclusive applications", "Access to the US E-2 visa route"],
  },
  {
    slug: "dominica-cbi",
    name: "Dominica Citizenship by Investment",
    category: "cbi",
    country: "Dominica",
    minimumInvestment: "$100,000 donation",
    timeline: "90–120 days",
    summary:
      "Efficient, cost-effective citizenship that grants extensive travel freedom for wealth planners and frequent travellers.",
    benefits: ["Straightforward diligence", "Generational inclusion", "No wealth or inheritance taxes"],
  },
  {
    slug: "portugal-rbi",
    name: "Portugal Residency by Investment",
    category: "rbi",
    country: "Portugal",
    minimumInvestment: "€500,000 fund subscription",
    timeline: "8–12 months",
    summary:
      "A strategic foothold in the European Union with a pathway to citizenship after five years of residency compliance.",
    benefits: ["Live, work, study rights in Portugal", "Schengen mobility", "Attractive tax structuring options"],
  },
  {
    slug: "uae-golden-visa",
    name: "UAE 10-Year Golden Visa",
    category: "golden-visa",
    country: "United Arab Emirates",
    minimumInvestment: "AED 2M property investment",
    timeline: "60–90 days",
    summary:
      "Long-term residency in Dubai or Abu Dhabi for investors, founders, and specialised talent with no personal income tax.",
    benefits: ["Sponsor family members", "Operate businesses in a global hub", "No local partner requirement"],
  },
  {
    slug: "uk-innovator-founder",
    name: "UK Innovator Founder Visa",
    category: "rbi",
    country: "United Kingdom",
    minimumInvestment: "Endorsed business plan (no minimum capital)",
    timeline: "3–6 months",
    summary:
      "Residency for innovators building scalable companies in the UK with a route to settlement after three years.",
    benefits: ["Fast-track settlement", "Access to UK market", "Eligible for family inclusion"],
  },
]

export const programCategories = [
  {
    key: "cbi",
    title: "Citizenship by Investment (CBI)",
    summary:
      "Acquire a powerful second passport through government-approved investments and unlock visa-free access for your family.",
    programs: investmentPrograms.filter((program) => program.category === "cbi"),
  },
  {
    key: "rbi",
    title: "Residency by Investment (RBI)",
    summary:
      "Secure long-term residency in strategic jurisdictions with compliant investments in funds, businesses, or property.",
    programs: investmentPrograms.filter((program) => program.category === "rbi"),
  },
  {
    key: "golden-visa",
    title: "Golden Visa Programs",
    summary:
      "Long-duration visas for investors, founders, and exceptional talent in leading innovation and wealth hubs.",
    programs: investmentPrograms.filter((program) => program.category === "golden-visa"),
  },
]

export function getInvestmentProgram(slug: string) {
  return investmentPrograms.find((program) => program.slug === slug)
}
