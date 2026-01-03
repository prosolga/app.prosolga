import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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