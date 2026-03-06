import Image from 'next/image'
import Link from 'next/link'
import { getClient } from '@/lib/sanity/client'
import { queryAllProjects } from '@/lib/sanity/queries'
import { ProjectListItem } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/image'
import { ProjectsWrapper } from './ProjectsWrapper'

// Revalidate every 60 seconds (ISR)
export const revalidate = 60

async function getProjects(): Promise<ProjectListItem[]> {
  try {
    const client = await getClient()
    const projects = await client.fetch<ProjectListItem[]>(queryAllProjects)
    return projects || []
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function Projects() {
  const projects = await getProjects()

  return (
    <ProjectsWrapper>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Projects
        </h2>

        {projects.length === 0 ? (
          <div className="text-center text-foreground/60 py-12">
            No projects found. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link
                key={project._id}
                href={`/projects/${project.slug.current}`}
                className="block group"
              >
                <div className="bg-muted rounded-lg overflow-hidden border border-border hover:border-primary h-full flex flex-col transition-colors">
                  {project.coverImage && (
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src={urlFor(project.coverImage).width(600).height(400).url()}
                        alt={project.coverImage.alt || project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-foreground/70 mb-4 flex-1">
                      {project.shortDescription}
                    </p>
                    {project.tags && project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs bg-background rounded border border-border"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="mt-auto">
                      <span className="text-sm text-primary font-medium group-hover:underline">
                        View Project →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </ProjectsWrapper>
  )
}
