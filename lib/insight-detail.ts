import type React from "react"
import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"
import type { InsightFrontmatter, InsightSummary } from "@/lib/insights"

export type InsightDetail = InsightSummary & {
  content: React.ReactElement
}

const INSIGHTS_DIR = path.join(process.cwd(), "content/insights")

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

