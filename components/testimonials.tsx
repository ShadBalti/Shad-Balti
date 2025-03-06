"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

interface Testimonial {
  quote: string
  name: string
  title: string
  company: string
  image: string
}

export function Testimonials() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Sample testimonials - replace with actual testimonials
  const testimonials: Testimonial[] = [
    {
      quote:
        "ShadBalti delivered our project on time and exceeded our expectations. Their attention to detail and problem-solving skills made them a pleasure to work with.",
      name: "Sarah Johnson",
      title: "Project Manager",
      company: "TechCorp",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "Working with ShadBalti was a great experience. They quickly understood our requirements and delivered a high-quality website that perfectly matched our vision.",
      name: "Michael Chen",
      title: "Founder",
      company: "StartupX",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      quote:
        "ShadBalti's technical skills and creativity helped us transform our outdated website into a modern, user-friendly platform. Highly recommended!",
      name: "Jessica Williams",
      title: "Marketing Director",
      company: "CreativeAgency",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <section ref={ref} className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            What clients and colleagues say about working with me
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="p-6 flex flex-col h-full">
                  <Quote className="h-8 w-8 text-primary/40 mb-4" />
                  <p className="text-muted-foreground mb-6 flex-grow">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.image} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.title}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

