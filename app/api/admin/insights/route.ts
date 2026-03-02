import fs from "fs"
import path from "path"
import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth"
import { getAllInsights } from "@/lib/insights"

const INSIGHTS_DIR = path.join(process.cwd(), "content", "insights")
const INSIGHT_UPLOAD_DIR = path.join(process.cwd(), "public", "insight")

function toSlug(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

function yamlSafe(input: string) {
  return input.replace(/"/g, '\\"')
}

function isValidSlug(input: string) {
  return /^[a-z0-9-]+$/.test(input)
}

function ensureAuth(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  return token ? verifyAdminSessionToken(token) : null
}

export async function GET(request: NextRequest) {
  if (!ensureAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const insights = await getAllInsights()
  return NextResponse.json({ insights })
}

export async function POST(request: NextRequest) {
  if (!ensureAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const title = String(formData.get("title") || "").trim()
  const date = String(formData.get("date") || "").trim()
  const category = String(formData.get("category") || "").trim()
  const excerpt = String(formData.get("excerpt") || "").trim()
  const content = String(formData.get("content") || "").trim()
  const manualSlug = String(formData.get("slug") || "").trim()
  const coverImageFile = formData.get("coverImageFile")

  if (!title || !date || !category || !excerpt || !content) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  if (!(coverImageFile instanceof File) || coverImageFile.size <= 0) {
    return NextResponse.json({ error: "Cover image is required" }, { status: 400 })
  }

  const slug = toSlug(manualSlug || title)
  if (!slug || !isValidSlug(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
  }

  const outputPath = path.join(INSIGHTS_DIR, `${slug}.mdx`)
  if (fs.existsSync(outputPath)) {
    return NextResponse.json({ error: "Slug already exists" }, { status: 409 })
  }

  await fs.promises.mkdir(INSIGHT_UPLOAD_DIR, { recursive: true })

  const ext = path.extname(coverImageFile.name || "").toLowerCase()
  const allowedExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"])
  if (!allowedExt.has(ext)) {
    return NextResponse.json({ error: "Invalid image format" }, { status: 400 })
  }

  const coverFileName = `${Date.now()}-${slug}${ext}`
  const coverFilePath = path.join(INSIGHT_UPLOAD_DIR, coverFileName)
  const coverBuffer = Buffer.from(await coverImageFile.arrayBuffer())
  await fs.promises.writeFile(coverFilePath, coverBuffer)

  const coverImage = `/insight/${coverFileName}`
  const mdx = `---
title: "${yamlSafe(title)}"
date: "${date}"
category: "${yamlSafe(category)}"
excerpt: "${yamlSafe(excerpt)}"
coverImage: "${yamlSafe(coverImage)}"
---

${content}
`

  await fs.promises.writeFile(outputPath, mdx, "utf8")

  revalidatePath("/")
  revalidatePath("/insights")
  revalidatePath(`/insights/${slug}`)

  return NextResponse.json({ ok: true, slug })
}

