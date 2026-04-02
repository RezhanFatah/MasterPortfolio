'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ProjectListItem } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'

interface ProjectCard3DProps {
  project: ProjectListItem
}

export function ProjectCard3D({ project }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glintRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    const glint = glintRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    const rotateX = (y - 0.5) * -12
    const rotateY = (x - 0.5) * 12

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
    card.style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(59,130,246,0.25)`

    if (glint) {
      glint.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.1) 0%, transparent 65%)`
    }
  }

  const handleMouseLeave = () => {
    const card = cardRef.current
    const glint = glintRef.current
    if (!card) return

    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
    card.style.boxShadow = ''

    if (glint) {
      glint.style.background = 'transparent'
    }
  }

  const formattedDate = new Date(project.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
  })

  return (
    <Link href={`/projects/${project.slug.current}`} className="block">
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative bg-muted rounded-xl overflow-hidden border border-border cursor-pointer"
        style={{
          transition: 'transform 0.18s ease, box-shadow 0.18s ease',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        {/* Shine / glint overlay */}
        <div
          ref={glintRef}
          className="absolute inset-0 z-10 pointer-events-none rounded-xl"
          style={{ transition: 'background 0.12s ease' }}
          aria-hidden="true"
        />

        {/* Cover image */}
        <div className="relative w-full aspect-video overflow-hidden">
          {project.coverImage ? (
            <Image
              src={urlFor(project.coverImage).width(800).height(450).url()}
              alt={project.coverImage.alt || project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-border flex items-center justify-center">
              <span className="text-foreground/30 text-sm">No image</span>
            </div>
          )}
        </div>

        {/* Card footer */}
        <div className="p-5 flex items-end justify-between gap-3">
          <h3 className="text-lg font-bold leading-snug">
            {project.title}
          </h3>
          <span className="text-xs text-foreground/40 font-medium shrink-0">
            {formattedDate}
          </span>
        </div>
      </div>
    </Link>
  )
}
