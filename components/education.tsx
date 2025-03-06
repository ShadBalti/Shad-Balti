"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Calendar, Award, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Education {
  degree: string
  institution: string
  location: string
  period: string
  description: string
}

interface Certification {
  name: string
  issuer: string
  date: string
  url: string
  skills: string[]
}

export function Education() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Sample education data - replace with your actual education
  const education: Education[] = [
    {
      degree: "Self-taught Web Development",
      institution: "Online Courses & Resources",
      location: "Remote",
      period: "2018 - Present",
      description:
        "Self-directed learning through online courses, tutorials, documentation, and building projects. Focused on modern web development technologies and best practices.",
    },
    {
      degree: "Bachelor's in Computer Science",
      institution: "University of Technology",
      location: "Baltistan, Pakistan",
      period: "2016 - 2020",
      description:
        "Studied computer science fundamentals, algorithms, data structures, and software engineering principles.",
    },
  ]

  // Sample certification data - replace with your actual certifications
  const certifications: Certification[] = [
    {
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2022",
      url: "#",
      skills: ["React", "JavaScript", "Frontend Development"],
    },
    {
      name: "Full Stack Web Development",
      issuer: "freeCodeCamp",
      date: "2021",
      url: "#",
      skills: ["HTML", "CSS", "JavaScript", "Node.js", "MongoDB"],
    },
    {
      name: "JavaScript Algorithms and Data Structures",
      issuer: "freeCodeCamp",
      date: "2020",
      url: "#",
      skills: ["JavaScript", "Algorithms", "Data Structures"],
    },
  ]

  return (
    <section id="education" ref={ref} className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Education & Certifications</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My educational background and professional certifications
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Education
            </h3>
            <div className="space-y-6">
              {education.map((edu, index) => (
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
                          <CardTitle className="text-lg">{edu.degree}</CardTitle>
                          <p className="text-primary font-medium">{edu.institution}</p>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {edu.period}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">{edu.location}</p>
                      <p>{edu.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Certifications
            </h3>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start flex-wrap gap-2">
                        <CardTitle className="text-lg">{cert.name}</CardTitle>
                        <Badge variant="outline">{cert.date}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-primary font-medium mb-3">Issued by {cert.issuer}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {cert.skills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="text-xs">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="gap-1" asChild>
                        <a href={cert.url} target="_blank" rel="noopener noreferrer">
                          View Certificate
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

