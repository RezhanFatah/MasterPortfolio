import { Navbar } from '@/components/Navbar'
import { ParticlesBackground } from '@/components/ParticlesBackground'
import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Projects } from '@/components/sections/Projects'
import { Skills } from '@/components/sections/Skills'
import { Contact } from '@/components/sections/Contact'
import { PageTransition } from '@/components/PageTransition'

export default function Home() {
  return (
    <PageTransition>
      <main className="relative">
        <ParticlesBackground />
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </PageTransition>
  )
}
