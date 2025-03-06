"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import {
  Heading5Icon as Html5,
  CodepenIcon as Css3,
  CodepenIcon as Javascript,
  CodepenIcon as ReactLogo,
  NetworkIcon as Nodejs,
  Database,
  GitGraphIcon as Git,
  Figma,
} from "lucide-react"

export function Skills() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skills = [
    { name: "HTML", icon: Html5, color: "text-[#E34F26]" },
    { name: "CSS", icon: Css3, color: "text-[#1572B6]" },
    { name: "JavaScript", icon: Javascript, color: "text-[#F7DF1E]" },
    { name: "React", icon: ReactLogo, color: "text-[#61DAFB]" },
    { name: "Node.js", icon: Nodejs, color: "text-[#339933]" },
    { name: "Databases", icon: Database, color: "text-[#4479A1]" },
    { name: "Git", icon: Git, color: "text-[#F05032]" },
    { name: "UI/UX", icon: Figma, color: "text-[#F24E1E]" },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id="skills" ref={ref} className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">My Skills</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I've worked with a variety of technologies in the web development world. Here are the main tools and
            technologies I use:
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6"
        >
          {skills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={item}
              className="flex flex-col items-center p-6 rounded-lg bg-card hover:bg-card/80 transition-colors"
            >
              <skill.icon className={`w-12 h-12 mb-4 ${skill.color}`} />
              <h3 className="font-medium">{skill.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

