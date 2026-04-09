import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeInsightFrontmatterSource(source: string): string {
  const normalizedSource = source.replace(/\r\n/g, "\n")
  const match = normalizedSource.match(/^(---\n)([\s\S]*?)(\n---)/)
  if (!match) return source

  const [fullMatch, start, rawFrontmatter, end] = match
  const lines = rawFrontmatter.split("\n")
  const normalizedLines: string[] = []
  let inExcerpt = false
  let excerptLines: string[] = []

  const endsWithUnescapedQuote = (value: string) => {
    if (!value.endsWith('"')) return false
    let backslashes = 0
    for (let i = value.length - 2; i >= 0 && value[i] === '\\'; i -= 1) {
      backslashes += 1
    }
    return backslashes % 2 === 0
  }

  for (const line of lines) {
    if (!inExcerpt) {
      const excerptStart = line.match(/^excerpt:\s*"(.*)$/)
      if (excerptStart) {
        const rest = excerptStart[1]
        if (endsWithUnescapedQuote(rest)) {
          normalizedLines.push(line)
        } else {
          inExcerpt = true
          excerptLines = [rest]
        }
      } else {
        normalizedLines.push(line)
      }
    } else {
      if (line.endsWith('"') && !line.endsWith('\\"')) {
        excerptLines.push(line.slice(0, -1))
        normalizedLines.push("excerpt: |")
        excerptLines.forEach((excerptLine) => normalizedLines.push(`  ${excerptLine}`))
        inExcerpt = false
        excerptLines = []
      } else {
        excerptLines.push(line)
      }
    }
  }

  if (inExcerpt) {
    normalizedLines.push("excerpt: |")
    excerptLines.forEach((excerptLine) => normalizedLines.push(`  ${excerptLine}`))
  }

  return `${start}${normalizedLines.join("\n")}${end}${normalizedSource.slice(fullMatch.length)}`
}

export function readingTime(htmlOrMdx: string): number {
  const plainText = htmlOrMdx
    .replace(/<img[^>]*>/g, ' [image] ')    // count images as ~12 seconds
    .replace(/<pre[^>]*>[\s\S]*?<\/pre>/g, ' [code block] ') // count code blocks
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  
  const words = plainText.split(' ').length;
  const images = (htmlOrMdx.match(/<img/g) || []).length * 12; // ~12s per image
  const codeBlocks = (htmlOrMdx.match(/<pre/g) || []).length * 30; // ~30s per block
  
  const readingSeconds = (words / 225) * 60 + images + codeBlocks;
  return Math.ceil(readingSeconds / 60);
}