import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

// Fallback posts to display when no Dev.to posts are available
const fallbackPosts = [
  {
    id: 1,
    title: "Building Responsive Websites with Tailwind CSS",
    description: "Learn how to create beautiful, responsive websites quickly using Tailwind CSS utility classes.",
    published_at: "2023-11-15",
    user: { name: "ShadBalti" },
    tag_list: ["tailwind", "responsive", "css"],
    cover_image: "/placeholder.svg?height=400&width=600",
    slug: "building-responsive-websites-with-tailwind-css",
  },
  {
    id: 2,
    title: "Getting Started with Next.js 14",
    description:
      "Explore the new features in Next.js 14 and learn how to build faster, more efficient web applications.",
    published_at: "2023-12-01",
    user: { name: "ShadBalti" },
    tag_list: ["nextjs", "react", "javascript"],
    cover_image: "/placeholder.svg?height=400&width=600",
    slug: "getting-started-with-nextjs-14",
  },
  {
    id: 3,
    title: "The Power of React Server Components",
    description: "Understand how React Server Components work and when to use them in your Next.js applications.",
    published_at: "2024-01-10",
    user: { name: "ShadBalti" },
    tag_list: ["react", "server-components", "performance"],
    cover_image: "/placeholder.svg?height=400&width=600",
    slug: "power-of-react-server-components",
  },
]

export function BlogFallback() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {fallbackPosts.map((post) => (
        <Card key={post.id} className="overflow-hidden flex flex-col h-full">
          <div className="relative h-48 w-full overflow-hidden">
            <Image
              src={post.cover_image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <CardHeader className="pb-2">
            <div className="flex gap-2 mb-2 flex-wrap">
              {post.tag_list.map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
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
            <span>{post.user.name}</span>
            <time dateTime={post.published_at}>{formatDate(post.published_at)}</time>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

