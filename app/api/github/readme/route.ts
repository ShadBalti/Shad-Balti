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
    // First try to fetch the special username/username repository README
    let readmeResponse = await fetch(`${GITHUB_API_URL}/repos/${username}/${username}/readme`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        Authorization: `token ${process.env.GITHUB_TOKEN}`,
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    // If that fails, try to fetch from the .github special repository
    if (!readmeResponse.ok) {
      readmeResponse = await fetch(`${GITHUB_API_URL}/repos/${username}/.github/readme`, {
        headers: {
          Accept: "application/vnd.github.v3+json",
          Authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
        next: { revalidate: 3600 }, // Cache for 1 hour
      })
    }

    if (!readmeResponse.ok) {
      throw new Error(`GitHub API error: ${readmeResponse.status}`)
    }

    const readmeData = await readmeResponse.json()

    // GitHub returns the content as base64 encoded
    const content = Buffer.from(readmeData.content, "base64").toString("utf-8")

    return NextResponse.json({ content })
  } catch (error) {
    console.error("Error fetching GitHub README:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub README" }, { status: 500 })
  }
}

