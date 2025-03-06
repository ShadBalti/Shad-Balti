import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get("username")

  if (!username) {
    return NextResponse.json({ error: "GitHub username is required" }, { status: 400 })
  }

  try {
    // Since GitHub's API doesn't directly provide contribution data in a simple format,
    // we'll simulate contribution data for demonstration purposes
    // In a real implementation, you might scrape the GitHub contributions page or use a third-party API

    // Generate a year's worth of simulated contribution data
    const today = new Date()
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(today.getFullYear() - 1)

    const contributions = []

    // Loop through each day of the year
    for (let d = new Date(oneYearAgo); d <= today; d.setDate(d.getDate() + 1)) {
      // Generate a random contribution count (more likely to be 0, occasionally higher)
      const rand = Math.random()
      let count = 0
      let level = 0

      if (rand > 0.7) {
        if (rand > 0.95) {
          count = Math.floor(Math.random() * 10) + 10 // 10-20 contributions
          level = 4
        } else if (rand > 0.9) {
          count = Math.floor(Math.random() * 5) + 5 // 5-10 contributions
          level = 3
        } else if (rand > 0.8) {
          count = Math.floor(Math.random() * 3) + 2 // 2-5 contributions
          level = 2
        } else {
          count = 1 // 1 contribution
          level = 1
        }
      }

      // Format date as YYYY-MM-DD
      const dateStr = d.toISOString().split("T")[0]

      contributions.push({
        date: dateStr,
        count,
        level,
      })
    }

    return NextResponse.json({ contributions })
  } catch (error) {
    console.error("Error generating GitHub contributions:", error)
    return NextResponse.json({ error: "Failed to generate GitHub contributions data" }, { status: 500 })
  }
}

