import { getClient } from '@/lib/sanity/client'
import { queryAllProjects } from '@/lib/sanity/queries'
import { ProjectListItem } from '@/lib/sanity/types'
import { ProjectCard3D } from '@/components/ProjectCard3D'
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
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Projects
        </h2>

        {projects.length === 0 ? (
          <div className="text-center text-foreground/50 py-16 space-y-2">
            <p className="text-lg font-medium">No projects yet.</p>
            <p className="text-sm">Visit <span className="text-primary">/studio</span> to add your first project.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((project) => (
              <ProjectCard3D key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </ProjectsWrapper>
  )
}
