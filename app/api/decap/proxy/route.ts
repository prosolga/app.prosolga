import { NextRequest, NextResponse } from "next/server"

const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const CMS_SHARED_SECRET = process.env.CMS_SHARED_SECRET
const REPO_FULL_NAME = process.env.GITHUB_REPO ?? "00Photon/Prosolutions-Global-Advisory-website"

type DecapProxyRequest = {
  action: string
  collection?: string
  slug?: string
  entry?: {
    path?: string
    raw?: string
    file?: { path: string }
    collection?: string
    slug?: string
  }
  folder?: string
  files?: { path: string }[]
  path?: string
  field?: string
  id?: string
  fileData?: string
  fileName?: string
}

function githubHeaders() {
  if (!GITHUB_TOKEN) {
    throw new Error("Missing GITHUB_TOKEN")
  }
  return {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    "Content-Type": "application/json",
  }
}

async function getFile(path: string) {
  const response = await fetch(`https://raw.githubusercontent.com/${REPO_FULL_NAME}/main/${path}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}`)
  }
  return response.text()
}

async function writeFile(path: string, content: string | Buffer, message: string, isBase64 = false) {
  const getResponse = await fetch(`https://api.github.com/repos/${REPO_FULL_NAME}/contents/${path}`, {
    method: "GET",
    headers: githubHeaders(),
  })

  const existing = getResponse.ok ? await getResponse.json() : null

  const response = await fetch(`https://api.github.com/repos/${REPO_FULL_NAME}/contents/${path}`, {
    method: "PUT",
    headers: githubHeaders(),
    body: JSON.stringify({
      message,
      content: isBase64
        ? typeof content === "string"
          ? content
          : content.toString("base64")
        : Buffer.isBuffer(content)
          ? content.toString("base64")
          : Buffer.from(content).toString("base64"),
      sha: existing?.sha,
      committer: { name: "Decap CMS", email: "cms@prosolga.com" },
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to write ${path}`)
  }
}

async function deleteFile(path: string, message: string) {
  const getResponse = await fetch(`https://api.github.com/repos/${REPO_FULL_NAME}/contents/${path}`, {
    method: "GET",
    headers: githubHeaders(),
  })

  if (!getResponse.ok) {
    throw new Error(`File not found: ${path}`)
  }

  const existing = await getResponse.json()

  const response = await fetch(`https://api.github.com/repos/${REPO_FULL_NAME}/contents/${path}`, {
    method: "DELETE",
    headers: githubHeaders(),
    body: JSON.stringify({
      message,
      sha: existing.sha,
      committer: { name: "Decap CMS", email: "cms@prosolga.com" },
    }),
  })

  if (!response.ok) {
    throw new Error(`Failed to delete ${path}`)
  }
}

export async function POST(request: NextRequest) {
  if (!CMS_SHARED_SECRET) {
    return NextResponse.json({ error: "CMS secret not configured" }, { status: 500 })
  }

  if (request.headers.get("x-cms-secret") !== CMS_SHARED_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let payload: DecapProxyRequest
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 })
  }

  try {
    switch (payload.action) {
      case "info":
        return NextResponse.json({ repo: REPO_FULL_NAME })
      case "entriesByFolder": {
        const folder = resolveFolder(payload)
        if (!folder) throw new Error("Missing folder")
        const files = await listFolder(folder)
        const entries = await Promise.all(
          files.filter((file: any) => file.type === "file").map(async (file: any) => ({
            file: { path: file.path },
            data: await getFile(file.path),
          })),
        )
        return NextResponse.json(entries)
      }
      case "entriesByFiles": {
        const files = payload.files || []
        const entries = await Promise.all(
          files.map(async (file) => ({
            file,
            data: await getFile(file.path),
          })),
        )
        return NextResponse.json(entries)
      }
      case "entry":
      case "getEntry": {
        const path = payload.entry?.path || payload.entry?.file?.path || payload.path
        if (!path) throw new Error("Missing entry path")
        const data = await getFile(path)
        return NextResponse.json({ file: { path }, data })
      }
      case "persistEntry":
      case "persistUnpublishedEntry": {
        const path =
          payload.entry?.path ||
          payload.entry?.file?.path ||
          (payload.entry?.collection === "insights" && payload.entry?.slug ? `content/insights/${payload.entry.slug}.mdx` : undefined)
        if (!path || !payload.entry?.raw) throw new Error("Missing entry data")
        await writeFile(path, payload.entry.raw, `Update ${path} via Decap CMS`)
        return NextResponse.json({ ok: true })
      }
      case "deleteEntry":
      case "deleteUnpublishedEntry": {
        const path =
          payload.entry?.path ||
          payload.entry?.file?.path ||
          (payload.entry?.collection === "insights" && payload.entry?.slug ? `content/insights/${payload.entry.slug}.mdx` : undefined)
        if (!path) throw new Error("Missing entry path")
        await deleteFile(path, `Delete ${path} via Decap CMS`)
        return NextResponse.json({ ok: true })
      }
      case "unpublishedEntries":
        return NextResponse.json([])
      case "unpublishedEntry":
        return NextResponse.json(null)
      case "getMedia": {
        const files = await listFolder("public/uploads")
        return NextResponse.json(
          files
            .filter((file: any) => file.type === "file" && file.name !== ".gitkeep")
            .map((file: any) => ({
              id: file.sha,
              name: file.name,
              url: file.download_url,
              path: file.path,
            })),
        )
      }
      case "getMediaFile": {
        const path = payload.path
        if (!path) throw new Error("Missing media path")
        const data = await getFile(path)
        return NextResponse.json({
          id: path,
          name: path.split("/").pop(),
          path,
          data: Buffer.from(data).toString("base64"),
          encoding: "base64",
          url: `https://raw.githubusercontent.com/${REPO_FULL_NAME}/main/${path}`,
        })
      }
      case "persistMedia": {
        const { path, fileData, fileName } = payload as any
        const targetPath = path || (fileName ? `public/uploads/${fileName}` : undefined)
        if (!targetPath || !fileData) throw new Error("Missing media data")
        const cleanData =
          typeof fileData === "string" ? fileData.replace(/^data:.*;base64,/, "") : Buffer.from(fileData).toString("base64")
        await writeFile(targetPath, cleanData, `Upload ${targetPath} via Decap CMS`, true)
        return NextResponse.json({ path: targetPath, url: `/${targetPath}` })
      }
      case "deleteMedia": {
        const { path } = payload
        if (!path) throw new Error("Missing media path")
        await deleteFile(path, `Delete ${path} via Decap CMS`)
        return NextResponse.json({ ok: true })
      }
      default:
        return NextResponse.json({ error: `Unsupported action: ${payload.action}` }, { status: 400 })
    }
  } catch (error) {
    console.error("[Decap Proxy Error]", error)
    return NextResponse.json(
      { error: "Proxy request failed", message: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}
async function listFolder(path: string) {
  const response = await fetch(`https://api.github.com/repos/${REPO_FULL_NAME}/contents/${path}`, {
    headers: githubHeaders(),
  })
  if (!response.ok) {
    throw new Error(`Failed to list ${path}`)
  }
  return response.json()
}

function resolveFolder(payload: DecapProxyRequest) {
  if (payload.folder) return payload.folder.replace(/^\/+/, "")
  const collection = payload.collection || payload.entry?.collection
  if (collection === "insights") {
    return "content/insights"
  }
  return undefined
}
