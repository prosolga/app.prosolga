"use client"

import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { toast } from "sonner"

const offices = [
  {
    name: "Lagos, Nigeria",
    address: ["Plot 15, Orchid Road by Chevron", "Lekki Toll Plaza II, Lekki, Lagos"],
    phone: "+234 802 338 3139",
  },
  {
    name: "Abuja, Nigeria",
    address: [
      "1st Floor, Sterling Bank Plaza, Mohammadu Buhari Way",
      "Central Business District, Abuja 900103, Federal Capital Territory",
    ],
    phone: "+234 802 468 8522",
  },
  {
    name: "Johannesburg, South Africa",
    address: ["2nd Floor, Nelson Mandela Square, West Tower", "Maude St, Johannesburg, South Africa"],
    phone: "+27 82 725 0605",
  },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSelect = (value: string) => {
    setFormData({ ...formData, service: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const res = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
        }),
      })

      const result = await res.json()

      if (result.success) {
        toast.success(result.message || 'Message sent successfully!')
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          message: '',
        })
      } else {
        toast.error('Something went wrong')
      }
    } catch (err) {
      toast.error('Failed to send message')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <div className="flex flex-col min-h-screen">
       <PageHeader
        title="Get in Touch"
        subtitle="Schedule a Confidential Consultation"
        backgroundImage="/contact.jpg"
      />
      <section className="py-14 lg:py-20 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-primary mb-4">Send Us a Message</h2>
                <p className="text-muted-foreground">
                  Please contact us with any questions. Our specialist advisors will get back to you to schedule a
                  confidential, no-obligation consultation.
                </p>
              </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First name</Label>
                   <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                    required
                  />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last name</Label>
                  <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone number</Label>
                <Input id="phone" type="tel" value={formData.phone} onChange={handleChange} />
                </div>

             <div className="space-y-2">
              <Label htmlFor="service">Service Interest</Label>
              <Select onValueChange={handleSelect} value={formData.service}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="corporate">Corporate Services</SelectItem>
                  <SelectItem value="citizenship">Citizenship & Residency</SelectItem>
                  <SelectItem value="real-estate">International Real Estate Advisory</SelectItem>
                  <SelectItem value="employment">Employment Migration</SelectItem>
                  <SelectItem value="other">Other Inquiry</SelectItem>
                </SelectContent>
              </Select>
            </div>

               <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="min-h-[150px]"
                  required
                />
              </div>

               <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-secondary hover:bg-secondary/90 text-white h-12 text-lg"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
              </form>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-8"
            >
              <Card className="border border-slate-100 shadow-lg bg-white">
                <CardContent className="p-8 space-y-6">
                  <h3 className="text-xl font-bold text-primary mb-2">Contact Information</h3>
                  <p className="text-sm text-muted-foreground">
                    Connect directly with our regional teams for the fastest support.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">Email</h4>
                        <p className="text-muted-foreground">contact@prosolga.com</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary">Office Hours</h4>
                        <p className="text-muted-foreground">
                          Monday - Friday: 9:00 AM - 6:00 PM
                          <br />
                          Saturday - Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 space-y-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                      Regional Offices
                    </p>
                    <div className="space-y-4">
                      {offices.map((office) => (
                        <div key={office.name} className="rounded-xl border border-slate-100 p-4 space-y-3">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                              <h4 className="font-semibold text-primary">{office.name}</h4>
                              <p className="text-muted-foreground">
                                {office.address.map((line) => (
                                  <span key={line} className="block">
                                    {line}
                                  </span>
                                ))}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                              <Phone className="h-5 w-5 text-secondary" />
                            </div>
                            <div>
                              <h5 className="font-semibold text-primary">Phone</h5>
                              <p className="text-muted-foreground">{office.phone}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="bg-primary/5 p-6 rounded-xl border border-primary/10">
                <h4 className="font-semibold text-primary mb-2">Privacy Commitment</h4>
                <p className="text-sm text-muted-foreground">
                  We respect your privacy. All information provided is treated with the strictest confidence in
                  accordance with our privacy policy and GDPR regulations. We do not share your details with third
                  parties without your consent.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
