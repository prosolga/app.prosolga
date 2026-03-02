import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unstable_noStore as noStore } from "next/cache"

export type InsightFrontmatter = {
  title: string
  date: string
  category: string
  excerpt: string
  coverImage: string
  enabled?: boolean
}

export type InsightSummary = InsightFrontmatter & {
  slug: string
}

const INSIGHTS_DIR = path.join(process.cwd(), "content/insights")
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH ?? "main"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

function normalizeCoverImage(src: string) {
  if (src.startsWith("/uploads/") && GITHUB_REPO) {
    return `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/public${src}`
  }
  return src
}

function getInsightFilePaths() {
  return fs.readdirSync(INSIGHTS_DIR).filter((file) => file.endsWith(".mdx"))
}

function githubHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
  }
  if (GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${GITHUB_TOKEN}`
  }
  return headers
}

async function getInsightsFromGitHub(): Promise<InsightSummary[]> {
  if (!GITHUB_REPO) return []

  const listRes = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/contents/content/insights?ref=${encodeURIComponent(GITHUB_BRANCH)}`,
    {
      headers: githubHeaders(),
      cache: "no-store",
    },
  )

  if (!listRes.ok) {
    throw new Error(`Failed to list insights from GitHub: ${listRes.status}`)
  }

  const files = (await listRes.json()) as Array<{
    type: string
    name: string
    download_url?: string
  }>

  const insights = await Promise.all(
    files
      .filter((file) => file.type === "file" && file.name.endsWith(".mdx") && file.download_url)
      .map(async (file) => {
        const source = await fetch(file.download_url!, { cache: "no-store" }).then((res) => res.text())
        const { data } = matter(source)
        return {
          slug: file.name.replace(/\.mdx$/, ""),
          ...(data as InsightFrontmatter),
          coverImage: normalizeCoverImage(String((data as InsightFrontmatter).coverImage || "")),
          enabled: (data as InsightFrontmatter).enabled !== false,
        }
      }),
  )

  return insights.filter((item) => item.enabled !== false).sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getAllInsights(limit?: number): Promise<InsightSummary[]> {
  noStore()

  const insights = GITHUB_REPO
    ? await getInsightsFromGitHub()
    : getInsightFilePaths()
        .map((fileName) => {
          const slug = fileName.replace(/\.mdx$/, "")
          const fullPath = path.join(INSIGHTS_DIR, fileName)
          const fileContents = fs.readFileSync(fullPath, "utf8")
          const { data } = matter(fileContents)

          return {
            slug,
            ...(data as InsightFrontmatter),
            coverImage: normalizeCoverImage(String((data as InsightFrontmatter).coverImage || "")),
            enabled: (data as InsightFrontmatter).enabled !== false,
          }
        })
        .filter((item) => item.enabled !== false)
        .sort((a, b) => (a.date < b.date ? 1 : -1))

  return typeof limit === "number" ? insights.slice(0, limit) : insights
}
