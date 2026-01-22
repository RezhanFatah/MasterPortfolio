import { NextRequest, NextResponse } from 'next/server'
import { draftMode } from 'next/headers'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const secret = searchParams.get('secret')
    const slug = searchParams.get('slug')

    // Check for secret to confirm this is a valid request
    if (secret !== process.env.SANITY_PREVIEW_SECRET) {
        return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    if (!slug) {
        return NextResponse.json({ message: 'Missing slug' }, { status: 400 })
    }

    try {
        // Enable Draft Mode
        const { enable } = await draftMode()
        enable()

        // Redirect to the project page
        return NextResponse.redirect(
            new URL(`/projects/${slug}`, request.url)
        )
    } catch (error) {
        console.error('Preview error:', error)
        return NextResponse.json(
            { message: 'Error enabling preview mode' },
            { status: 500 }
        )
    }
}
