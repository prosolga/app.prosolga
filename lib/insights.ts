import type React from "react"
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { compileMDX } from "next-mdx-remote/rsc"

export type InsightFrontmatter = {
  title: string
  date: string
  category: string
  excerpt: string
  coverImage: string
}

export type InsightSummary = InsightFrontmatter & {
  slug: string
}

export type InsightDetail = InsightSummary & {
  content: React.ReactElement
}

const INSIGHTS_DIR = path.join(process.cwd(), "content/insights")

function getInsightFilePaths() {
  return fs.readdirSync(INSIGHTS_DIR).filter((file) => file.endsWith(".mdx"))
}

export async function getAllInsights(limit?: number): Promise<InsightSummary[]> {
  const insights = getInsightFilePaths()
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(INSIGHTS_DIR, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data } = matter(fileContents)

      return {
        slug,
        ...(data as InsightFrontmatter),
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))

  return typeof limit === "number" ? insights.slice(0, limit) : insights
}

export async function getInsightBySlug(slug: string): Promise<InsightDetail> {
  const filePath = path.join(INSIGHTS_DIR, `${slug}.mdx`)

  if (!fs.existsSync(filePath)) {
    throw new Error(`Insight not found: ${slug}`)
  }

  const source = await fs.promises.readFile(filePath, "utf8")
  const { content, frontmatter } = await compileMDX<InsightFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
  })

  return {
    slug,
    content,
    ...frontmatter,
  }
}
