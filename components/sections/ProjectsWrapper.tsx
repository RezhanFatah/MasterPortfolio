'use client'

interface ProjectsWrapperProps {
  children: React.ReactNode
}

export function ProjectsWrapper({ children }: ProjectsWrapperProps) {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center py-20 px-4 sm:px-6 lg:px-8 overflow-y-auto"
    >
      {children}
    </section>
  )
}
