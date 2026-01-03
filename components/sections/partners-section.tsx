"use client"

import Image from "next/image"

const partners = [
  { name: "Hengsheng", logo: "/logo/HENGSHENG.png" },
  { name: "SA", logo: "/logo/sa.png" },
  { name: "Zahara", logo: "/logo/ZAHARI.png" },
  { name: "GIP", logo: "/logo/gip.png" },
  { name: "Law & Visa", logo: "/logo/l&v.png" },
  { name: "Telford Business School", logo: "/logo/t&s.png" },
  // Add more as needed
]

// Duplicate enough times to cover the screen width even on large screens (assuming ~200-300px per logo)
const repeatedPartners = [...partners, ...partners, ...partners, ...partners, ...partners]

export function PartnersSection() {
  return (
    <section className="py-16 bg-white border-y border-slate-100 overflow-hidden">
      <div className="container px-4 md:px-6">
        <p className="text-center text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-12">
          Our Strategic Partners
        </p>

        {/* Single track smooth infinite marquee */}
        <div className="relative">
          <div className="flex animate-marquee whitespace-nowrap">
            {repeatedPartners.map((partner, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-16 flex items-center justify-center"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  width={180}
                  height={60}
                  className="h-12 w-auto object-contain grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

     <style jsx>{`
      @keyframes marquee {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      .animate-marquee {
        animation: marquee 20s linear infinite;
      }

      .animate-marquee:hover {
        animation-play-state: paused;
      }
    `}</style>
    </section>
  )
}