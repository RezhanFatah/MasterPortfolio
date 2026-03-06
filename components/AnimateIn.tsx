'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface AnimateInProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimateIn({ children, className = '', delay = 0 }: AnimateInProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.transitionDelay = `${delay}ms`
          el.setAttribute('data-visible', 'true')
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <div ref={ref} className={`animate-section ${className}`}>
      {children}
    </div>
  )
}
