'use client'

import Image from 'next/image'
import { Typewriter } from 'react-simple-typewriter'
import { siteConfig } from '@/lib/config'
import { motion } from 'framer-motion'
import { pageTransition, transitionConfig, prefersReducedMotion } from '@/lib/transitions'
import { useEffect, useState } from 'react'

export function Hero() {
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion())
  }, [])

  return (
    <motion.section
      id="home"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16"
      {...(shouldAnimate
        ? {
            initial: {
              opacity: 0,
              scale: 0.98,
              filter: 'blur(6px)',
            },
            animate: {
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)',
            },
            transition: transitionConfig,
          }
        : {})}
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
              <span className="text-foreground">
                <Typewriter
                  words={[siteConfig.name]}
                  loop={1}
                  typeSpeed={100}
                  deleteSpeed={50}
                  cursor
                  cursorStyle="|"
                />
              </span>
            </h1>
            <h2 className="text-2xl sm:text-3xl md:text-4xl text-primary mb-8 font-semibold">
              {siteConfig.subtitle}
            </h2>
            <p className="text-lg sm:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto lg:mx-0">
              Building cool shit and learning
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <a
                href="#projects"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
              >
                Get In Touch
              </a>
            </div>
          </motion.div>

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary via-secondary to-accent opacity-20 blur-3xl" />
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary/20 dark:border-primary/30 shadow-2xl">
                <Image
                  src={siteConfig.profileImage}
                  alt={siteConfig.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 256px, (max-width: 1024px) 320px, 384px"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
