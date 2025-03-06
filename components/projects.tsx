"use client"

import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer"
import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Star, GitFork, Eye, AlertCircle, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  homepage: string
  stargazers_count: number
  forks_count: number
  watchers_count: number
  updated_at: string
  languages: string[]
  topics: string[]
}

interface GitHubData {
  user: {
    avatar_url: string
    name: string
    bio: string
    public_repos: number
    followers: number
    following: number
  }
  repositories: Repository[]
}

export function Projects() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [githubData, setGithubData] = useState<GitHubData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [username] = useState("ShadBalti") // Updated GitHub username
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)
  const [allLanguages, setAllLanguages] = useState<string[]>([])

  useEffect(() => {
    async function fetchGitHubData() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/github?username=${username}`)

        if (!response.ok) {
          throw new Error(`Failed to fetch GitHub data: ${response.status}`)
        }

        const data = await response.json()
        setGithubData(data)

        // Extract all unique languages
        const languages = new Set<string>()
        if (data.repositories && Array.isArray(data.repositories)) {
          data.repositories.forEach((repo: Repository) => {
            if (repo.languages && Array.isArray(repo.languages)) {
              repo.languages.forEach((lang) => languages.add(lang))
            }
          })
        }

        setAllLanguages(Array.from(languages))
      } catch (err) {
        console.error("Error fetching GitHub data:", err)
        setError("Failed to load GitHub projects. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchGitHubData()
  }, [username])

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Fallback projects in case of error or no repositories
  const fallbackProjects = [
    {
      id: 1,
      name: "E-Commerce Website",
      description:
        "A fully responsive e-commerce platform built with React, Next.js, and Stripe integration for payments.",
      html_url: "#",
      homepage: "#",
      stargazers_count: 25,
      forks_count: 10,
      watchers_count: 15,
      updated_at: new Date().toISOString(),
      languages: ["TypeScript", "React", "Next.js"],
      topics: ["ecommerce", "web-app", "responsive"],
    },
    {
      id: 2,
      name: "Task Management App",
      description: "A drag-and-drop task management application with user authentication and real-time updates.",
      html_url: "#",
      homepage: "#",
      stargazers_count: 18,
      forks_count: 5,
      watchers_count: 12,
      updated_at: new Date().toISOString(),
      languages: ["JavaScript", "React", "Firebase"],
      topics: ["productivity", "task-management", "drag-and-drop"],
    },
    {
      id: 3,
      name: "Weather Dashboard",
      description: "A weather application that displays current and forecasted weather data using a third-party API.",
      html_url: "#",
      homepage: "#",
      stargazers_count: 15,
      forks_count: 3,
      watchers_count: 8,
      updated_at: new Date().toISOString(),
      languages: ["JavaScript", "HTML", "CSS"],
      topics: ["weather", "api", "dashboard"],
    },
  ]

  const repositories = githubData?.repositories || fallbackProjects

  // Filter repositories based on search term and selected language
  const filteredRepositories = repositories.filter((repo) => {
    const matchesSearch =
      searchTerm === "" ||
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (repo.topics && repo.topics.some((topic) => topic.toLowerCase().includes(searchTerm.toLowerCase())))

    const matchesLanguage = selectedLanguage === null || (repo.languages && repo.languages.includes(selectedLanguage))

    return matchesSearch && matchesLanguage
  })

  return (
    <section id="projects" ref={ref} className="py-20 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">My GitHub Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are my latest GitHub repositories. These projects showcase my skills and the technologies I work with.
          </p>

          {githubData?.user && (
            <div className="flex items-center justify-center mt-6 gap-3">
              <Image
                src={githubData.user.avatar_url || "/placeholder.svg"}
                alt={githubData.user.name || username}
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="flex gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Github className="w-4 h-4" />
                  {githubData.user.public_repos} repos
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {githubData.user.followers} followers
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Search and filter */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge
              variant={selectedLanguage === null ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => setSelectedLanguage(null)}
            >
              All
            </Badge>
            {allLanguages.map((language) => (
              <Badge
                key={language}
                variant={selectedLanguage === language ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setSelectedLanguage(language)}
              >
                {language}
              </Badge>
            ))}
          </div>
        </div>

        {error && (
          <div className="flex items-center justify-center p-6 mb-8 bg-destructive/10 text-destructive rounded-lg">
            <AlertCircle className="w-5 h-5 mr-2" />
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="flex gap-2 pt-4">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : filteredRepositories.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredRepositories.map((repo) => (
              <motion.div key={repo.id} variants={item}>
                <Card className="overflow-hidden h-full flex flex-col">
                  <CardContent className="flex flex-col flex-grow p-6">
                    <h3 className="text-xl font-bold mb-2">{repo.name}</h3>
                    <p className="text-muted-foreground mb-4 flex-grow">
                      {repo.description || "No description provided"}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.languages?.slice(0, 3).map((lang) => (
                        <span key={lang} className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                          {lang}
                        </span>
                      ))}
                      {repo.topics?.slice(0, 2).map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        {repo.stargazers_count}
                      </span>
                      <span className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        {repo.forks_count}
                      </span>
                      <span>Updated {formatDistanceToNow(new Date(repo.updated_at))} ago</span>
                    </div>

                    <div className="flex gap-3 mt-auto">
                      <Button variant="outline" size="sm" className="gap-2" asChild>
                        <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                          <Github size={16} />
                          Code
                        </a>
                      </Button>
                      {repo.homepage && (
                        <Button size="sm" className="gap-2" asChild>
                          <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                            <ExternalLink size={16} />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No projects found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  )
}

