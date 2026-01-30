import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { sendEmail } from '@/lib/email'
import { newsletterDigestTemplate } from '@/lib/email-templates'

export async function POST(request: NextRequest) {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

        const articles = await prisma.article.findMany({
            where: {
                status: 'published',
                publishedAt: { gte: oneWeekAgo },
            },
            orderBy: { publishedAt: 'desc' },
            take: 5,
            select: {
                title: true,
                summary: true,
                slug: true,
                image: true,
            },
        })

        if (articles.length === 0) {
            return NextResponse.json({
                success: true,
                message: 'No articles to send',
                sentCount: 0,
            })
        }

        const subscribers = await prisma.newsletter.findMany({
            where: {
                verified: true,
                unsubscribedAt: null,
            },
            select: { email: true },
        })

        const html = newsletterDigestTemplate(
            articles.map(a => ({
                title: a.title,
                summary: a.summary,
                slug: a.slug,
                image: a.image || '',
            }))
        )

        let sentCount = 0
        for (const subscriber of subscribers) {
            const sent = await sendEmail({
                to: subscriber.email,
                subject: 'Berita Minggu Ini - Derap Serayu',
                html,
            })
            if (sent) sentCount++
        }

        return NextResponse.json({
            success: true,
            sentCount,
            totalSubscribers: subscribers.length,
        })
    } catch (error) {
        console.error('Newsletter digest error:', error)
        return NextResponse.json(
            { error: 'Failed to send newsletter digest' },
            { status: 500 }
        )
    }
}
