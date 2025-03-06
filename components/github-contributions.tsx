"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

export function GitHubContributions() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [username] = useState("ShadBalti") // Updated GitHub username

  useEffect(() => {
    async function fetchContributions() {
      try {
        setLoading(true)
        setError(null)

        // This endpoint will fetch the last year of contributions
        const response = await fetch(`/api/github/contributions?username=${username}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch GitHub contributions: ${response.status}`)
        }

        const data = await response.json()
        setContributions(data.contributions)
      } catch (err) {
        console.error("Error fetching GitHub contributions:", err)
        setError("Failed to load contribution data. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchContributions()
  }, [username])

  // Generate placeholder data for the loading state or if there's an error
  const placeholderData = Array.from({ length: 52 * 7 }, (_, i) => ({
    date: `2023-${Math.floor(i / 30) + 1}-${(i % 30) + 1}`,
    count: 0,
    level: 0 as const,
  }))

  const displayData = contributions.length > 0 ? contributions : placeholderData

  // Group by week (every 7 days)
  const weeks = []
  for (let i = 0; i < displayData.length; i += 7) {
    weeks.push(displayData.slice(i, i + 7))
  }

  // Only show the last 52 weeks (1 year)
  const lastYear = weeks.slice(-52)

  return (
    <section ref={ref} className="py-16">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">GitHub Contributions</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">My coding activity over the past year</p>
        </div>

        {error && (
          <div className="flex items-center justify-center p-6 mb-8 bg-destructive/10 text-destructive rounded-lg">
            <AlertCircle className="w-5 h-5 mr-2" />
            <p>{error}</p>
          </div>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Contribution Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <Skeleton className="h-32 w-full" />
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="overflow-x-auto"
              >
                <div className="min-w-[800px]">
                  <div className="flex justify-end gap-1 mb-1 text-xs text-muted-foreground">
                    <div>Less</div>
                    {[0, 1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`w-3 h-3 rounded-sm ${
                          level === 0
                            ? "bg-muted border border-border"
                            : level === 1
                              ? "bg-primary/25"
                              : level === 2
                                ? "bg-primary/50"
                                : level === 3
                                  ? "bg-primary/75"
                                  : "bg-primary"
                        }`}
                      />
                    ))}
                    <div>More</div>
                  </div>

                  <div className="flex gap-1">
                    {lastYear.map((week, weekIndex) => (
                      <div key={weekIndex} className="flex flex-col gap-1">
                        {week.map((day, dayIndex) => {
                          // Determine color based on contribution level
                          const bgColor =
                            day.level === 0
                              ? "bg-muted border border-border"
                              : day.level === 1
                                ? "bg-primary/25"
                                : day.level === 2
                                  ? "bg-primary/50"
                                  : day.level === 3
                                    ? "bg-primary/75"
                                    : "bg-primary"

                          return (
                            <div
                              key={dayIndex}
                              className={`w-3 h-3 rounded-sm ${bgColor} hover:ring-2 hover:ring-ring hover:ring-offset-1`}
                              title={`${day.date}: ${day.count} contributions`}
                            />
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

