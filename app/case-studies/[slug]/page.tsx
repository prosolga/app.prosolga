import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ArrowLeft, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { caseStudies, getCaseStudy } from "@/lib/case-studies"

type CaseStudyPageProps = {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }))
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const study = getCaseStudy(params.slug)

  if (!study) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <section
        className="relative h-[360px] overflow-hidden bg-slate-900"
        style={{
          backgroundImage: study.heroImage ? `url(${study.heroImage})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Image
          src={study.heroImage || "/placeholder.svg"}
          alt={study.title}
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="relative z-10 container h-full flex flex-col justify-center px-4 md:px-6 text-white">
          <Button variant="ghost" className="w-fit mb-4 text-white hover:bg-white/10" asChild>
            <Link href="/case-studies">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Case Studies
            </Link>
          </Button>
          <p className="text-sm uppercase tracking-[0.3em] text-secondary">{study.category}</p>
          <h1 className="text-3xl md:text-5xl font-bold mt-4">{study.title}</h1>
          <div className="mt-4 flex items-center text-sm text-slate-200">
            <MapPin className="mr-2 h-4 w-4" /> {study.location}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6 max-w-5xl space-y-10">
          <Card className="border border-slate-100 shadow-sm">
            <CardContent className="p-8 space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">Challenge</h2>
                <p className="text-muted-foreground">{study.challenge}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">Solution</h2>
                <p className="text-muted-foreground">{study.solution}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-primary mb-2">Outcome</h2>
                <p className="text-muted-foreground">{study.outcome}</p>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                {study.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl bg-slate-100 px-4 py-3 text-center min-w-[160px] border border-slate-200"
                  >
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs uppercase tracking-wider text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="text-center space-y-4">
            <h3 className="text-2xl font-semibold text-primary">Need a similar outcome?</h3>
            <p className="text-muted-foreground">
              Book a discovery call and we&lsquo;ll map the governance, citizenship, or real estate plan that matches your
              objectives.
            </p>
            <Button className="bg-secondary hover:bg-secondary/90 text-white" asChild>
              <Link href="/contact">Schedule Consultation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
