import Image from 'next/image'
import { siteConfig } from '@/lib/config'

export function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-4 tracking-tight">
              {siteConfig.name}
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl text-primary mb-6 font-semibold">
              Full Stack Developer
            </h2>
            <p className="text-base sm:text-lg text-foreground/60 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              CS &amp; Economics at Brandeis. I build purposeful things for the web — from hackathon prototypes to polished products.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#projects"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium transition-colors"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-border rounded-lg hover:bg-muted font-medium transition-colors"
              >
                Get In Touch
              </a>
            </div>
          </div>

          {/* Right: Profile Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-15 blur-3xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-primary/20 shadow-2xl">
                <Image
                  src={siteConfig.profileImage}
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 224px, (max-width: 1024px) 288px, 320px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
