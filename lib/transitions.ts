import { Variants } from 'framer-motion'

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  exit: {
    opacity: 0,
    scale: 1.02,
  },
}

// Separate filter animation for blur effect
export const pageTransitionStyle = {
  initial: { filter: 'blur(6px)' },
  animate: { filter: 'blur(0px)' },
  exit: { filter: 'blur(6px)' },
}

export const transitionConfig = {
  duration: 0.45,
  ease: [0.4, 0, 0.2, 1] as const, // easeInOut cubic bezier
}

/**
 * Check if user prefers reduced motion
 * Returns true if user has prefers-reduced-motion enabled
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
