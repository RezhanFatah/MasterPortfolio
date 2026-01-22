import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    message: z.string().min(10),
    honeypot: z.string().max(0),
})

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 3 // 3 requests per window

function checkRateLimit(ip: string): boolean {
    const now = Date.now()
    const record = rateLimitMap.get(ip)

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW })
        return true
    }

    if (record.count >= RATE_LIMIT_MAX) {
        return false
    }

    record.count++
    return true
}

export async function POST(request: NextRequest) {
    try {
        // Rate limiting
        const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            )
        }

        const body = await request.json()

        // Validate input
        const validated = contactSchema.parse(body)

        // Check honeypot
        if (validated.honeypot) {
            return NextResponse.json(
                { error: 'Bot detected' },
                { status: 400 }
            )
        }

        // Send email via Resend
        if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL) {
            console.error('Missing Resend configuration')
            return NextResponse.json(
                { error: 'Email service not configured' },
                { status: 500 }
            )
        }

        const { data, error } = await resend.emails.send({
            from: 'Rezhan Fatah <contact@rezhanfatah.com>',
            to: process.env.CONTACT_TO_EMAIL,
            subject: `New Contact Form Submission from ${validated.name}`,
            html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${validated.name}</p>
        <p><strong>Email:</strong> ${validated.email}</p>
        <p><strong>Message:</strong></p>
        <p>${validated.message.replace(/\n/g, '<br>')}</p>
      `,
            reply_to: validated.email,
        })

        if (error) {
            console.error('Resend error:', error)
            return NextResponse.json(
                { error: 'Failed to send email' },
                { status: 500 }
            )
        }

        return NextResponse.json(
            { message: 'Email sent successfully', id: data?.id },
            { status: 200 }
        )
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Invalid input', details: error.errors },
                { status: 400 }
            )
        }

        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        )
    }
}
