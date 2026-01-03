import Link from "next/link"
import Image from "next/image"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowLeft } from "lucide-react"
import { getAllInsights } from "@/lib/insights"

export default async function InsightsPage() {
  const insights = await getAllInsights()

  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader
        title="Insights & Analysis"
        subtitle="Briefings on corporate governance, global mobility, and cross-border investment trends."
        backgroundImage="/insi.jpg"
      />

      <section className="py-16 bg-white">
        <div className="container px-4 md:px-6">
          <Button variant="ghost" className="mb-8" asChild>
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {insights.map((item) => (
              <div
                key={item.slug}
                className="h-full border border-slate-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden rounded-xl bg-white flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.coverImage || "/placeholder.svg"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <div className="px-6 pt-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(item.date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                </div>
                <div className="px-6 pb-6 pt-3 flex-1 flex flex-col gap-4">
                  <p className="text-muted-foreground flex-1">{item.excerpt}</p>
                  <Button variant="link" className="px-0" asChild>
                    <Link href={`/insights/${item.slug}`}>Read Article →</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
