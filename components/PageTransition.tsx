'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { pageTransition, transitionConfig, prefersReducedMotion } from '@/lib/transitions'

interface PageTransitionProps {
  children: React.ReactNode
  key?: string | number
}

export function PageTransition({ children, key }: PageTransitionProps) {
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion())
  }, [])

  if (!shouldAnimate) {
    return <>{children}</>
  }

  return (
    <motion.div
      key={key}
      initial={{
        opacity: 0,
        scale: 0.98,
        filter: 'blur(6px)',
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
      }}
      exit={{
        opacity: 0,
        scale: 1.02,
        filter: 'blur(6px)',
      }}
      transition={transitionConfig}
    >
      {children}
    </motion.div>
  )
}
