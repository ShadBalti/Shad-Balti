"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Code, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Gist {
  id: string
  html_url: string
  description: string
  created_at: string
  updated_at: string
  files: Record<
    string,
    {
      filename: string
      language: string
      raw_url: string
      size: number
    }
  >
}

export function GitHubGists() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [gists, setGists] = useState<Gist[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [username] = useState("ShadBalti") // Updated GitHub username

  useEffect(() => {
    async function fetchGists() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/github/gists?username=${username}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch GitHub gists: ${response.status}`)
        }

        const data = await response.json()
        setGists(data.gists)
      } catch (err) {
        console.error("Error fetching GitHub gists:", err)
        setError("Failed to load gists. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchGists()
  }, [username])

  // Only show this section if there are gists
  if (!loading && gists.length === 0 && !error) {
    return null
  }

  return (
    <section ref={ref} className="py-16 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Code Snippets</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Useful code snippets and examples I've shared on GitHub Gists
          </p>
        </div>

        {error && (
          <div className="flex items-center justify-center p-6 mb-8 bg-destructive/10 text-destructive rounded-lg">
            <AlertCircle className="w-5 h-5 mr-2" />
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-48" />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="grid md:grid-cols-2 gap-6"
          >
            {gists.map((gist) => {
              const fileNames = Object.keys(gist.files)
              const firstFile = gist.files[fileNames[0]]

              return (
                <Card key={gist.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex justify-between items-start">
                      <span className="truncate mr-2">{firstFile.filename}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {firstFile.language}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {gist.description || "No description provided"}
                    </p>

                    {fileNames.length > 1 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs text-muted-foreground">Also includes:</span>
                        {fileNames.slice(1, 4).map((fileName) => (
                          <span
                            key={fileName}
                            className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground"
                          >
                            {fileName}
                          </span>
                        ))}
                        {fileNames.length > 4 && (
                          <span className="text-xs px-2 py-1 rounded-full bg-secondary text-secondary-foreground">
                            +{fileNames.length - 4} more
                          </span>
                        )}
                      </div>
                    )}

                    <Button size="sm" variant="outline" className="gap-2" asChild>
                      <a href={gist.html_url} target="_blank" rel="noopener noreferrer">
                        <Code className="w-4 h-4" />
                        <span>View Gist</span>
                        <ExternalLink className="w-3 h-3 ml-1" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </motion.div>
        )}
      </div>
    </section>
  )
}

