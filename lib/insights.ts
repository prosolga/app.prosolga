import fs from "fs"
import path from "path"
import matter from "gray-matter"

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
