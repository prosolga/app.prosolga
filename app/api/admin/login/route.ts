import { NextRequest, NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE, createAdminSessionToken, validateAdminCredentials } from "@/lib/admin-auth"

export async function POST(request: NextRequest) {
  const formData = await request.formData()
  const username = String(formData.get("username") || "")
  const password = String(formData.get("password") || "")

  if (!validateAdminCredentials(username, password)) {
    return NextResponse.redirect(new URL("/admin/login?error=invalid", request.url))
  }

  const response = NextResponse.redirect(new URL("/admin", request.url))
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: createAdminSessionToken(username),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  })
  return response
}

