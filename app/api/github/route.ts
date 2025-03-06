import { NextResponse } from "next/server"

// GitHub API endpoints
const GITHUB_API_URL = "https://api.github.com"

// Update the headers section to properly use the GITHUB_TOKEN
const headers = {
  Accept: "application/vnd.github.v3+json",
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "GitHub username is required" }, { status: 400 })
  }

  try {
    // Fetch user profile
    const userResponse = await fetch(`${GITHUB_API_URL}/users/${username}`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!userResponse.ok) {
      throw new Error(`GitHub API error: ${userResponse.status}`)
    }

    const userData = await userResponse.json()

    // Fetch repositories
    const reposResponse = await fetch(`${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=10`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    })

    if (!reposResponse.ok) {
      throw new Error(`GitHub API error: ${reposResponse.status}`)
    }

    const reposData = await reposResponse.json()

    // Process repositories to get languages for each
    const reposWithLanguages = await Promise.all(
      reposData.map(async (repo: any) => {
        if (repo.languages_url) {
          const languagesResponse = await fetch(repo.languages_url, {
            headers,
            next: { revalidate: 3600 },
          })

          if (languagesResponse.ok) {
            const languagesData = await languagesResponse.json()
            return {
              ...repo,
              languages: Object.keys(languagesData),
            }
          }
        }
        return repo
      }),
    )

    return NextResponse.json({
      user: userData,
      repositories: reposWithLanguages,
    })
  } catch (error) {
    console.error("Error fetching GitHub data:", error)
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 })
  }
}

