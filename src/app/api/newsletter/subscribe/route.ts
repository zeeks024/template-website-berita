import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'crypto'
import prisma from '@/lib/prisma'
import { sendEmail } from '@/lib/email'
import { newsletterVerificationTemplate } from '@/lib/email-templates'
import { checkRateLimit } from '@/lib/rate-limit'

const subscribeSchema = z.object({
    email: z.string().email('Email tidak valid'),
})

export async function POST(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitResult = checkRateLimit(`newsletter:${ip}`, 5, 3600000)
    
    if (!rateLimitResult.success) {
        return NextResponse.json(
            { error: 'Terlalu banyak permintaan. Coba lagi nanti.' },
            { status: 429 }
        )
    }

    try {
        const body = await request.json()
        const { email } = subscribeSchema.parse(body)
        const normalizedEmail = email.toLowerCase().trim()

        const existing = await prisma.newsletter.findUnique({
            where: { email: normalizedEmail },
        })

        if (existing) {
            if (existing.unsubscribedAt) {
                const verifyToken = crypto.randomBytes(32).toString('hex')
                await prisma.newsletter.update({
                    where: { id: existing.id },
                    data: {
                        verified: false,
                        verifyToken,
                        unsubscribedAt: null,
                    },
                })
                
                const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/verify?token=${verifyToken}`
                await sendEmail({
                    to: normalizedEmail,
                    subject: 'Konfirmasi Langganan Newsletter - Derap Serayu',
                    html: newsletterVerificationTemplate(verifyUrl),
                })

                return NextResponse.json({
                    success: true,
                    message: 'Email verifikasi telah dikirim ulang.',
                })
            }

            if (existing.verified) {
                return NextResponse.json({
                    success: true,
                    message: 'Email sudah terdaftar.',
                })
            }

            return NextResponse.json({
                success: true,
                message: 'Email sudah terdaftar. Silakan cek inbox untuk verifikasi.',
            })
        }

        const verifyToken = crypto.randomBytes(32).toString('hex')
        
        await prisma.newsletter.create({
            data: {
                email: normalizedEmail,
                verifyToken,
            },
        })

        const verifyUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/newsletter/verify?token=${verifyToken}`
        await sendEmail({
            to: normalizedEmail,
            subject: 'Konfirmasi Langganan Newsletter - Derap Serayu',
            html: newsletterVerificationTemplate(verifyUrl),
        })

        return NextResponse.json({
            success: true,
            message: 'Email verifikasi telah dikirim. Silakan cek inbox Anda.',
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: error.issues[0].message },
                { status: 400 }
            )
        }
        console.error('Newsletter subscribe error:', error)
        return NextResponse.json(
            { error: 'Terjadi kesalahan. Silakan coba lagi.' },
            { status: 500 }
        )
    }
}
