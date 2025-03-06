import { NextResponse } from "next/server"

// Dev.to API base URL
const DEV_TO_API_URL = "https://dev.to/api"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username") || "ShadBalti"
  const slug = searchParams.get("slug")

  try {
    // If slug is provided, fetch a specific article
    if (slug) {
      const response = await fetch(`${DEV_TO_API_URL}/articles/${username}/${slug}`)

      if (!response.ok) {
        throw new Error(`Dev.to API error: ${response.status}`)
      }

      const article = await response.json()
      return NextResponse.json({ article })
    }
    // Otherwise fetch all articles by username
    else {
      const response = await fetch(`${DEV_TO_API_URL}/articles?username=${username}&per_page=12`)

      if (!response.ok) {
        throw new Error(`Dev.to API error: ${response.status}`)
      }

      const articles = await response.json()
      return NextResponse.json({ articles })
    }
  } catch (error) {
    console.error("Error fetching from Dev.to:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
  }
}

