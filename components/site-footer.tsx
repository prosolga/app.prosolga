import Link from "next/link"
import { Globe, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import Image from "next/image"

export function SiteFooter() {
  return (
    <footer className="bg-slate-900 text-slate-200 p-4">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              {/* <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary">
                <Globe className="h-5 w-5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-lg font-bold text-white tracking-tight">PROSOLUTIONS</span>
                <span className="text-[10px] font-medium text-slate-400 tracking-widest">GLOBAL ADVISORY</span>
              </div> */}
              <Image src="/logo.png" alt="ProSolutions Logo" width={150} height={40} />
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Trusted partner for corporate structuring, citizenship by investment, residency by investment, international
              real estate, and employment migration solutions.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/corporate-services" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-secondary" />
                  Corporate Services
                </Link>
              </li>
              <li>
                <Link href="/citizenship-relocation" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-secondary" />
                  Citizenship & Residency by Investment
                </Link>
              </li>
              <li>
                <Link href="/real-estate-services" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-secondary" />
                  International Real Estate Advisory
                </Link>
              </li>
              <li>
                <Link href="/employment-migration" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                  <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity text-secondary" />
                  Employment Migration
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h3>
            <ul className="space-y-4">
              <li className="text-sm text-slate-400 space-y-1">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-secondary shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Lagos Advisory Suite</p>
                    <p>Plot 15, Orchid Road by Chevron, Lekki Toll Plaza II, Lekki, Lagos</p>
                  </div>
                </div>
                <p className="pl-8 text-xs text-slate-500">Phone: +234 802 338 3139</p>
              </li>
              <li className="text-sm text-slate-400 space-y-1">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-secondary shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Abuja Liaison Office</p>
                    <p>1st Floor, Sterling Bank Plaza, Mohammadu Buhari Way, Central Business District, Abuja 900103</p>
                  </div>
                </div>
                <p className="pl-8 text-xs text-slate-500">Phone: +234 802 468 8522</p>
              </li>
              <li className="text-sm text-slate-400 space-y-1">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-secondary shrink-0" />
                  <div>
                    <p className="font-semibold text-white">Johannesburg Private Office</p>
                    <p>2nd Floor, Nelson Mandela Square, West Tower, Maude St, Johannesburg, South Africa</p>
                  </div>
                </div>
                <p className="pl-8 text-xs text-slate-500">Phone: +27 82 725 0605</p>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <span>+234 802 338 3139</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-400">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <span>contact@prosolga.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter/Legal */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy-policy" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Prosolutions Global Advisory. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
