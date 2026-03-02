import crypto from "crypto"
import { cookies } from "next/headers"

export const ADMIN_SESSION_COOKIE = "prosolga_admin_session"
const SESSION_TTL_SECONDS = 60 * 60 * 12

type SessionPayload = {
  u: string
  exp: number
}

function base64UrlEncode(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "")
}

function base64UrlDecode(input: string) {
  const normalized = input.replace(/-/g, "+").replace(/_/g, "/")
  const pad = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4))
  return Buffer.from(normalized + pad, "base64")
}

function sign(value: string, secret: string) {
  return base64UrlEncode(crypto.createHmac("sha256", secret).update(value).digest())
}

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a)
  const bBuf = Buffer.from(b)
  if (aBuf.length !== bBuf.length) return false
  return crypto.timingSafeEqual(aBuf, bBuf)
}

function getAuthConfig() {
  const username = process.env.ADMIN_USERNAME
  const password = process.env.ADMIN_PASSWORD
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!username || !password || !secret) {
    throw new Error("Missing ADMIN_USERNAME, ADMIN_PASSWORD, or ADMIN_SESSION_SECRET")
  }

  return { username, password, secret }
}

export function validateAdminCredentials(username: string, password: string) {
  const config = getAuthConfig()
  return safeEqual(username, config.username) && safeEqual(password, config.password)
}

export function createAdminSessionToken(username: string) {
  const { secret } = getAuthConfig()
  const payload: SessionPayload = {
    u: username,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  }
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload))
  const signature = sign(payloadEncoded, secret)
  return `${payloadEncoded}.${signature}`
}

export function verifyAdminSessionToken(token: string): SessionPayload | null {
  const { secret } = getAuthConfig()
  const [payloadEncoded, signature] = token.split(".")
  if (!payloadEncoded || !signature) return null

  const expected = sign(payloadEncoded, secret)
  if (!safeEqual(signature, expected)) return null

  try {
    const payload = JSON.parse(base64UrlDecode(payloadEncoded).toString("utf8")) as SessionPayload
    if (!payload?.u || !payload.exp) return null
    if (payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

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

