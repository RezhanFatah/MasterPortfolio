import { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/config'
import { client } from '@/lib/sanity/client'
import { queryAllProjects } from '@/lib/sanity/queries'
import { Project } from '@/lib/sanity/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = siteConfig.url

    // Fetch all projects
    let projects: Project[] = []
    try {
        projects = await client.fetch<Project[]>(queryAllProjects)
    } catch (error) {
        console.error('Error fetching projects for sitemap:', error)
    }

    const projectUrls = projects.map((project) => ({
        url: `${baseUrl}/projects/${project.slug.current}`,
        lastModified: project.publishedAt ? new Date(project.publishedAt) : new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        ...projectUrls,
    ]
}
