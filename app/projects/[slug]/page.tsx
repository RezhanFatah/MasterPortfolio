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
import { draftMode } from 'next/headers'

interface ProjectPageProps {
  params: {
    slug: string
  }
}

export const revalidate = 60

export async function generateMetadata({ params }: ProjectPageProps) {
  const client = await getClient()
  const { isEnabled } = await draftMode()
  const query = isEnabled ? queryProjectBySlugPreview : queryProjectBySlug

  const project = await client.fetch<Project | null>(query, { slug: params.slug })

  if (!project) return { title: 'Project Not Found' }

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

  const project = await client.fetch<Project | null>(query, { slug: params.slug })

  if (!project) notFound()

  const publishedDate = new Date(project.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const hasLinks = project.links && (project.links.github || project.links.demo || project.links.paper)

  return (
    <main className="min-h-screen">
      <Navbar />

      <article className="pt-24 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">

          {/* Back */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-foreground/50 hover:text-foreground transition-colors mb-10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Projects
          </Link>

          {/* Hero image */}
          {project.coverImage && (
            <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 border border-border">
              <Image
                src={urlFor(project.coverImage).width(1200).height(675).url()}
                alt={project.coverImage.alt || project.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
              />
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            {project.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-4 mb-8 pb-8 border-b border-border">
            <span className="text-sm text-foreground/50">{publishedDate}</span>

            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs bg-muted rounded-full border border-border font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Short description */}
          <p className="text-lg sm:text-xl text-foreground/70 mb-8 leading-relaxed">
            {project.shortDescription}
          </p>

          {/* Links */}
          {hasLinks && (
            <div className="flex flex-wrap gap-3 mb-10">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                  GitHub
                </a>
              )}
              {project.links?.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Live Demo
                </a>
              )}
              {project.links?.paper && (
                <a
                  href={project.links.paper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-sm"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Read Paper
                </a>
              )}
            </div>
          )}

          {/* Long description */}
          {project.longDescription && (
            <div className="prose prose-invert max-w-none prose-p:text-foreground/75 prose-p:leading-relaxed prose-headings:font-bold prose-a:text-primary mb-12">
              <PortableText
                value={project.longDescription}
                components={portableTextComponents}
              />
            </div>
          )}

          {/* Gallery */}
          {project.galleryImages && project.galleryImages.length > 0 && (
            <div>
              <h2 className="text-xl font-bold mb-5">Gallery</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.galleryImages.map((image, index) => (
                  <div
                    key={index}
                    className="relative w-full aspect-video rounded-lg overflow-hidden border border-border"
                  >
                    <Image
                      src={urlFor(image).width(700).height(394).url()}
                      alt={image.alt || `${project.title} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </article>
    </main>
  )
}
