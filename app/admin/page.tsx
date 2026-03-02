"use client"

import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DeleteInsightButton } from "./delete-insight-button"
import { ToggleInsightButton } from "./toggle-insight-button"

const IMAGE_OPTIONS = [
  "/blog.jpg",
  "/busi.jpg",
  "/citizen.jpg",
  "/dubai.jpg",
  "/estate.jpg",
  "/global.jpg",
  "/map.jpg",
  "/finance-growth.png",
  "/diverse-businessman.png",
  "/singapore-marina-bay-sands.png",
  "/collated/mediterranean.png",
  "/collated/london.png",
  "/collated/about.png",
  "/logo/gip.png",
  "/logo/sa.png",
]

type InsightSummary = {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  coverImage: string
  enabled?: boolean
}

type InsightFormState = {
  title: string
  date: string
  category: string
  excerpt: string
  content: string
  slug: string
  coverImage: string
  enabled: boolean
}

const INITIAL_FORM: InsightFormState = {
  title: "",
  date: "",
  category: "",
  excerpt: "",
  content: "",
  slug: "",
  coverImage: IMAGE_OPTIONS[0],
  enabled: true,
}

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [insights, setInsights] = useState<InsightSummary[]>([])
  const [form, setForm] = useState<InsightFormState>(INITIAL_FORM)
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const imageOptions = IMAGE_OPTIONS.includes(form.coverImage) ? IMAGE_OPTIONS : [form.coverImage, ...IMAGE_OPTIONS]

  async function loadInsights() {
    const sessionRes = await fetch("/api/admin/session", { cache: "no-store" })
    if (!sessionRes.ok) {
      router.replace("/admin/login")
      return
    }

    const insightsRes = await fetch("/api/admin/insights", { cache: "no-store" })
    if (!insightsRes.ok) {
      const payload = await insightsRes.json().catch(() => ({}))
      const message = payload?.message ? `${payload.error || "Could not load insights"}: ${payload.message}` : payload?.error
      setError(message || "Could not load insights.")
      setLoading(false)
      return
    }

    const data = await insightsRes.json()
    setInsights(data.insights || [])
    setLoading(false)
  }

  useEffect(() => {
    loadInsights()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSuccess("")
    setSubmitting(true)

    const formData = new FormData()
    formData.set("title", form.title)
    formData.set("date", form.date)
    formData.set("category", form.category)
    formData.set("excerpt", form.excerpt)
    formData.set("content", form.content)
    formData.set("coverImage", form.coverImage)
    formData.set("enabled", String(form.enabled))
    if (form.slug.trim()) formData.set("nextSlug", form.slug.trim())

    const response = editingSlug
      ? await fetch("/api/admin/insights", {
          method: "PUT",
          body: (() => {
            formData.set("currentSlug", editingSlug)
            return formData
          })(),
        })
      : await fetch("/api/admin/insights", {
          method: "POST",
          body: (() => {
            if (form.slug.trim()) formData.set("slug", form.slug.trim())
            return formData
          })(),
        })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      const message = payload?.message ? `${payload.error || "Request failed"}: ${payload.message}` : payload?.error
      setError(message || "Request failed.")
      setSubmitting(false)
      return
    }

    setSuccess(editingSlug ? `Updated successfully: ${payload.slug}` : `Published successfully: ${payload.slug}`)
    setForm(INITIAL_FORM)
    setEditingSlug(null)
    await loadInsights()
    setSubmitting(false)
  }

  async function handleEdit(slug: string) {
    setError("")
    setSuccess("")
    const response = await fetch(`/api/admin/insights?slug=${encodeURIComponent(slug)}`, { cache: "no-store" })
    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      const message = payload?.message ? `${payload.error || "Could not load insight"}: ${payload.message}` : payload?.error
      setError(message || "Could not load insight.")
      return
    }

    const item = payload.insight
    setForm({
      title: item.title || "",
      date: item.date || "",
      category: item.category || "",
      excerpt: item.excerpt || "",
      content: item.content || "",
      slug: item.slug || "",
      coverImage: item.coverImage || IMAGE_OPTIONS[0],
      enabled: item.enabled !== false,
    })
    setEditingSlug(item.slug)
  }

  async function handleToggle(slug: string, enabled: boolean) {
    setError("")
    setSuccess("")
    const response = await fetch("/api/admin/insights", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ slug, enabled }),
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      const message = payload?.message ? `${payload.error || "Could not update insight"}: ${payload.message}` : payload?.error
      setError(message || "Could not update insight.")
      return
    }

    setSuccess(`${enabled ? "Enabled" : "Disabled"}: ${payload.slug}`)
    await loadInsights()
  }

  async function handleDelete(slug: string) {
    setError("")
    setSuccess("")
    const response = await fetch(`/api/admin/insights?slug=${encodeURIComponent(slug)}`, {
      method: "DELETE",
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      const message = payload?.message ? `${payload.error || "Could not delete insight"}: ${payload.message}` : payload?.error
      setError(message || "Could not delete insight.")
      return
    }

    if (editingSlug === slug) {
      setForm(INITIAL_FORM)
      setEditingSlug(null)
    }
    setSuccess(`Deleted successfully: ${payload.slug}`)
    await loadInsights()
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.replace("/admin/login")
  }

  function resetForm() {
    setForm(INITIAL_FORM)
    setEditingSlug(null)
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-6xl px-4 py-10">
        <p className="text-sm text-muted-foreground">Loading admin...</p>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Insights Admin</h1>
          <p className="text-sm text-muted-foreground">Create, edit, enable/disable, and delete insights.</p>
        </div>
        <button className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-muted" onClick={handleLogout} type="button">
          Logout
        </button>
      </div>

      {success ? (
        <div className="mb-4 rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-900">{success}</div>
      ) : null}
      {error ? <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">{error}</div> : null}

      <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form className="space-y-4 rounded-xl border bg-white p-5" onSubmit={handleSubmit}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">{editingSlug ? `Edit Insight (${editingSlug})` : "New Insight"}</h2>
            {editingSlug ? (
              <button className="rounded-md border px-3 py-1 text-xs font-medium hover:bg-muted" onClick={resetForm} type="button">
                Cancel Edit
              </button>
            ) : null}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Title</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              name="title"
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="International Tax Structuring in 2026"
              required
              value={form.title}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-medium">Date</label>
              <input
                className="w-full rounded-md border px-3 py-2 text-sm"
                name="date"
                onChange={(e) => setForm((prev) => ({ ...prev, date: e.target.value }))}
                required
                type="date"
                value={form.date}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Category</label>
              <input
                className="w-full rounded-md border px-3 py-2 text-sm"
                name="category"
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                placeholder="Citizenship"
                required
                value={form.category}
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Excerpt</label>
            <textarea
              className="min-h-24 w-full rounded-md border px-3 py-2 text-sm"
              name="excerpt"
              onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
              required
              value={form.excerpt}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Cover Image (15 active URLs)</label>
            <select
              className="w-full rounded-md border px-3 py-2 text-sm"
              onChange={(e) => setForm((prev) => ({ ...prev, coverImage: e.target.value }))}
              required
              value={form.coverImage}
            >
              {imageOptions.map((url) => (
                <option key={url} value={url}>
                  {url}
                </option>
              ))}
            </select>
            <div className="mt-3 overflow-hidden rounded-md border">
              <img alt="Selected insight cover" className="h-44 w-full object-cover" src={form.coverImage} />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Slug ({editingSlug ? "editable" : "optional"})</label>
            <input
              className="w-full rounded-md border px-3 py-2 text-sm"
              name="slug"
              onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="auto-from-title"
              value={form.slug}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              checked={form.enabled}
              id="enabled"
              onChange={(e) => setForm((prev) => ({ ...prev, enabled: e.target.checked }))}
              type="checkbox"
            />
            <label className="text-sm font-medium" htmlFor="enabled">
              Enabled (visible on public Insights pages)
            </label>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Body (Markdown/MDX)</label>
            <textarea
              className="min-h-64 w-full rounded-md border px-3 py-2 text-sm"
              name="content"
              onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
              required
              value={form.content}
            />
          </div>

          <button
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Saving..." : editingSlug ? "Update Insight" : "Publish Insight"}
          </button>
        </form>

        <section className="rounded-xl border bg-white p-5">
          <h2 className="mb-3 text-xl font-semibold">Existing Insights ({insights.length})</h2>
          <div className="space-y-3">
            {insights.map((item) => (
              <div className="rounded-md border p-3" key={item.slug}>
                <div className="flex items-start gap-3">
                  <img
                    alt={item.title}
                    className="h-16 w-20 rounded object-cover"
                    src={item.coverImage || "/placeholder.svg"}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.date} | {item.category} | /insights/{item.slug}
                    </p>
                    <p className={`mt-1 text-xs font-medium ${item.enabled === false ? "text-amber-700" : "text-green-700"}`}>
                      {item.enabled === false ? "Disabled" : "Enabled"}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <button
                        className="rounded-md border px-3 py-1 text-xs font-medium hover:bg-muted"
                        onClick={() => handleEdit(item.slug)}
                        type="button"
                      >
                        Edit
                      </button>
                      <ToggleInsightButton
                        enabled={item.enabled !== false}
                        onToggle={handleToggle}
                        slug={item.slug}
                        title={item.title}
                      />
                      <DeleteInsightButton onDelete={handleDelete} slug={item.slug} title={item.title} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}
