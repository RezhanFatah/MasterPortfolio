'use client'

import { useEffect, useRef } from 'react'

export function MouseGlow() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const handleMove = (e: MouseEvent) => {
      el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(59, 130, 246, 0.06), transparent 70%)`
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <div
      ref={ref}
      className="fixed inset-0 pointer-events-none z-[1]"
      aria-hidden="true"
    />
  )
}
