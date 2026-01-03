import { HeroSection } from "@/components/sections/hero-section"
import { PartnersSection } from "@/components/sections/partners-section"
import { ServicesSection } from "@/components/sections/services-section"
import { WhyChooseUsSection } from "@/components/sections/why-choose-us"
import { StatsSection } from "@/components/sections/stats-section"
import { ProcessSection } from "@/components/sections/process-section"
import { PortfolioSection } from "@/components/sections/portfolio-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { InsightsSection } from "@/components/sections/insights-section"
import { CTASection } from "@/components/sections/cta-section"
import { getAllInsights } from "@/lib/insights"

export default async function Home() {
  const insights = await getAllInsights(3)

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      <PartnersSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <StatsSection />
      <ProcessSection />
      <PortfolioSection />
      <TestimonialsSection />
      <InsightsSection insights={insights} />
      <CTASection />
    </div>
  )
}
