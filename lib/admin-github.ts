const GITHUB_TOKEN = process.env.GITHUB_TOKEN
const REPO_FULL_NAME = process.env.GITHUB_REPO ?? "00Photon/Prosolutions-Global-Advisory-website"
const DEFAULT_BRANCH = process.env.GITHUB_BRANCH ?? "develop"

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

export function parseInsightFrontmatter(source: string) {
  const fm = source.match(/^---\n([\s\S]*?)\n---/)
  const block = fm?.[1] || ""

  const read = (key: string) => {
    const match = block.match(new RegExp(`^${key}:\\s*"([^"]*)"`, "m"))
    return match?.[1] || ""
  }

  return {
    title: read("title"),
    date: read("date"),
    category: read("category"),
    excerpt: read("excerpt"),
    coverImage: read("coverImage"),
    enabled: !/^enabled:\s*false$/m.test(block),
  }
}

export async function listRepoFolder(path: string) {
  const response = await fetch(
    `https://api.github.com/repos/${REPO_FULL_NAME}/contents/${path}?ref=${encodeURIComponent(DEFAULT_BRANCH)}`,
    { headers: githubHeaders() },
  )

  if (!response.ok) {
    throw new Error(`Failed to list folder: ${path}`)
  }

  return response.json()
}

export async function getRepoFile(path: string) {
  const response = await fetch(
    `https://api.github.com/repos/${REPO_FULL_NAME}/contents/${path}?ref=${encodeURIComponent(DEFAULT_BRANCH)}`,
    { headers: githubHeaders() },
  )

  if (!response.ok) {
    throw new Error(`Failed to get file: ${path}`)
  }

  return response.json()
}

export async function getRepoFileIfExists(path: string) {
  const response = await fetch(
    `https://api.github.com/repos/${REPO_FULL_NAME}/contents/${path}?ref=${encodeURIComponent(DEFAULT_BRANCH)}`,
    { headers: githubHeaders() },
  )

  if (response.status === 404) {
    return null
  }

  if (!response.ok) {
    throw new Error(`Failed to get file: ${path}`)
  }

  return response.json()
}

export async function getRawFile(path: string) {
  const response = await fetch(`https://raw.githubusercontent.com/${REPO_FULL_NAME}/${DEFAULT_BRANCH}/${path}`)
  if (!response.ok) {
    throw new Error(`Failed to fetch raw file: ${path}`)
  }
  return response.text()
}

export async function putRepoFile(path: string, contentBase64: string, message: string, sha?: string) {
  const response = await fetch(`https://api.github.com/repos/${REPO_FULL_NAME}/contents/${path}`, {
    method: "PUT",
    headers: githubHeaders(),
    body: JSON.stringify({
      message,
      content: contentBase64,
      sha,
      branch: DEFAULT_BRANCH,
      committer: { name: "Admin CMS", email: "admin@prosolga.com" },
    }),
  })

  if (!response.ok) {
    const details = await response.text().catch(() => "")
    throw new Error(`Failed to write file: ${path} (status ${response.status}) ${details}`)
  }

  return response.json()
}

export async function deleteRepoFile(path: string, sha: string, message: string) {
  const response = await fetch(`https://api.github.com/repos/${REPO_FULL_NAME}/contents/${path}`, {
    method: "DELETE",
    headers: githubHeaders(),
    body: JSON.stringify({
      message,
      sha,
      branch: DEFAULT_BRANCH,
      committer: { name: "Admin CMS", email: "admin@prosolga.com" },
    }),
  })

  if (!response.ok) {
    const details = await response.text().catch(() => "")
    throw new Error(`Failed to delete file: ${path} (status ${response.status}) ${details}`)
  }

  return response.json()
}
