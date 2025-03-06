import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Briefcase, GraduationCap, Award, Code } from "lucide-react"
import { PersonStructuredData } from "@/components/structured-data"

export const metadata: Metadata = {
  title: "Resume | ShadBalti",
  description:
    "Professional resume of ShadBalti, a web developer specializing in React, Next.js, and modern frontend technologies.",
}

export default function ResumePage() {
  return (
    <>
      <PersonStructuredData />

      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-10 md:py-20">
          <div className="container px-4 mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">ShadBalti</h1>
                <p className="text-xl text-muted-foreground">Web Developer</p>
              </div>

              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Download Resume
              </Button>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-primary" />
                    Professional Experience
                  </h2>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <CardTitle className="text-xl">Frontend Developer</CardTitle>
                            <p className="text-primary font-medium">Freelance</p>
                          </div>
                          <Badge variant="outline">2021 - Present</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">
                          Developed responsive web applications for various clients using modern frontend technologies.
                          Collaborated with designers and backend developers to implement user interfaces and integrate
                          APIs.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">React</Badge>
                          <Badge variant="secondary">Next.js</Badge>
                          <Badge variant="secondary">TypeScript</Badge>
                          <Badge variant="secondary">Tailwind CSS</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <CardTitle className="text-xl">Web Developer Intern</CardTitle>
                            <p className="text-primary font-medium">Tech Solutions</p>
                          </div>
                          <Badge variant="outline">2020 - 2021</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-4">
                          Assisted in developing and maintaining client websites. Implemented responsive designs and
                          fixed bugs. Participated in code reviews and team meetings.
                        </p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">HTML</Badge>
                          <Badge variant="secondary">CSS</Badge>
                          <Badge variant="secondary">JavaScript</Badge>
                          <Badge variant="secondary">WordPress</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    Education
                  </h2>

                  <div className="space-y-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start flex-wrap gap-2">
                          <div>
                            <CardTitle className="text-xl">Bachelor's in Computer Science</CardTitle>
                            <p className="text-primary font-medium">University of Technology</p>
                          </div>
                          <Badge variant="outline">2016 - 2020</Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>
                          Studied computer science fundamentals, algorithms, data structures, and software engineering
                          principles.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    Certifications
                  </h2>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">React Developer Certification</h3>
                        <p className="text-sm text-muted-foreground">Meta</p>
                      </div>
                      <Badge variant="outline">2022</Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">Full Stack Web Development</h3>
                        <p className="text-sm text-muted-foreground">freeCodeCamp</p>
                      </div>
                      <Badge variant="outline">2021</Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">JavaScript Algorithms and Data Structures</h3>
                        <p className="text-sm text-muted-foreground">freeCodeCamp</p>
                      </div>
                      <Badge variant="outline">2020</Badge>
                    </div>
                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section>
                  <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Code className="h-5 w-5 text-primary" />
                    Skills
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Frontend</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge>HTML/CSS</Badge>
                        <Badge>JavaScript</Badge>
                        <Badge>React</Badge>
                        <Badge>Next.js</Badge>
                        <Badge>TypeScript</Badge>
                        <Badge>Tailwind CSS</Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Backend</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Node.js</Badge>
                        <Badge>Express</Badge>
                        <Badge>MongoDB</Badge>
                        <Badge>REST APIs</Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Tools</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Git/GitHub</Badge>
                        <Badge>VS Code</Badge>
                        <Badge>Figma</Badge>
                        <Badge>Webpack</Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Soft Skills</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Problem Solving</Badge>
                        <Badge>Communication</Badge>
                        <Badge>Time Management</Badge>
                        <Badge>Teamwork</Badge>
                      </div>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold mb-6">Contact</h2>

                  <div className="space-y-3">
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Email:</span>
                      <a href="mailto:shadbalti@example.com" className="text-primary hover:underline">
                        shadbalti@example.com
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">Location:</span>
                      <span>Baltistan, Pakistan</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">GitHub:</span>
                      <a
                        href="https://github.com/ShadBalti"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        github.com/ShadBalti
                      </a>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="font-medium">LinkedIn:</span>
                      <a
                        href="https://linkedin.com/in/shadbalti"
                        className="text-primary hover:underline"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        linkedin.com/in/shadbalti
                      </a>
                    </p>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

