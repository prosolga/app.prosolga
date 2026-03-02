"use client"

import { FormEvent, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DeleteInsightButton } from "./delete-insight-button"

type InsightSummary = {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  coverImage: string
}

export default function AdminPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [insights, setInsights] = useState<InsightSummary[]>([])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  async function loadInsights() {
    const sessionRes = await fetch("/api/admin/session", { cache: "no-store" })
    if (!sessionRes.ok) {
      router.replace("/admin/login")
      return
    }

    const insightsRes = await fetch("/api/admin/insights", { cache: "no-store" })
    if (!insightsRes.ok) {
      setError("Could not load insights.")
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

  async function handleCreate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSuccess("")
    setSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const response = await fetch("/api/admin/insights", {
      method: "POST",
      body: formData,
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      setError(payload.error || "Could not publish insight.")
      setSubmitting(false)
      return
    }

    setSuccess(`Published successfully: ${payload.slug}`)
    ;(event.currentTarget as HTMLFormElement).reset()
    await loadInsights()
    setSubmitting(false)
  }

  async function handleDelete(slug: string) {
    setError("")
    setSuccess("")
    const response = await fetch(`/api/admin/insights/${slug}`, {
      method: "DELETE",
    })

    const payload = await response.json().catch(() => ({}))
    if (!response.ok) {
      setError(payload.error || "Could not delete insight.")
      return
    }

    setSuccess(`Deleted successfully: ${payload.slug}`)
    await loadInsights()
  }

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" })
    router.replace("/admin/login")
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
          <p className="text-sm text-muted-foreground">Create and publish insight posts directly to the project.</p>
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
        <form className="space-y-4 rounded-xl border bg-white p-5" encType="multipart/form-data" onSubmit={handleCreate}>
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
              <input className="w-full rounded-md border px-3 py-2 text-sm" name="date" required type="date" />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">Category</label>
              <input className="w-full rounded-md border px-3 py-2 text-sm" name="category" placeholder="Citizenship" required />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Excerpt</label>
            <textarea className="min-h-24 w-full rounded-md border px-3 py-2 text-sm" name="excerpt" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Cover Image Upload</label>
            <input
              accept="image/png,image/jpeg,image/jpg,image/webp,image/gif"
              className="w-full rounded-md border px-3 py-2 text-sm"
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
          <button
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={submitting}
            type="submit"
          >
            {submitting ? "Publishing..." : "Publish Insight"}
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
                  <DeleteInsightButton onDelete={handleDelete} slug={item.slug} title={item.title} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

