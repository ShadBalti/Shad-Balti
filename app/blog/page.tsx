import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PersonStructuredData, WebsiteStructuredData } from "@/components/structured-data"
import { formatDate } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { BlogFallback } from "@/components/blog-fallback"

export const metadata: Metadata = {
  title: "Blog | Web Development Insights",
  description: "Read the latest articles on web development, React, Next.js, and frontend technologies by ShadBalti.",
}

// Function to fetch blog posts directly from Dev.to API
async function getDevToPosts() {
  try {
    const username = siteConfig.devToUsername || "ShadBalti"
    const response = await fetch(`https://dev.to/api/articles?username=${username}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error(`Dev.to API error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Error fetching from Dev.to:", error)
    return []
  }
}

export default async function BlogPage() {
  // Fetch blog posts
  const blogPosts = await getDevToPosts()

  // Use fetched posts or show a message if empty
  const hasPosts = blogPosts && blogPosts.length > 0

  return (
    <>
      <PersonStructuredData />
      <WebsiteStructuredData />

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <section className="py-20 bg-muted/30">
            <div className="container px-4 mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl font-bold mb-4">Blog</h1>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Insights, tutorials, and thoughts on web development and technology
                </p>
              </div>

              {hasPosts ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.map((post) => (
                    <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={post.cover_image || post.social_image || "/placeholder.svg?height=400&width=600"}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform hover:scale-105"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                      </div>
                      <CardHeader className="pb-2">
                        <div className="flex gap-2 mb-2 flex-wrap">
                          {post.tag_list && post.tag_list.length > 0 ? (
                            post.tag_list.slice(0, 3).map((tag) => <Badge key={tag}>{tag}</Badge>)
                          ) : (
                            <Badge>{post.user?.name || "ShadBalti"}</Badge>
                          )}
                        </div>
                        <CardTitle className="line-clamp-2">
                          <Link href={`/blog/${post.slug}`} className="hover:text-primary transition-colors">
                            {post.title}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-muted-foreground line-clamp-3">{post.description}</p>
                      </CardContent>
                      <CardFooter className="flex justify-between text-sm text-muted-foreground">
                        <span>{post.user?.name || "ShadBalti"}</span>
                        <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <>
                  <div className="text-center mb-12">
                    <p className="text-muted-foreground">
                      No blog posts found from Dev.to. Showing sample posts instead.
                    </p>
                  </div>
                  <BlogFallback />
                </>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}

