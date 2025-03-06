"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function Analytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (pathname) {
      // Track page views
      const url = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname

      // Replace this with your actual analytics tracking code
      // Example for Google Analytics:
      if (typeof window.gtag === "function") {
        window.gtag("config", "G-XXXXXXXXXX", {
          page_path: url,
        })
      }
    }
  }, [pathname, searchParams])

  return null
}

