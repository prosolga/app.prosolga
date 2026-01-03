// app/insights/[slug]/page.tsx
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Calendar, Clock, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllInsights, getInsightBySlug } from "@/lib/insights";
import { readingTime } from "@/lib/utils"; // ← import here

type InsightPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const insights = await getAllInsights();
  return insights.map((item) => ({ slug: item.slug }));
}

export default async function InsightPage({ params }: InsightPageProps) {
  const { slug } = await params;
  const insight = await getInsightBySlug(slug).catch(() => null);

  if (!insight) notFound();

  // Calculate reading time
  const readTimeMinutes = readingTime(
    // Use the appropriate field depending on your content format
    typeof insight.content === "string" 
      ? insight.content 
      : "" // fallback if content is JSX/MDX component
  );

  return (
    <article className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[360px] w-full">
        <Image
          src={insight.coverImage || "/placeholder-blog-hero.jpg"}
          alt={insight.title}
          fill
          className="object-cover brightness-[0.85]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        
        <div className="relative z-10 container h-full flex flex-col justify-end pb-12 px-4 md:px-8 max-w-5xl mx-auto text-white">
          <div className="space-y-4">
            {insight.category && (
              <span className="inline-block px-3 py-1 text-xs font-medium uppercase tracking-wider bg-primary/90 text-white rounded-full">
                {insight.category}
              </span>
            )}
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              {insight.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-200">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {new Date(insight.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
              
              <div className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                {readTimeMinutes} min read
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-4xl mx-auto px-4 md:px-8 py-12 md:py-16 lg:py-20">
        {/* Back button */}
        <Button
          variant="ghost"
          className="mb-10 -ml-4 text-muted-foreground hover:text-foreground"
          asChild
        >
          <Link href="/insights">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to all insights
          </Link>
        </Button>

        {/* Article body */}
        <div 
          className="
            prose prose-slate 
            max-w-none
            prose-headings:scroll-mt-20
            prose-h2:text-3xl prose-h2:font-bold
            prose-h3:text-2xl
            prose-p:leading-relaxed prose-p:text-lg
            prose-li:leading-relaxed
            prose-blockquote:border-l-4 prose-blockquote:border-primary/60 prose-blockquote:pl-6 prose-blockquote:italic
            prose-code:bg-slate-100 prose-code:p-1 prose-code:rounded prose-code:before:content-['`'] prose-code:after:content-['`']
            dark:prose-invert dark:prose-code:bg-slate-800
          "
        >
          {insight.content}
        </div>

        {/* Footer meta */}
        <footer className="mt-16 pt-10 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 text-sm text-muted-foreground">
            <div>
              Published on {new Date(insight.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            
            <Button variant="outline" size="sm" asChild>
              <Link href="/insights">
                More Insights <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </footer>
      </div>
    </article>
  );
}