import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { PersonStructuredData } from "@/components/structured-data"
import { siteConfig } from "@/config/site"

type Props = {
  params: {
    slug: string
  }
}

// Function to fetch a specific blog post from Dev.to
async function getDevToPost(slug: string) {
  try {
    const username = siteConfig.devToUsername || "ShadBalti"

    // First, try to get all articles by the user
    const articlesResponse = await fetch(`https://dev.to/api/articles?username=${username}`, {
      next: { revalidate: 3600 },
    })

    if (!articlesResponse.ok) {
      throw new Error(`Dev.to API error: ${articlesResponse.status}`)
    }

    const articles = await articlesResponse.json()

    // Find the article with the matching slug
    const article = articles.find((article: any) => article.slug === slug)

    if (!article) {
      return null
    }

    // Now fetch the full article with the article ID
    const articleResponse = await fetch(`https://dev.to/api/articles/${article.id}`, {
      next: { revalidate: 3600 },
    })

    if (!articleResponse.ok) {
      throw new Error(`Dev.to API error: ${articleResponse.status}`)
    }

    return await articleResponse.json()
  } catch (error) {
    console.error("Error fetching from Dev.to:", error)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getDevToPost(params.slug)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.published_at,
      authors: [post.user?.name || "ShadBalti"],
      tags: post.tag_list,
      images: [
        {
          url: post.cover_image || post.social_image || "/placeholder.svg?height=600&width=1200",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.cover_image || post.social_image || "/placeholder.svg?height=600&width=1200"],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getDevToPost(params.slug)

  if (!post) {
    notFound()
  }

  // Blog post structured data for SEO
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: post.cover_image || post.social_image || "/placeholder.svg?height=600&width=1200",
    datePublished: post.published_at,
    dateModified: post.edited_at || post.published_at,
    author: {
      "@type": "Person",
      name: post.user?.name || "ShadBalti",
    },
    publisher: {
      "@type": "Person",
      name: post.user?.name || "ShadBalti",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://shadbalti-portfolio.vercel.app/blog/${post.slug}`,
    },
    keywords: post.tag_list?.join(", ") || "",
  }

  return (
    <>
      <PersonStructuredData />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleStructuredData) }} />

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <article className="py-10 md:py-20">
            <div className="container px-4 mx-auto max-w-4xl">
              <Button variant="ghost" asChild className="mb-8">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>

              <div className="mb-8">
                {post.tag_list && post.tag_list.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tag_list.map((tag: string) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                )}
                <h1 className="text-3xl md:text-5xl font-bold mb-6">{post.title}</h1>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-8">
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.user?.name || "ShadBalti"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {formatDate(post.published_at)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {post.reading_time_minutes} min read
                  </div>
                </div>
              </div>

              {post.cover_image && (
                <div className="relative w-full aspect-video mb-10 rounded-lg overflow-hidden">
                  <Image
                    src={post.cover_image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              <div
                className="prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: post.body_html }}
              />

              {post.tag_list && post.tag_list.length > 0 && (
                <div className="mt-12 pt-8 border-t">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tag_list.map((tag: string) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  )
}

