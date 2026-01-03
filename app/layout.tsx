import type React from "react"
import type { Metadata } from "next"
import { Figtree } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Prosolutions Global Advisory",
  description: "Your Global Partner for Corporate, Citizenship, and Real Estate Solutions",
  generator: "v0.app",
  keywords: [
    "Prosolutions Global Advisory",
    "Corporate services",
    "Citizenship by investment",
    "Residency by investment",
    "Real estate advisory",
    "International business consulting",
  ],
  openGraph: {
    title: "Prosolutions Global Advisory",
    description: "Corporate, citizenship, and real estate strategies tailored for ambitious global clients.",
    url: "https://www.prosolga.com/",
    siteName: "Prosolutions Global Advisory",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 418,
        alt: "Prosolutions Global Advisory",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prosolutions Global Advisory",
    description: "Your partner for corporate, citizenship, and real estate solutions worldwide.",
    images: ["/logo.png"],
    site: "@prosolutions",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${figtree.variable} font-sans antialiased min-h-screen flex flex-col bg-background text-foreground`}
      >
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  )
}
