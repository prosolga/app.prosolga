import { NextRequest, NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-session"
import { deleteRepoFile, getRepoFileIfExists, listRepoFolder, parseInsightFrontmatter, putRepoFile } from "@/lib/admin-github"
import { revalidatePath } from 'next/cache';

const GITHUB_REPO = process.env.GITHUB_REPO
const GITHUB_BRANCH = process.env.GITHUB_BRANCH ?? "main"

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

function normalizeCoverImage(src: string) {
  if (src.startsWith("/uploads/") && GITHUB_REPO) {
    return `https://raw.githubusercontent.com/${GITHUB_REPO}/${GITHUB_BRANCH}/public${src}`
  }
  return src
}

function buildMdx(frontmatter: {
  title: string
  date: string
  category: string
  excerpt: string
  coverImage: string
  enabled: boolean
}, body: string) {
  return `---
title: "${yamlSafe(frontmatter.title)}"
date: "${frontmatter.date}"
category: "${yamlSafe(frontmatter.category)}"
excerpt: "${yamlSafe(frontmatter.excerpt)}"
coverImage: "${yamlSafe(frontmatter.coverImage)}"
enabled: ${frontmatter.enabled ? "true" : "false"}
---

${body}
`
}

function parseBodyFromMdx(source: string) {
  const fm = source.match(/^---\n[\s\S]*?\n---\n?/)
  if (!fm) return source
  return source.slice(fm[0].length).trimStart()
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
    const slug = request.nextUrl.searchParams.get("slug")
    if (slug) {
      if (!isValidSlug(slug)) {
        return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
      }

      const insightPath = `content/insights/${slug}.mdx`
      const insightFile = await getRepoFileIfExists(insightPath)
      if (!insightFile) {
        return NextResponse.json({ error: "Not found" }, { status: 404 })
      }

      const source = Buffer.from(insightFile.content || "", "base64").toString("utf8")
      const meta = parseInsightFrontmatter(source)
      const content = parseBodyFromMdx(source)
      return NextResponse.json({
        insight: {
          slug,
          ...meta,
          coverImage: meta.coverImage || "",
          content,
        },
      })
    }

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
            coverImage: normalizeCoverImage(data.coverImage || ""),
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
    const coverImage = String(formData.get("coverImage") || "").trim()
    const enabled = String(formData.get("enabled") || "true").trim() !== "false"

    if (!title || !date || !category || !excerpt || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }
    if (!coverImage) {
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

    const mdx = buildMdx(
      {
        title,
        date,
        category,
        excerpt,
        coverImage,
        enabled,
      },
      content,
    )

    await putRepoFile(insightPath, Buffer.from(mdx, "utf8").toString("base64"), `Create ${insightPath} via Admin`)

    // ==================== REVALIDATION ====================
    revalidatePath('/insights')
    revalidatePath(`/insights/${slug}`)
    revalidatePath('/')
    // ======================================================

    return NextResponse.json({ ok: true, slug })
  } catch (error) {
    return NextResponse.json(
      { error: "Could not publish insight", message: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  if (!ensureAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const currentSlug = String(formData.get("currentSlug") || "").trim()
    const title = String(formData.get("title") || "").trim()
    const date = String(formData.get("date") || "").trim()
    const category = String(formData.get("category") || "").trim()
    const excerpt = String(formData.get("excerpt") || "").trim()
    const content = String(formData.get("content") || "").trim()
    const nextSlugInput = String(formData.get("nextSlug") || "").trim()
    const coverImage = String(formData.get("coverImage") || "").trim()
    const enabled = String(formData.get("enabled") || "true").trim() !== "false"

    if (!currentSlug || !isValidSlug(currentSlug)) {
      return NextResponse.json({ error: "Invalid current slug" }, { status: 400 })
    }
    if (!title || !date || !category || !excerpt || !content || !coverImage) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const nextSlug = toSlug(nextSlugInput || currentSlug)
    if (!nextSlug || !isValidSlug(nextSlug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
    }

    const currentPath = `content/insights/${currentSlug}.mdx`
    const currentFile = await getRepoFileIfExists(currentPath)
    if (!currentFile) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const nextPath = `content/insights/${nextSlug}.mdx`
    if (nextSlug !== currentSlug) {
      const existing = await getRepoFileIfExists(nextPath)
      if (existing) {
        return NextResponse.json({ error: "Target slug already exists" }, { status: 409 })
      }
    }

    const mdx = buildMdx(
      {
        title,
        date,
        category,
        excerpt,
        coverImage,
        enabled,
      },
      content,
    )

    if (nextSlug === currentSlug) {
      await putRepoFile(nextPath, Buffer.from(mdx, "utf8").toString("base64"), `Update ${nextPath} via Admin`, currentFile.sha)
    } else {
      await putRepoFile(nextPath, Buffer.from(mdx, "utf8").toString("base64"), `Rename ${currentPath} to ${nextPath} via Admin`)
      await deleteRepoFile(currentPath, currentFile.sha, `Delete ${currentPath} via Admin`)
    }

    // ==================== REVALIDATION ====================
    revalidatePath('/insights')
    revalidatePath(`/insights/${nextSlug}`)
    if (nextSlug !== currentSlug) {
      revalidatePath(`/insights/${currentSlug}`) // optional: clean old slug
    }
    revalidatePath('/')
    // ======================================================

    return NextResponse.json({ ok: true, slug: nextSlug })
  } catch (error) {
    return NextResponse.json(
      { error: "Could not update insight", message: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
export async function PUT(request: NextRequest) {
  if (!ensureAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const currentSlug = String(formData.get("currentSlug") || "").trim()
    const title = String(formData.get("title") || "").trim()
    const date = String(formData.get("date") || "").trim()
    const category = String(formData.get("category") || "").trim()
    const excerpt = String(formData.get("excerpt") || "").trim()
    const content = String(formData.get("content") || "").trim()
    const nextSlugInput = String(formData.get("nextSlug") || "").trim()
    const coverImage = String(formData.get("coverImage") || "").trim()
    const enabled = String(formData.get("enabled") || "true").trim() !== "false"

    if (!currentSlug || !isValidSlug(currentSlug)) {
      return NextResponse.json({ error: "Invalid current slug" }, { status: 400 })
    }
    if (!title || !date || !category || !excerpt || !content || !coverImage) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const nextSlug = toSlug(nextSlugInput || currentSlug)
    if (!nextSlug || !isValidSlug(nextSlug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
    }

    const currentPath = `content/insights/${currentSlug}.mdx`
    const currentFile = await getRepoFileIfExists(currentPath)
    if (!currentFile) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const nextPath = `content/insights/${nextSlug}.mdx`
    if (nextSlug !== currentSlug) {
      const existing = await getRepoFileIfExists(nextPath)
      if (existing) {
        return NextResponse.json({ error: "Target slug already exists" }, { status: 409 })
      }
    }

    const mdx = buildMdx(
      {
        title,
        date,
        category,
        excerpt,
        coverImage,
        enabled,
      },
      content,
    )

    if (nextSlug === currentSlug) {
      await putRepoFile(nextPath, Buffer.from(mdx, "utf8").toString("base64"), `Update ${nextPath} via Admin`, currentFile.sha)
    } else {
      await putRepoFile(nextPath, Buffer.from(mdx, "utf8").toString("base64"), `Rename ${currentPath} to ${nextPath} via Admin`)
      await deleteRepoFile(currentPath, currentFile.sha, `Delete ${currentPath} via Admin`)
    }

    return NextResponse.json({ ok: true, slug: nextSlug })
  } catch (error) {
    return NextResponse.json(
      { error: "Could not update insight", message: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  if (!ensureAuth(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()
    const slug = String(body?.slug || "")
    const enabled = Boolean(body?.enabled)

    if (!slug || !isValidSlug(slug)) {
      return NextResponse.json({ error: "Invalid slug" }, { status: 400 })
    }

    const insightPath = `content/insights/${slug}.mdx`
    const insightFile = await getRepoFileIfExists(insightPath)
    if (!insightFile) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const source = Buffer.from(insightFile.content || "", "base64").toString("utf8")
    const meta = parseInsightFrontmatter(source)
    const content = parseBodyFromMdx(source)
    const mdx = buildMdx(
      {
        title: meta.title || "",
        date: meta.date || "",
        category: meta.category || "",
        excerpt: meta.excerpt || "",
        coverImage: meta.coverImage || "",
        enabled,
      },
      content,
    )

    await putRepoFile(insightPath, Buffer.from(mdx, "utf8").toString("base64"), `Toggle ${insightPath} via Admin`, insightFile.sha)
  // ← ADD REVALIDATION HERE
    revalidatePath('/insights')
    revalidatePath(`/insights/${slug}`)
    revalidatePath('/')
    return NextResponse.json({ ok: true, slug, enabled })
  } catch (error) {
    return NextResponse.json(
      { error: "Could not toggle insight", message: error instanceof Error ? error.message : String(error) },
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

    if (coverImage.startsWith("/uploads/")) {
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
