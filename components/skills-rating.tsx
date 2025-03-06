"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Skill {
  name: string
  level: number
  category: "frontend" | "backend" | "tools" | "soft"
}

export function SkillsRating() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Sample skills data - replace with your actual skills
  const skills: Skill[] = [
    // Frontend
    { name: "HTML/CSS", level: 95, category: "frontend" },
    { name: "JavaScript", level: 90, category: "frontend" },
    { name: "React", level: 85, category: "frontend" },
    { name: "Next.js", level: 80, category: "frontend" },
    { name: "TypeScript", level: 75, category: "frontend" },
    { name: "Tailwind CSS", level: 90, category: "frontend" },

    // Backend
    { name: "Node.js", level: 70, category: "backend" },
    { name: "Express", level: 65, category: "backend" },
    { name: "MongoDB", level: 60, category: "backend" },
    { name: "REST APIs", level: 75, category: "backend" },

    // Tools
    { name: "Git/GitHub", level: 85, category: "tools" },
    { name: "VS Code", level: 90, category: "tools" },
    { name: "Figma", level: 70, category: "tools" },
    { name: "Webpack", level: 65, category: "tools" },

    // Soft Skills
    { name: "Problem Solving", level: 90, category: "soft" },
    { name: "Communication", level: 85, category: "soft" },
    { name: "Time Management", level: 80, category: "soft" },
    { name: "Teamwork", level: 85, category: "soft" },
  ]

  const frontendSkills = skills.filter((skill) => skill.category === "frontend")
  const backendSkills = skills.filter((skill) => skill.category === "backend")
  const toolsSkills = skills.filter((skill) => skill.category === "tools")
  const softSkills = skills.filter((skill) => skill.category === "soft")

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Skill Proficiency</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A detailed breakdown of my technical and soft skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Frontend Development</h3>
                <div className="space-y-6">
                  {frontendSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Backend Development</h3>
                <div className="space-y-6">
                  {backendSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Tools & Technologies</h3>
                <div className="space-y-6">
                  {toolsSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-6">Soft Skills</h3>
                <div className="space-y-6">
                  {softSkills.map((skill, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{skill.name}</span>
                        <span className="text-muted-foreground">{skill.level}%</span>
                      </div>
                      <Progress value={skill.level} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

