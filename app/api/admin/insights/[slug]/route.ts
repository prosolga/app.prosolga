import fs from "fs"
import path from "path"
import { NextRequest, NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-session"

const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights")

function isValidSlug(input: string) {
  return /^[a-z0-9-]+$/.test(input)
}

function ensureAuth(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  return token ? verifyAdminSessionToken(token) : null
}

function getCoverImageFromFrontmatter(source: string) {
  const frontmatterMatch = source.match(/^---\n([\s\S]*?)\n---/)
  if (!frontmatterMatch) return ""
  const coverImageMatch = frontmatterMatch[1].match(/^coverImage:\s*"([^"]+)"/m)
  return coverImageMatch?.[1] || ""
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  if (!ensureAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { slug } = await params
  if (!slug || !isValidSlug(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
  }

  const outputPath = path.join(INSIGHTS_DIR, `${slug}.mdx`)
  if (!fs.existsSync(outputPath)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 })
  }

  const source = await fs.promises.readFile(outputPath, "utf8")
  const coverImage = getCoverImageFromFrontmatter(source)

  await fs.promises.unlink(outputPath)

  if (coverImage.startsWith("/insight/")) {
    const imagePath = path.join(process.cwd(), "public", coverImage.replace(/^\//, ""))
    if (fs.existsSync(imagePath)) {
      await fs.promises.unlink(imagePath)
    }
  }

  return NextResponse.json({ ok: true, slug })
}
