export interface Project {
    _id: string
    title: string
    slug: {
        current: string
    }
    shortDescription: string
    longDescription?: any // Portable Text
    tags?: string[]
    links?: {
        github?: string
        demo?: string
        paper?: string
    }
    coverImage: {
        asset: {
            _ref: string
            _type: string
        }
        alt?: string
    }
    galleryImages?: Array<{
        asset: {
            _ref: string
            _type: string
        }
        alt?: string
    }>
    featured?: boolean
    publishedAt: string
    status?: 'published' | 'archived'
}

export interface ProjectListItem {
    _id: string
    title: string
    slug: {
        current: string
    }
    shortDescription: string
    tags?: string[]
    coverImage: {
        asset: {
            _ref: string
            _type: string
        }
        alt?: string
    }
    publishedAt: string
    featured?: boolean
}
