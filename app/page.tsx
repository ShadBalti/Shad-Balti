import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { SkillsRating } from "@/components/skills-rating"
import { Projects } from "@/components/projects"
import { Experience } from "@/components/experience"
import { Education } from "@/components/education"
import { GitHubStats } from "@/components/github-stats"
import { GitHubContributions } from "@/components/github-contributions"
import { GitHubGists } from "@/components/github-gists"
import { GitHubProfile } from "@/components/github-profile"
import { Testimonials } from "@/components/testimonials"
import { HireMe } from "@/components/hire-me"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { BackToTop } from "@/components/back-to-top"
import { ScrollProgress } from "@/components/scroll-progress"
import { PageTransition } from "@/components/page-transition"
import { PersonStructuredData, WebsiteStructuredData } from "@/components/structured-data"

export default function Home() {
  return (
    <>
      <PersonStructuredData />
      <WebsiteStructuredData />

      <div className="min-h-screen bg-background">
        <Navbar />
        <ScrollProgress />
        <PageTransition>
          <main>
            <Hero />
            <About />
            <Experience />
            <Education />
            <Skills />
            <SkillsRating />
            <GitHubProfile />
            <GitHubStats />
            <Projects />
            <GitHubContributions />
            <GitHubGists />
            <Testimonials />
            <HireMe />
            <Contact />
          </main>
        </PageTransition>
        <Footer />
        <Toaster />
        <BackToTop />
      </div>
    </>
  )
}

