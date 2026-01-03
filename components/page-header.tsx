"use client"

import Image from "next/image"
import { motion } from "framer-motion"

interface PageHeaderProps {
  title: string
  subtitle: string
  backgroundImage?: string
  backgroundVideo?: string
}

export function PageHeader({ title, subtitle, backgroundImage, backgroundVideo }: PageHeaderProps) {
  return (
    <section className="relative min-h-[80vh] py-32 md:py-48 bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-900/10 z-10" />
        {backgroundVideo ? (
          <video
            key={backgroundVideo}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster={backgroundImage}
            aria-hidden="true"
            disablePictureInPicture
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        ) : backgroundImage ? (
          <div className="relative h-full w-full">
            <Image
              src={backgroundImage || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover opacity-50"
              sizes="100vw"
              priority
            />
          </div>
        ) : null}
      </div>
      <div className="container relative z-20 px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow">{title}</h1>
          <p className="text-xl md:text-2xl text-slate-200 leading-relaxed">{subtitle}</p>
        </motion.div>
      </div>
    </section>
  )
}
