import Link from "next/link"
import { PageHeader } from "@/components/page-header"

const clauses = [
  {
    title: "Engagement",
    content:
      "Services commence once an engagement letter is executed and applicable retainers are received. Scope changes require written confirmation.",
  },
  {
    title: "Confidentiality",
    content:
      "We treat all client information as strictly confidential and implement technical and organisational safeguards that meet DIFC and GDPR requirements.",
  },
  {
    title: "Liability",
    content:
      "Prosolutions Global Advisory is not liable for indirect or consequential losses. Total liability is capped at the value of fees paid under the relevant engagement.",
  },
  {
    title: "Governing Law",
    content: "These terms are governed by the laws of the Dubai International Financial Centre (DIFC).",
  },
]

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Terms of Service"
        subtitle="The legal framework that governs every Prosolutions Global Advisory engagement."
        backgroundImage="/diverse-businessman.png"
      />
      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6 max-w-4xl space-y-8">
          {clauses.map((clause) => (
            <div key={clause.title} className="space-y-2">
              <h2 className="text-xl font-semibold text-primary">{clause.title}</h2>
              <p className="text-muted-foreground">{clause.content}</p>
            </div>
          ))}
          <p className="text-sm text-muted-foreground">
            For clarification on these terms please contact{" "}
            <Link href="mailto:legal@prosolga.com" className="underline">
              legal@prosolga.com
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  )
}
