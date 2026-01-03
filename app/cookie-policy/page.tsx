import { PageHeader } from "@/components/page-header"

const cookies = [
  {
    title: "Essential Cookies",
    copy: "Required for the website to function. These manage session security, language preferences, and load balancing.",
  },
  {
    title: "Analytics Cookies",
    copy: "Aggregate usage data helps us improve content relevance. We use privacy-centric analytics that anonymise IP addresses.",
  },
  {
    title: "Marketing Cookies",
    copy: "Used only when visitors opt in to receive updates about new services or events. You can withdraw consent at any time.",
  },
]

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Cookie Policy"
        subtitle="How and why we use cookies, plus how you can control your preferences."
        backgroundImage="/diverse-woman-portrait.png"
      />
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6 max-w-4xl space-y-8">
          {cookies.map((item) => (
            <div key={item.title} className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">{item.title}</h2>
              <p className="text-muted-foreground">{item.copy}</p>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            Update your preferences at any time via your browser settings or email privacy@prosolga.com.
          </p>
        </div>
      </section>
    </div>
  )
}
