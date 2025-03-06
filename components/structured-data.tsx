import { siteConfig } from "@/config/site"

export function PersonStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "ShadBalti",
    url: siteConfig.url,
    image: `${siteConfig.url}/profile.jpg`,
    sameAs: [siteConfig.links.github, siteConfig.links.twitter, siteConfig.links.linkedin],
    jobTitle: "Web Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    description: "Self-taught web developer specializing in React, Next.js, and modern frontend technologies.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Baltistan",
      addressRegion: "GB",
      addressCountry: "Pakistan",
    },
    email: siteConfig.email,
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

export function WebsiteStructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.description,
    author: {
      "@type": "Person",
      name: "ShadBalti",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteConfig.url}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

