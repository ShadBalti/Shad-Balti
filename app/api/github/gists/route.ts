import { NextResponse } from "next/server"

// GitHub API endpoints
const GITHUB_API_URL = "https://api.github.com"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "GitHub username is required" }, { status: 400 })
  }

  try {
    // Fetch user's gists
    const gistsResponse = await fetch(`${GITHUB_API_URL}/users/${username}/gists`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!gistsResponse.ok) {
      throw new Error(`GitHub API error: ${gistsResponse.status}`)
    }

    const gistsData = await gistsResponse.json()

    return NextResponse.json({ gists: gistsData })
  } catch (error) {
    console.error("Error fetching GitHub gists:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub gists" }, { status: 500 })
  }
}

