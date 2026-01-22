import { groq } from 'next-sanity'

// Query for project list (minimal fields for cards)
// Featured projects first, then by publishedAt desc
// Only published projects
export const queryAllProjects = groq`
  *[_type == "project" 
    && defined(slug.current) 
    && (!defined(status) || status == "published")
  ] | order(featured desc, publishedAt desc) {
    _id,
    title,
    slug,
    shortDescription,
    tags,
    coverImage,
    publishedAt,
    featured
  }
`

// Query for single project by slug (full details)
// Includes longDescription and galleryImages
export const queryProjectBySlug = groq`
  *[_type == "project" 
    && slug.current == $slug
    && (!defined(status) || status == "published")
  ][0] {
    _id,
    title,
    slug,
    shortDescription,
    longDescription,
    tags,
    links,
    coverImage,
    galleryImages,
    featured,
    publishedAt,
    status
  }
`

// Preview query (includes drafts)
export const queryProjectBySlugPreview = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    longDescription,
    tags,
    links,
    coverImage,
    galleryImages,
    featured,
    publishedAt,
    status
  }
`
