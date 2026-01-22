'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ImageConveyor } from '@/components/ImageConveyor'
import { pageTransition, transitionConfig, prefersReducedMotion } from '@/lib/transitions'
import { useEffect, useState } from 'react'

export function About() {
  const [shouldAnimate, setShouldAnimate] = useState(true)

  useEffect(() => {
    setShouldAnimate(!prefersReducedMotion())
  }, [])

  // Add your hobby images here - replace with your actual image paths
  const hobbyImages = [
    {
      src: '/assets/image.png',
      alt: 'Hiking',
    },
    {
      src: '/assets/ski.jpeg',
      alt: 'Skiing',
    },
    {
      src: '/assets/buildings.jpg',
      alt: 'Architecture',
    },
  ]

  return (
    <motion.section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
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
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
            About Me
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="space-y-4">
              <p className="text-[24px] text-foreground/80 sm:text-[24px] text-[17px]">
                My name is <span className="font-bold">Rezhan Fatah</span>, I&apos;m a
                <span className="font-bold"> Computer Science & Economics</span> double major
                at <span className="inline-flex items-center gap-1 font-bold bg-[#0077b8] bg-opacity-100 rounded px-2 py-0.5 border-radius-5">
                  <Image
                    src="/assets/brandeis-logo.png"
                    alt="Brandeis University Logo"
                    width={16}
                    height={16}
                    className="inline-block mr-1"
                    style={{ minWidth: 16, minHeight: 16 }}
                  />
                  <span className="font-bold">Brandeis University</span>
                </span> in the Boston Area.
              </p>
              <p className="text-[24px] text-foreground/80 sm:text-[24px] text-[17px]">
                Since I discovered my passion for technology in college, I&apos;ve dived into the deep end by always building, going to hackathons, and learning new skills.
                A new skill I&apos;d like to pick up this year is AI automations.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-[24px] text-foreground/80 sm:text-[24px] text-[17px]">
                When I&apos;m not coding, you can find me in the kitchen, where I&apos;ll be cooking <span className="font-bold text-red-500">high protein</span> meals, and going to the gym.
                Contrary to academic steryotypes, I also really enjoy <span className="text-green-500 font-bold">touching grass and being outdoors</span>. Oh, and I also appreciate good architecture!
              </p>
              <p className="text-[24px] text-foreground/80 sm:text-[24px] text-[17px]">
                I believe in building for a purpose, to serve others and create efficient systems that drive value to the users. Take a look at some of my projects below!
              </p>
            </div>
          </div>

          {/* Hobbies Conveyor Belt */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12"
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6">
              When I&apos;m Not Coding
            </h3>
            <ImageConveyor images={hobbyImages} speed={40} />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
