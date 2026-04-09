import type React from "react"
import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"
import { unstable_noStore as noStore } from "next/cache"
import type { InsightFrontmatter, InsightSummary } from "@/lib/insights"
import { normalizeInsightFrontmatterSource } from "@/lib/utils"

export type InsightDetail = InsightSummary & {
  content: React.ReactElement
}

const INSIGHTS_DIR = path.join(process.cwd(), "content/insights")
const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH ?? "develop"
const GITHUB_TOKEN = process.env.GITHUB_TOKEN

function normalizeCoverImage(src: string) {
  if (src.startsWith("/uploads/") && GITHUB_REPO) {
    return `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/public${src}`
  }
  return src
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

export async function getInsightBySlug(slug: string): Promise<InsightDetail> {
  noStore()

  let source = ""

  if (GITHUB_REPO) {
    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/contents/content/insights/${slug}.mdx?ref=${encodeURIComponent(GITHUB_BRANCH)}`,
      {
        headers: githubHeaders(),
        cache: "no-store",
      },
    )

    if (!response.ok) {
      throw new Error(`Insight not found: ${slug}`)
    }

    const file = (await response.json()) as { content?: string; encoding?: string }
    if (!file.content || file.encoding !== "base64") {
      throw new Error(`Invalid insight source: ${slug}`)
    }

    source = Buffer.from(file.content, "base64").toString("utf8")
  } else {
    const filePath = path.join(INSIGHTS_DIR, `${slug}.mdx`)
    if (!fs.existsSync(filePath)) {
      throw new Error(`Insight not found: ${slug}`)
    }
    source = await fs.promises.readFile(filePath, "utf8")
  }
  
  source = normalizeInsightFrontmatterSource(source)
  const { content, frontmatter } = await compileMDX<InsightFrontmatter>({
    source,
    options: {
      parseFrontmatter: true,
    },
  })

  if (frontmatter.enabled === false) {
    throw new Error(`Insight not found: ${slug}`)
  }

  return {
    slug,
    content,
    ...frontmatter,
    coverImage: normalizeCoverImage(String(frontmatter.coverImage || "")),
  }
}
