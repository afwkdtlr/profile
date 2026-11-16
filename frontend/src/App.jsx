import { useEffect, useState } from "react"
import { loadProfile } from "./api/profile"
import { fallbackProfile } from "./data/fallbackProfile"
import About from "./components/About"
import Contact from "./components/Contact"
import Experience from "./components/Experience"
import Footer from "./components/Footer"
import Header from "./components/Header"
import Hero from "./components/Hero"
import Projects from "./components/Projects"
import Skills from "./components/Skills"

export default function App() {
  const [profile, setProfile] = useState(fallbackProfile)
  const [source, setSource] = useState("fallback")

  useEffect(() => {
    let ignore = false

    loadProfile().then((result) => {
      if (ignore) {
        return
      }
      setProfile(result.profile)
      setSource(result.source)
      document.title = `${result.profile.name} · 포트폴리오`
    })

    return () => {
      ignore = true
    }
  }, [])

  return (
    <div className="min-h-screen">
      <Header name={profile.name} />
      <main>
        <Hero profile={profile} />
        <About about={profile.about} highlights={profile.highlights} />
        <Skills skills={profile.skills} />
        <Experience experiences={profile.experiences} />
        <Projects projects={profile.projects} />
        <Contact contact={profile.contact} />
      </main>
      <Footer name={profile.name} source={source} />
    </div>
  )
}
