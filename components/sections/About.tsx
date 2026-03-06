import Image from 'next/image'
import { AnimateIn } from '@/components/AnimateIn'

export function About() {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 bg-muted/30 overflow-y-auto"
    >
      <div className="max-w-7xl mx-auto w-full">
        <AnimateIn>
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            About Me
          </h2>
        </AnimateIn>

        <AnimateIn delay={100}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-5">
              <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
                My name is <span className="font-semibold text-foreground">Rezhan Fatah</span>. I&apos;m a{' '}
                <span className="font-semibold text-foreground">Computer Science &amp; Economics</span> double major at{' '}
                <span className="inline-flex items-center gap-1 font-semibold bg-[#0077b8]/90 rounded px-2 py-0.5 text-white text-sm">
                  <Image
                    src="/assets/brandeis-logo.png"
                    alt="Brandeis University Logo"
                    width={14}
                    height={14}
                    className="inline-block"
                  />
                  Brandeis University
                </span>{' '}
                in the Boston Area.
              </p>
              <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
                Since I discovered my passion for technology in college, I&apos;ve dived in by always building,
                going to hackathons, and learning new skills. This year I&apos;m diving deep into AI automations.
              </p>
            </div>
            <div className="space-y-5">
              <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
                When I&apos;m not coding, I&apos;m in the kitchen cooking high-protein meals, hitting the gym,
                or genuinely touching grass outdoors. I also appreciate good architecture.
              </p>
              <p className="text-base sm:text-lg text-foreground/75 leading-relaxed">
                I believe in building for a purpose — to serve others and create efficient systems that
                drive real value. Take a look at some of my work below.
              </p>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
