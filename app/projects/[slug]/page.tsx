import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { getClient } from '@/lib/sanity/client'
import { queryProjectBySlug, queryProjectBySlugPreview } from '@/lib/sanity/queries'
import { Project } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import { portableTextComponents } from '@/lib/sanity/portable-text'
import { Navbar } from '@/components/Navbar'
import { PageTransition } from '@/components/PageTransition'
import { draftMode } from 'next/headers'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

// Revalidate every 60 seconds
export const revalidate = 60

export async function generateMetadata({ params }: ProjectPageProps) {
  const client = await getClient()
  const { isEnabled } = await draftMode()
  const query = isEnabled ? queryProjectBySlugPreview : queryProjectBySlug

  const project = await client.fetch<Project | null>(query, {
    slug: params.slug,
  })

  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
      images: project.coverImage
        ? [urlFor(project.coverImage).width(1200).height(630).url()]
        : [],
    },
  }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const client = await getClient()
  const { isEnabled } = await draftMode()
  const query = isEnabled ? queryProjectBySlugPreview : queryProjectBySlug

  const project = await client.fetch<Project | null>(query, {
    slug: params.slug,
  })

  if (!project) {
    notFound()
  }

  return (
    <PageTransition key={params.slug}>
      <main className="min-h-screen">
        <Navbar />
        <article className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/#projects"
              className="inline-flex items-center text-primary hover:underline mb-8"
            >
              ← Back to Projects
            </Link>

            <h1 className="text-4xl sm:text-5xl font-bold mb-6">{project.title}</h1>

            {project.coverImage && (
              <div className="relative w-full h-64 sm:h-96 mb-8 rounded-lg overflow-hidden">
                <Image
                  src={urlFor(project.coverImage).width(1200).height(600).url()}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              </div>
            )}

            <div className="mb-8">
              <p className="text-xl text-foreground/80 mb-6">
                {project.shortDescription}
              </p>
              {project.longDescription && (
                <div className="prose prose-invert max-w-none">
                  <PortableText
                    value={project.longDescription}
                    components={portableTextComponents}
                  />
                </div>
              )}
            </div>

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted rounded-full text-sm border border-border"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {project.links &&
              (project.links.github || project.links.demo || project.links.paper) && (
                <div className="flex flex-wrap gap-4 mb-8">
                  {project.links.github && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                      View on GitHub
                    </a>
                  )}
                  {project.links.demo && (
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
                    >
                      Live Demo
                    </a>
                  )}
                  {project.links.paper && (
                    <a
                      href={project.links.paper}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 border border-border rounded-lg hover:bg-muted transition-colors font-medium"
                    >
                      Read Paper
                    </a>
                  )}
                </div>
              )}

            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-12">
                {project.galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full h-64 rounded-lg overflow-hidden"
                  >
                    <Image
                      src={urlFor(image).width(600).height(400).url()}
                      alt={image.alt || `${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 text-sm text-foreground/60">
              Published: {new Date(project.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </div>
          </div>
        </article>
      </main>
    </PageTransition>
  )
}
