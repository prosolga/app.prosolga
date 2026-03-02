import fs from "fs"
import path from "path"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import matter from "gray-matter"
import { getAllInsights } from "@/lib/insights"
import { isAdminAuthenticated } from "@/lib/admin-auth"
import { DeleteInsightButton } from "./delete-insight-button"

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

async function createInsight(formData: FormData) {
  "use server"

  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  const title = String(formData.get("title") || "").trim()
  const date = String(formData.get("date") || "").trim()
  const category = String(formData.get("category") || "").trim()
  const excerpt = String(formData.get("excerpt") || "").trim()
  const content = String(formData.get("content") || "").trim()
  const manualSlug = String(formData.get("slug") || "").trim()
  const coverImageFile = formData.get("coverImageFile")

  if (!title || !date || !category || !excerpt || !content) {
    redirect("/admin?error=missing-fields")
  }

  if (!(coverImageFile instanceof File) || coverImageFile.size <= 0) {
    redirect("/admin?error=missing-fields")
  }

  const slug = toSlug(manualSlug || title)
  if (!slug || !isValidSlug(slug)) {
    redirect("/admin?error=invalid-slug")
  }

  const outputPath = path.join(process.cwd(), "content", "insights", `${slug}.mdx`)
  if (fs.existsSync(outputPath)) {
    redirect("/admin?error=slug-exists")
  }

  const uploadDir = path.join(process.cwd(), "public", "insight")
  await fs.promises.mkdir(uploadDir, { recursive: true })

  const ext = path.extname(coverImageFile.name || "").toLowerCase()
  const allowedExt = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"])
  if (!allowedExt.has(ext)) {
    redirect("/admin?error=invalid-image")
  }

  const coverFileName = `${Date.now()}-${slug}${ext}`
  const coverFilePath = path.join(uploadDir, coverFileName)
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
  redirect(`/admin?created=${slug}`)
}

async function deleteInsight(formData: FormData) {
  "use server"

  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  const slug = String(formData.get("slug") || "").trim()
  if (!slug || !isValidSlug(slug)) {
    redirect("/admin?error=invalid-slug")
  }

  const outputPath = path.join(process.cwd(), "content", "insights", `${slug}.mdx`)
  if (!fs.existsSync(outputPath)) {
    redirect("/admin?error=not-found")
  }

  const source = await fs.promises.readFile(outputPath, "utf8")
  const parsed = matter(source)
  const coverImage = String(parsed.data?.coverImage || "")

  await fs.promises.unlink(outputPath)
  if (coverImage.startsWith("/insight/")) {
    const imagePath = path.join(process.cwd(), "public", coverImage.replace(/^\//, ""))
    if (fs.existsSync(imagePath)) {
      await fs.promises.unlink(imagePath)
    }
  }

  revalidatePath("/")
  revalidatePath("/insights")
  revalidatePath(`/insights/${slug}`)
  redirect(`/admin?deleted=${slug}`)
}

type AdminPageProps = {
  searchParams: Promise<{
    created?: string
    deleted?: string
    error?: string
  }>
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login")
  }

  const insights = await getAllInsights()
  const params = await searchParams

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Insights Admin</h1>
          <p className="text-sm text-muted-foreground">Create and publish insight posts directly to the project.</p>
        </div>
        <form action="/api/admin/logout" method="post">
          <button className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted" type="submit">
            Logout
          </button>
        </form>
      </div>

      {params.created ? (
        <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
          Published successfully: <strong>{params.created}</strong>
        </div>
      ) : null}
      {params.deleted ? (
        <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">
          Deleted successfully: <strong>{params.deleted}</strong>
        </div>
      ) : null}
      {params.error ? (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          Request failed ({params.error}).
        </div>
      ) : null}

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form action={createInsight} className="space-y-4 rounded-xl border bg-white p-5" encType="multipart/form-data">
          <h2 className="text-xl font-semibold">New Insight</h2>
          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              name="title"
              placeholder="International Tax Structuring in 2026"
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Date</label>
              <input className="w-full rounded-md border px-3 py-2 text-sm" name="date" type="date" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Category</label>
              <input
                className="w-full rounded-md border px-3 py-2 text-sm"
                name="category"
                placeholder="Citizenship"
                required
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Excerpt</label>
            <textarea className="min-h-24 w-full rounded-md border px-3 py-2 text-sm" name="excerpt" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Cover Image Upload</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
              name="coverImageFile"
              required
              type="file"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Slug (optional)</label>
            <input className="w-full rounded-md border px-3 py-2 text-sm" name="slug" placeholder="auto-from-title" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Body (Markdown/MDX)</label>
            <textarea className="min-h-64 w-full rounded-md border px-3 py-2 text-sm" name="content" required />
          </div>
          <button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90" type="submit">
            Publish Insight
          </button>
        </form>

        <section className="rounded-xl border bg-white p-5">
          <h2 className="mb-3 text-xl font-semibold">Existing Insights ({insights.length})</h2>
          <div className="space-y-3">
            {insights.map((item) => (
              <div className="rounded-md border p-3" key={item.slug}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.date} | {item.category} | /insights/{item.slug}
                    </p>
                  </div>
                  <DeleteInsightButton deleteAction={deleteInsight} slug={item.slug} title={item.title} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
