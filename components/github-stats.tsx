"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle, Code, GitFork, Star, Users } from "lucide-react"

interface GitHubStats {
  user: {
    name: string
    login: string
    avatar_url: string
    html_url: string
    public_repos: number
    followers: number
    following: number
    bio: string
  }
  stats: {
    totalStars: number
    totalForks: number
    totalWatchers: number
    languages: Record<string, number>
  }
}

export function GitHubStats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [username] = useState("ShadBalti") // Updated GitHub username

  useEffect(() => {
    async function fetchGitHubStats() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/github?username=${username}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch GitHub data: ${response.status}`)
        }

        const data = await response.json()

        // Calculate total stats
        const totalStars = data.repositories.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)
        const totalForks = data.repositories.reduce((sum: number, repo: any) => sum + repo.forks_count, 0)
        const totalWatchers = data.repositories.reduce((sum: number, repo: any) => sum + repo.watchers_count, 0)

        // Count languages
        const languages: Record<string, number> = {}
        data.repositories.forEach((repo: any) => {
          if (repo.languages) {
            repo.languages.forEach((lang: string) => {
              languages[lang] = (languages[lang] || 0) + 1
            })
          }
        })

        setStats({
          user: data.user,
          stats: {
            totalStars,
            totalForks,
            totalWatchers,
            languages,
          },
        })
      } catch (err) {
        console.error("Error fetching GitHub stats:", err)
        setError("Failed to load GitHub statistics. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubStats()
  }, [username])

  const statItems = [
    { icon: Code, label: "Repositories", value: stats?.user?.public_repos || 0 },
    { icon: Star, label: "Total Stars", value: stats?.stats?.totalStars || 0 },
    { icon: GitFork, label: "Total Forks", value: stats?.stats?.totalForks || 0 },
    { icon: Users, label: "Followers", value: stats?.user?.followers || 0 },
  ]

  return (
    <section ref={ref} className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">GitHub Statistics</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">A summary of my GitHub activity and contributions</p>
        </div>

        {error && (
          <div className="flex items-center justify-center p-6 mb-8 bg-destructive/10 text-destructive rounded-lg">
            <AlertCircle className="w-5 h-5 mr-2" />
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-10 w-10 rounded-full mb-4" />
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-6 w-12" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {statItems.map((item, index) => (
              <Card key={index}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">{item.label}</h3>
                  <p className="text-2xl font-bold">{item.value}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {stats && stats.stats.languages && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-12"
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Top Languages</h3>
                <div className="flex flex-wrap gap-3">
                  {Object.entries(stats.stats.languages)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 8)
                    .map(([language, count]) => (
                      <div
                        key={language}
                        className="px-3 py-2 rounded-lg bg-secondary text-secondary-foreground flex items-center gap-2"
                      >
                        <span>{language}</span>
                        <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-full">
                          {count} {count === 1 ? "repo" : "repos"}
                        </span>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  )
}

