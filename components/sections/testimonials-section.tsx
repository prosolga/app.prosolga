"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Quote } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Autoplay from "embla-carousel-autoplay"

const testimonials = [
  {
    quote:
      "The team was incredibly professional and thorough, guiding us through every step of the way. Grenada's Second Passport program not only met our expectations for security and travel flexibility, but it has also offered excellent business opportunities. We’re excited about the future and grateful for the support we received.",
    author: "Mr. Obiekwe U.",
    avatar: "https://media.istockphoto.com/id/1441980127/photo/successful-mature-adult-businessman-stands-in-corporate-office.jpg?s=612x612&w=0&k=20&c=k-mT8UQ57BinOoCkfV_d9Ey3p_jG6oJaqt8GRfEJl4g=",
  },
  {
    quote:
      "The guidance and expertise provided by the team were invaluable. The process was seamless, and my family and I are very happy with the opportunities that this US Green Card is already opening up for our family. The ability to expand our family business in the U.S. while securing a safe and stable future for our children was exactly what we had hoped for.",
    author: "Mr. Prabhut S.",
    avatar: "https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    quote:
      "ProSolutions handled every detail with precision. Our transition into Dubai was seamless, compliant, and strategically aligned with our growth plans. We now operate confidently in a global hub with world-class infrastructure.",
    author: "Ms. Sandra O.",
    avatar: "https://thumbs.dreamstime.com/b/professional-african-businesswoman-portrait-confident-executive-leader-headshot-corporate-attire-blazer-braided-hair-400416612.jpg",
  },
  {
    quote:
      "The Malta Citizenship by Investment program was the perfect fit for our family’s needs. From the seamless application process to the security and visa free travel we now have, we are so happy we decided to go with the services of ProSolutions and their Maltese legal team. We are now proud EU citizens and excited about our future as Maltese citizens.",
    author: "Mr. Mohammed A.",
    avatar: "https://media.istockphoto.com/id/470685204/photo/arab-businessman-portrait-outside-office-building.jpg?s=612x612&w=0&k=20&c=-DIAeIqKFg8_aADaHXVwR3Z5fwau9kM=",
  },
  {
    quote:
      "The E2 visa has been a game-changer for us. With the guidance and support provided throughout the process, we were able to establish our operations in the U.S. quickly and smoothly. The business is flourishing, and our family is now settled here, enjoying the all the benefits that come with living in the U.S.",
    author: "Mr. Lucas S.",
    avatar: "https://www.shutterstock.com/image-photo/portrait-confident-man-smile-office-260nw-2557820581.jpg",
  },
  {
    quote:
      "The Financial Independence Visa has been a fantastic solution for us. The guidance provided throughout the application process was outstanding, while there were delays in our application, the team never failed to have that open line of communication. South Africa as a country has exceeded our expectations, and we are grateful for the opportunity to live here so comfortably.",
    author: "Daniel and Aoife F.",
    avatar: "https://reinerphotography.com/wp-content/uploads/2021/11/03-16111-post/07-West-Chester-Family-Portraits-Headshots.jpg",
  },
  {
    quote:
      "I am thankful to Althea, Chinwe and the entire team at ProSolutions for the smooth Business Setup Visa process. The guidance and support we received allowed us to establish our tech startup in South Africa efficiently. The support we received in developing our business plan, meeting the job creation requirements, and getting our visa approved was invaluable. We're really happy with how things are progressing, and this country is a fantastic place to do business.",
    author: "Mr. Kamal O.",
    avatar: "https://media.istockphoto.com/id/1314997483/photo/portrait-of-a-confident-mature-businessman-working-in-a-modern-office.jpg?s=612x612&w=0&k=20&c=OxN-O2qe4LbgYuOnp_VkgXOV5p7CDC_uWja9iWFM-OA=",
  },
  {
    quote:
      "ProSolutions came highly recommended to us by one of our associates, Ahmed, and we decided to give them a try. We were not disappointed; in fact, we are extremely impressed with their legal team and the professional way they handled everything.",
    author: "Mrs. Funmi O.",
    avatar: "https://www.shutterstock.com/image-photo/confident-smiling-young-professional-african-260nw-2454390665.jpg",
  },
  {
    quote:
      "We are really impressed with the Prosolutions team for transforming our wealth management approach. We now have structure, clarity, and a defined path for the next generation. What the team set out to achieve with us, they did and we are appreciative",
    author: "Mr. Adewunmi A.",
    avatar: "https://thumbs.dreamstime.com/b/close-up-headshot-portrait-african-american-business-professional-stylish-modern-glasses-intelligent-successful-handsome-174372266.jpg",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Client Success Stories</h2>
          <p className="text-lg text-muted-foreground">Hear from our satisfied clients about their experiences with ProSolutions.</p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 6000,
            }),
          ]}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent className="-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <Card className="h-full border-none shadow-lg bg-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-6 opacity-10">
                    <Quote className="h-24 w-24 text-primary" />
                  </div>
                  <CardContent className="pt-8 px-8 pb-8 flex flex-col h-full">
                    <div className="mb-6 text-primary">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className="text-yellow-400 text-xl">
                          ★
                        </span>
                      ))}
                    </div>
                    <p className="text-lg text-slate-700 italic mb-8 flex-grow relative z-10">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                    
                      <div>
                        <h4 className="font-bold text-primary">{testimonial.author}</h4>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </div>
    </section>
  )
}