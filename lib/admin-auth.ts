import { cookies } from "next/headers"
import { ADMIN_SESSION_COOKIE, verifyAdminSessionToken } from "@/lib/admin-session"

export async function isAdminAuthenticated() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value
    if (!token) return false
    return verifyAdminSessionToken(token) !== null
  } catch {
    return false
  }
}
