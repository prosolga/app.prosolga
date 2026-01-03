import Link from "next/link"
import { PageHeader } from "@/components/page-header"

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect contact information, engagement history, and documentation required to deliver corporate, citizenship, and real estate mandates. Sensitive documents are stored in encrypted environments located in the UAE and EU.",
  },
  {
    title: "How We Use Your Data",
    content:
      "Data is used to communicate with you, fulfil regulatory requirements, process payments, and deliver the services defined in our engagement letter. We never sell data to third parties.",
  },
  {
    title: "Your Rights",
    content:
      "You may request access, updates, or deletion of your personal information by emailing privacy@prosolga.com. We respond to all verified requests within 30 days.",
  },
]

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Privacy Policy"
        subtitle="Updated November 2024. This policy explains how Prosolutions Global Advisory collects, stores, and protects your information."
        backgroundImage="/professional-team-office.jpg"
      />
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6 max-w-4xl space-y-10">
          {sections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h2 className="text-2xl font-semibold text-primary">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            Questions? Email <Link href="mailto:privacy@prosolga.com">privacy@prosolga.com</Link>.
          </p>
        </div>
      </section>
    </div>
  )
}
