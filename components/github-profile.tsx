"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import ReactMarkdown from "react-markdown"

export function GitHubProfile() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [readme, setReadme] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [username] = useState("ShadBalti") // Updated GitHub username

  useEffect(() => {
    async function fetchReadme() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/github/readme?username=${username}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch GitHub README: ${response.status}`)
        }

        const data = await response.json()
        setReadme(data.content)
      } catch (err) {
        console.error("Error fetching GitHub README:", err)
        setError("Failed to load GitHub profile. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchReadme()
  }, [username])

  // Only show this section if there's a README
  if (!loading && !readme && !error) {
    return null
  }

  return (
    <section ref={ref} className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">About Me on GitHub</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">My GitHub profile README</p>
        </div>

        {error && (
          <div className="flex items-center justify-center p-6 mb-8 bg-destructive/10 text-destructive rounded-lg">
            <AlertCircle className="w-5 h-5 mr-2" />
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <Card>
            <CardContent className="p-6">
              <Skeleton className="h-8 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-5/6 mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-4/5 mb-4" />
              <Skeleton className="h-20 w-full" />
            </CardContent>
          </Card>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardContent className="p-6 prose dark:prose-invert max-w-none">
                <ReactMarkdown>{readme || ""}</ReactMarkdown>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  )
}

