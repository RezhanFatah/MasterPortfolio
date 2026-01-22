'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { pageTransition, transitionConfig, prefersReducedMotion } from '@/lib/transitions'

interface ProjectsWrapperProps {
  children: React.ReactNode
}

export function ProjectsWrapper({ children }: ProjectsWrapperProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion())
  }, [])

  return (
    <motion.section
      id="projects"
      className="py-20 px-4 sm:px-6 lg:px-8"
      {...(shouldAnimate
        ? {
          initial: {
            opacity: 0,
            scale: 0.98,
            filter: 'blur(6px)',
          },
          whileInView: {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)',
          },
          viewport: { once: true },
          transition: transitionConfig,
        }
        : {})}
    >
      {children}
    </motion.section>
  )
}
