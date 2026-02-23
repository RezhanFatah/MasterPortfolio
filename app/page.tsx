import { Navbar } from '@/components/Navbar'
import { ParticlesBackground } from '@/components/ParticlesBackground'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'
import { ScrollToTop } from '@/components/ScrollToTop'

export default function Home() {
  return (
    <main className="relative">
      <ParticlesBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <ScrollToTop />
    </main>
  )
}
