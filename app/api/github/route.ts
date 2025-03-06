import { NextResponse } from 'next/server';

// GitHub API endpoints
const GITHUB_API_URL = "https://api.github.com";

// Update the headers section to properly use the GITHUB_TOKEN
const headers = {
  Accept: "application/vnd.github.v3+json",
  Authorization: `token ${process.env.GITHUB_TOKEN}`,
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 });
    }

    const response = await fetch(`https://api.github.com/users/${username}`);

    if (!response.ok) {
      throw new Error('GitHub API request failed');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GitHub API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}