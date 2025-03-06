"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const { toast } = useToast()

  const handleDownloadResume = () => {
    // In a real application, this would be a link to your actual resume file
    // For now, we'll just show a toast notification
    toast({
      title: "Resume download started",
      description: "Your resume download should begin shortly.",
      duration: 3000,
    })

    // Simulate download by creating a dummy text file
    const element = document.createElement("a")
    const file = new Blob(["This is a placeholder resume file."], { type: "text/plain" })
    element.href = URL.createObjectURL(file)
    element.download = "ShadBalti-Resume.txt"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <section id="about" ref={ref} className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative w-full aspect-square max-w-md mx-auto md:mx-0 overflow-hidden rounded-xl">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Profile"
                width={500}
                height={500}
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">About Me</h2>
            <div className="space-y-4 text-muted-foreground mb-8">
              <p>
                Hello! I'm ShadBalti, a passionate self-taught web developer with a strong focus on creating intuitive
                and performant web applications. My journey into web development began when I discovered my passion for
                building things that live on the internet.
              </p>
              <p>
                I enjoy the process of turning complex problems into simple, beautiful, and intuitive designs. When I'm
                not coding or pushing pixels, you'll find me exploring new technologies, contributing to open-source
                projects, or sharing what I've learned with the community.
              </p>
              <p>I'm always open to new opportunities and challenges that will help me grow as a developer.</p>
            </div>

            <Button variant="outline" className="gap-2" onClick={handleDownloadResume}>
              <Download size={16} />
              Download Resume
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

