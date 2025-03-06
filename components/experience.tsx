"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin } from "lucide-react"

interface Experience {
  title: string
  company: string
  location: string
  period: string
  description: string
  skills: string[]
}

export function Experience() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Sample experience data - replace with your actual experience
  const experiences: Experience[] = [
    {
      title: "Frontend Developer",
      company: "Freelance",
      location: "Remote",
      period: "2021 - Present",
      description:
        "Developed responsive web applications for various clients using modern frontend technologies. Collaborated with designers and backend developers to implement user interfaces and integrate APIs.",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
    },
    {
      title: "Web Developer Intern",
      company: "Tech Solutions",
      location: "Baltistan, Pakistan",
      period: "2020 - 2021",
      description:
        "Assisted in developing and maintaining client websites. Implemented responsive designs and fixed bugs. Participated in code reviews and team meetings.",
      skills: ["HTML", "CSS", "JavaScript", "WordPress"],
    },
    {
      title: "Open Source Contributor",
      company: "Various Projects",
      location: "Remote",
      period: "2019 - Present",
      description:
        "Contributed to various open source projects, fixing bugs and implementing new features. Collaborated with developers from around the world.",
      skills: ["Git", "GitHub", "JavaScript", "React"],
    },
  ]

  return (
    <section id="experience" ref={ref} className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Professional Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My work history and professional experience in the tech industry
          </p>
        </div>

        <div className="space-y-8 max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div>
                      <CardTitle className="text-xl">{exp.title}</CardTitle>
                      <p className="text-primary font-medium">{exp.company}</p>
                    </div>
                    <Badge variant="outline" className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {exp.period}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-4 w-4" />
                    {exp.location}
                  </div>
                  <p className="mb-4">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
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

