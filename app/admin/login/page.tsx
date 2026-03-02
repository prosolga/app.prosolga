import { redirect } from "next/navigation"
import { isAdminAuthenticated } from "@/lib/admin-auth"

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string
  }>
}

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  if (await isAdminAuthenticated()) {
    redirect("/admin")
  }

  const params = await searchParams

  return (
    <main className="mx-auto flex min-h-[70vh] max-w-md items-center px-4">
      <section className="w-full rounded-xl border bg-white p-6">
        <h1 className="mb-2 text-2xl font-bold text-primary">Admin Login</h1>
        <p className="mb-5 text-sm text-muted-foreground">Sign in to publish Insights.</p>
        {params.error ? (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-900">
            Invalid username or password.
          </div>
        ) : null}
        <form action="/api/admin/login" className="space-y-4" method="post">
          <div>
            <label className="mb-1 block text-sm font-medium">Username</label>
            <input className="w-full rounded-md border px-3 py-2 text-sm" name="username" required />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Password</label>
            <input className="w-full rounded-md border px-3 py-2 text-sm" name="password" required type="password" />
          </div>
          <button className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-90" type="submit">
            Sign In
          </button>
        </form>
      </section>
    </main>
  )
}

