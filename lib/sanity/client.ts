import { createClient } from 'next-sanity'
import type { ClientConfig } from 'next-sanity'
import { draftMode } from 'next/headers'

const config: ClientConfig = {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01',
    useCdn: process.env.NODE_ENV === 'production',
}

// Public client for published content (no token needed)
export const client = createClient(config)

// Preview client for draft content (requires token, server-only)
export function getPreviewClient() {
    if (!process.env.SANITY_API_TOKEN) {
        throw new Error('SANITY_API_TOKEN is required for preview mode')
    }

    return createClient({
        ...config,
        token: process.env.SANITY_API_TOKEN,
        useCdn: false, // Always bypass CDN for preview
        perspective: 'previewDrafts', // Enable draft preview
    })
}

// Get client based on draft mode status
export async function getClient() {
    const { isEnabled } = await draftMode()

    if (isEnabled && process.env.SANITY_API_TOKEN) {
        return getPreviewClient()
    }

    return client
}
