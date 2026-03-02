import { NextRequest, NextResponse } from "next/server"
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-auth"

export async function GET(request: NextRequest) {
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value
  const session = token ? verifyAdminSessionToken(token) : null

  if (!session) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  return NextResponse.json({ authenticated: true, username: session.u })
}

