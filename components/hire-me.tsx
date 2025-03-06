"use client"

import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, Clock, Globe, DollarSign, Calendar, CheckCircle2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin } from "lucide-react" // Import MapPin

export function HireMe() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section id="hire-me" ref={ref} className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Hire Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm currently available for freelance projects, contract work, and full-time positions
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="preferences" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="preferences">Job Preferences</TabsTrigger>
              <TabsTrigger value="rates">Rates & Availability</TabsTrigger>
              <TabsTrigger value="process">Working Process</TabsTrigger>
            </TabsList>

            <TabsContent value="preferences">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-primary" />
                      What I'm Looking For
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Preferred Roles</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge>Frontend Developer</Badge>
                        <Badge>Full Stack Developer</Badge>
                        <Badge>React Developer</Badge>
                        <Badge>Next.js Developer</Badge>
                        <Badge>UI Developer</Badge>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Employment Types</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Full-time positions</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Contract work</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Freelance projects</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <span>Remote work</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Location Preferences</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Globe className="h-5 w-5 text-primary" />
                        <span>Remote (Preferred)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>Baltistan, Pakistan (On-site)</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="rates">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-primary" />
                      Rates & Availability
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Rate Card</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 border rounded-lg">
                          <div className="text-lg font-bold mb-1">$25-35/hour</div>
                          <div className="text-sm text-muted-foreground">Hourly Rate</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-lg font-bold mb-1">$500-2,000</div>
                          <div className="text-sm text-muted-foreground">Small Projects</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-lg font-bold mb-1">$2,000-5,000</div>
                          <div className="text-sm text-muted-foreground">Medium Projects</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="text-lg font-bold mb-1">$5,000+</div>
                          <div className="text-sm text-muted-foreground">Large Projects</div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-3">
                        Rates may vary based on project complexity, timeline, and specific requirements.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-medium mb-3">Current Availability</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="h-5 w-5 text-green-500" />
                        <span className="font-medium text-green-600">Available Now</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span>40 hours per week for full-time roles</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-5 w-5 text-primary" />
                        <span>20+ hours per week for contract/freelance</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>

            <TabsContent value="process">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                      My Working Process
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          1
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-2">Initial Consultation</h3>
                          <p>
                            I'll meet with you to discuss your project requirements, goals, timeline, and budget. This
                            helps me understand your vision and determine if we're a good fit to work together.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          2
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-2">Proposal & Agreement</h3>
                          <p>
                            After understanding your needs, I'll provide a detailed proposal outlining scope,
                            deliverables, timeline, and cost. Once we agree on terms, we can formalize with a contract.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          3
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-2">Design & Development</h3>
                          <p>
                            I follow an iterative development process with regular check-ins and updates. You'll have
                            visibility into progress and opportunities to provide feedback throughout.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          4
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-2">Testing & Delivery</h3>
                          <p>
                            I thoroughly test all work before delivery to ensure quality. After final approval, I'll
                            deliver all agreed-upon assets and provide documentation as needed.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                          5
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-2">Support & Maintenance</h3>
                          <p>
                            I offer post-project support to address any issues and can provide ongoing maintenance
                            services if needed to keep your project running smoothly.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8">
                      <Button className="w-full" asChild>
                        <a href="#contact">
                          Contact Me to Get Started
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}

