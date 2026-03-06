'use client'

import { useCallback } from 'react'
import Particles from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import type { Engine } from 'tsparticles-engine'

export function ParticlesBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="fixed inset-0 -z-10"
      options={{
        background: {
          color: {
            value: 'transparent',
          },
        },
        fpsLimit: 100,
        interactivity: {
          events: {
            onClick: { enable: false },
            onHover: { enable: false },
            resize: true,
          },
        },
        particles: {
          color: {
            value: '#3b82f6',
          },
          links: {
            color: '#3b82f6',
            distance: 120,
            enable: true,
            opacity: 0.15,
            width: 1,
          },
          move: {
            direction: 'none',
            enable: true,
            outModes: {
              default: 'bounce',
            },
            random: true,
            speed: 0.3,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 1200,
            },
            value: 50,
          },
          opacity: {
            value: 0.25,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 2 },
          },
        },
        detectRetina: true,
      }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}
