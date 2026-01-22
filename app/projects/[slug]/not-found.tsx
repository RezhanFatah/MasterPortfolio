import Link from 'next/link'
import { Navbar } from '@/components/Navbar'
import { PageTransition } from '@/components/PageTransition'

export default function NotFound() {
  return (
    <PageTransition>
      <main className="min-h-screen">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-foreground/70 mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link
            href="/#projects"
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Projects
          </Link>
        </div>
      </main>
    </PageTransition>
  )
}
