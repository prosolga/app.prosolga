"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { caseStudies } from "@/lib/case-studies"

export function PortfolioSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Case Studies</h2>
            <p className="text-lg text-muted-foreground">
              Explore real case studies that demonstrate how we help clients achieve global mobility, secure residency, and structure cross-border assets.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {caseStudies.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              >
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="w-full text-left">
                      <div className="overflow-hidden border border-slate-100 bg-white shadow-md group h-full cursor-pointer hover:shadow-lg transition-shadow rounded-xl flex flex-col">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={project.heroImage || "/placeholder.svg"}
                            alt={project.title}
                            fill
                            className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            loading={index === 0 ? "eager" : "lazy"}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          <Badge className="absolute top-4 right-4 bg-white/90 text-primary">
                            {project.category}
                          </Badge>
                        </div>
                        <div className="p-5 flex-1 flex flex-col gap-2">
                          <div className="text-sm text-muted-foreground">{project.location}</div>
                          <h3 className="text-lg font-bold text-primary group-hover:text-secondary transition-colors">
                            {project.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{project.summary}</p>
                        </div>
                      </div>
                    </button>
                  </DialogTrigger>

                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-8">
                  <DialogHeader>
                    <DialogTitle className="text-2xl md:text-3xl font-bold">
                      {project.fullTitle || project.title}
                    </DialogTitle>
                    <DialogDescription className="mt-4 flex items-center gap-4 text-base">
                      <Badge>{project.category}</Badge>
                      <span className="font-medium text-primary">{project.location}</span>
                    </DialogDescription>
                  </DialogHeader>

                  <div className="mt-8 prose prose-lg max-w-none text-muted-foreground">
                    {/* Client Overview */}
                    {project.clientOverview && (
                      <>
                        <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">Client Overview</h3>
                        <p className="leading-relaxed">{project.clientOverview}</p>
                      </>
                    )}

                    {/* Objectives */}
                    {project.objectives && (
                      <>
                        <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">Objectives</h3>
                        <div dangerouslySetInnerHTML={{ __html: project.objectives.replace(/\n/g, "<br />") }} />
                      </>
                    )}

                    {/* Solution */}
                    {project.solution && (
                      <>
                        <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">Solution</h3>
                        <div dangerouslySetInnerHTML={{ __html: project.solution.replace(/\n/g, "<br />") }} />
                      </>
                    )}

                    {/* Outcome */}
                    {project.outcome && (
                      <>
                        <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">Outcome</h3>
                        <div dangerouslySetInnerHTML={{ __html: project.outcome.replace(/\n/g, "<br />") }} />
                      </>
                    )}

                    {/* Client Feedback */}
                    {project.feedback && (
                      <>
                        <h3 className="text-2xl font-bold text-foreground mt-10 mb-4">Client Feedback</h3>
                        <blockquote className="border-l-4 border-primary pl-6 italic text-xl text-foreground">
                          "{project.feedback}"
                        </blockquote>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
