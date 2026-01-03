"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, Globe, Mail, Phone, MessageCircle, X, ChevronDown, ShieldCheck, BriefcaseBusiness, Building2, Home, Globe2 } from "lucide-react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [showContactModal, setShowContactModal] = React.useState(false)
  const [isServicesExpanded, setIsServicesExpanded] = React.useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services", type: "services" as const },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
  ]

  const services = [
    {
      name: "Citizenship & Residency",
      href: "/citizenship-relocation",
      description: "CBI, RBI, and relocation concierge for families and executives.",
      icon: ShieldCheck,
    },
    {
      name: "Employment Migration",
      href: "/employment-migration",
      description: "Work permits, executive mobility, and HR compliance across regions.",
      icon: BriefcaseBusiness,
    },
    {
      name: "Corporate Services",
      href: "/corporate-services",
      description: "Entity setup, governance, structuring, treasury, and compliance.",
      icon: Building2,
    },
    {
      name: "Real Estate Services",
      href: "/real-estate-services",
      description: "Luxury, investment, and commercial property scouting and diligence.",
      icon: Home,
    },
    {
      name: "All Services",
      href: "/services",
      description: "See the full scope of how we support your global expansion.",
      icon: Globe2,
    },
  ]

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 items-center justify-between px-4 md:px-0">
          <Link href="/" className="flex items-center space-x-2">
            {/* <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
              <Globe className="h-6 w-6" />
              <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-secondary border-2 border-white"></div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold text-primary tracking-tight">PROSOLUTIONS</span>
              <span className="text-xs font-medium text-secondary tracking-widest">GLOBAL ADVISORY</span>
            </div> */}
            <Image src="/logo.png" alt="ProSolutions Logo" width={180} height={50} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              item.type === "services" ? (
                <NavigationMenu key={item.name} viewport={false} className="flex-none">
                  <NavigationMenuList className="gap-0">
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={cn(
                          "bg-transparent px-0 py-2 text-sm font-medium text-muted-foreground hover:text-primary data-[state=open]:text-primary",
                          services.some((s) => pathname.startsWith(s.href)) && "text-primary font-semibold",
                        )}
                      >
                        {item.name}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent className="shadow-lg border bg-white/95 backdrop-blur">
                        <div className="grid gap-3 p-4 w-[360px]">
                          {services.map((service) => {
                            const Icon = service.icon
                            const isActive = pathname.startsWith(service.href)
                            return (
                              <Link
                                key={service.name}
                                href={service.href}
                                className={cn(
                                  "flex items-start gap-3 rounded-xl p-3 hover:bg-primary/5 transition-colors",
                                  isActive && "border border-primary/20 bg-primary/5",
                                )}
                              >
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                                  <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                  <p className={cn("text-sm font-semibold text-foreground", isActive && "text-primary")}>
                                    {service.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground leading-relaxed">{service.description}</p>
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "text-sm font-medium text-muted-foreground hover:text-primary transition-colors",
                    (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) && "text-primary font-semibold",
                  )}
                >
                  {item.name}
                </Link>
              )
            ))}
            <Button
              onClick={() => setShowContactModal(true)}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-6"
            >
              Get in Touch
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-8 mt-8">
                <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                  {/* <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white">
                    <Globe className="h-5 w-5" />
                  </div>
                  <span className="text-lg font-bold text-primary">PROSOLUTIONS</span> */}
                  <Image src="/logo.png" alt="ProSolutions Logo" width={120} height={40} />
                </Link>
                <nav className="flex flex-col gap-4 p-4 ">
                  {navigation.map((item) =>
                    item.type === "services" ? (
                      <div key={item.name} className="flex flex-col gap-2">
                        <button
                          onClick={() => setIsServicesExpanded((prev) => !prev)}
                          className={cn(
                            "flex items-center justify-between text-sm font-medium text-foreground hover:text-primary transition-colors",
                            services.some((s) => pathname.startsWith(s.href)) && "text-primary",
                          )}
                        >
                          <span>{item.name}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform ${isServicesExpanded ? "rotate-180" : ""}`}
                          />
                        </button>
                        {isServicesExpanded && (
                          <div className="ml-3 flex flex-col gap-2">
                            {services.map((service) => (
                              <Link
                                key={service.name}
                                href={service.href}
                                className={cn(
                                  "text-sm text-muted-foreground hover:text-primary",
                                  pathname.startsWith(service.href) && "text-primary font-semibold",
                                )}
                                onClick={() => setIsOpen(false)}
                              >
                                {service.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={cn(
                          "text-sm font-medium text-foreground hover:text-primary",
                          (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) && "text-primary font-semibold",
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ),
                  )}
                  <Button
                    onClick={() => {
                      setIsOpen(false)
                      setShowContactModal(true)
                    }}
                    className="mt-4 w-full bg-primary hover:bg-primary/90"
                  >
                    Get in Touch
                  </Button>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <AnimatePresence>
        {showContactModal && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-[100] w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="p-4 bg-primary text-white flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-lg">Get in Touch</h3>
                <p className="text-xs text-blue-100">We're here to help</p>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="hover:bg-white/20 rounded-full p-1 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-3 flex flex-col gap-2">
              <a
                href="mailto:info@prosolga.com"
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
                  <Mail className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">Email Us</span>
                  <span className="text-xs text-gray-500">info@prosolga.com</span>
                </div>
              </a>
              <a
                href="https://wa.me/2348023383139"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="h-10 w-10 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-100 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">WhatsApp</span>
                  <span className="text-xs text-gray-500">Chat with our team</span>
                </div>
              </a>

              <a
                href="tel:+2348023383139"
                className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors group"
              >
                <div className="h-10 w-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 group-hover:bg-purple-100 transition-colors">
                  <Phone className="h-5 w-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-gray-900">Call Us</span>
                  <span className="text-xs text-gray-500">+234 802 338 3139</span>
                </div>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
