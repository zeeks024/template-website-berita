import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: NextRequest) {
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const now = new Date()
        const result = await prisma.article.updateMany({
            where: {
                status: 'scheduled',
                scheduledAt: { lte: now },
            },
            data: {
                status: 'published',
                publishedAt: now,
            },
        })

        return NextResponse.json({
            success: true,
            publishedCount: result.count,
            timestamp: now.toISOString(),
        })
    } catch (error) {
        console.error('Publish scheduled error:', error)
        return NextResponse.json(
            { error: 'Failed to publish scheduled articles' },
            { status: 500 }
        )
    }
}
