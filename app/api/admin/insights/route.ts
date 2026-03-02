import { NextRequest, NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-session"
import { deleteRepoFile, getRepoFileIfExists, listRepoFolder, parseInsightFrontmatter, putRepoFile } from "@/lib/admin-github"

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

  try {
    const files = (await listRepoFolder("content/insights")) as Array<{
      type: string
      name: string
      download_url?: string
      path: string
    }>

    const insights = await Promise.all(
      files
        .filter((file) => file.type === "file" && file.name.endsWith(".mdx") && file.download_url)
        .map(async (file) => {
          const source = await fetch(file.download_url!, { cache: "no-store" }).then((res) => res.text())
          const data = parseInsightFrontmatter(source)
          return {
            slug: file.name.replace(/\.mdx$/, ""),
            ...data,
          }
        }),
    )

    insights.sort((a, b) => (a.date < b.date ? 1 : -1))
    return NextResponse.json({ insights })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load insights", message: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  if (!ensureAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
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

    const insightPath = `content/insights/${slug}.mdx`
    const existing = await getRepoFileIfExists(insightPath)
    if (existing) {
      return NextResponse.json({ error: "Slug already exists" }, { status: 409 })
    }

    const ext = (() => {
      const name = coverImageFile.name || ""
      const index = name.lastIndexOf(".")
      return index >= 0 ? name.slice(index).toLowerCase() : ""
    })()
    const allowedExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"])
    if (!allowedExt.has(ext)) {
      return NextResponse.json({ error: "Invalid image format" }, { status: 400 })
    }

    const coverFileName = `${Date.now()}-${slug}${ext}`
    const imagePath = `public/insight/${coverFileName}`
    const coverBuffer = Buffer.from(await coverImageFile.arrayBuffer()).toString("base64")
    await putRepoFile(imagePath, coverBuffer, `Upload ${imagePath} via Admin`)

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

    await putRepoFile(insightPath, Buffer.from(mdx, "utf8").toString("base64"), `Create ${insightPath} via Admin`)

    return NextResponse.json({ ok: true, slug })
  } catch (error) {
    return NextResponse.json(
      { error: "Could not publish insight", message: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

export async function DELETE(request: NextRequest) {
  if (!ensureAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const slug = request.nextUrl.searchParams.get("slug") || ""
    if (!slug || !isValidSlug(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
    }

    const insightPath = `content/insights/${slug}.mdx`
    const insightFile = await getRepoFileIfExists(insightPath)
    if (!insightFile) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const source = Buffer.from(insightFile.content || "", "base64").toString("utf8")
    const coverImage = parseInsightFrontmatter(source).coverImage

    await deleteRepoFile(insightPath, insightFile.sha, `Delete ${insightPath} via Admin`)

    if (coverImage.startsWith("/insight/")) {
      const imagePath = `public/${coverImage.replace(/^\//, "")}`
      const imageFile = await getRepoFileIfExists(imagePath)
      if (imageFile) {
        await deleteRepoFile(imagePath, imageFile.sha, `Delete ${imagePath} via Admin`)
      }
    }

    return NextResponse.json({ ok: true, slug })
  } catch (error) {
    return NextResponse.json(
      { error: "Could not delete insight", message: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
