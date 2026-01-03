import Link from "next/link"
import { notFound } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, CheckCircle2, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getInvestmentProgram, investmentPrograms } from "@/lib/investment-programs"

type ProgramPageProps = {
  params: {
    slug: string
  }
}

export function generateStaticParams() {
  return investmentPrograms.map((program) => ({ slug: program.slug }))
}

export default function ProgramPage({ params }: ProgramPageProps) {
  const program = getInvestmentProgram(params.slug)

  if (!program) {
    notFound()
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <section className="relative h-[320px] overflow-hidden">
        <Image
          src="/professional-team-office.jpg"
          alt={program.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="relative z-10 container h-full flex flex-col justify-center px-4 md:px-6 text-white">
          <Button variant="ghost" className="w-fit mb-4 text-white hover:bg-white/10" asChild>
            <Link href="/citizenship-relocation">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to programs
            </Link>
          </Button>
          <p className="text-sm uppercase tracking-[0.3em] text-secondary">{program.category.toUpperCase()}</p>
          <h1 className="text-3xl md:text-5xl font-bold mt-4">{program.name}</h1>
          <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-200">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {program.country}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" /> {program.timeline}
            </span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container px-4 md:px-6 max-w-4xl space-y-8">
          <Card className="border border-slate-100 shadow-sm">
            <CardContent className="p-8 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-2">Minimum Investment</p>
                <p className="text-2xl font-semibold text-primary">{program.minimumInvestment}</p>
              </div>
              <p className="text-muted-foreground">{program.summary}</p>
            </CardContent>
          </Card>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">Key Benefits</h2>
            <ul className="space-y-3">
              {program.benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-3 text-muted-foreground">
                  <CheckCircle2 className="h-5 w-5 text-secondary" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center space-y-4 pt-4">
            <p className="text-lg text-muted-foreground">
              Need detailed diligence, cost schedules, or ancillary services for this program?
            </p>
            <Button className="bg-secondary hover:bg-secondary/90 text-white px-8 rounded-full" asChild>
              <Link href="/contact">Schedule a Program Briefing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
