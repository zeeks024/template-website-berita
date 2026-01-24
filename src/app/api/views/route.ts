import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        // Get views grouped by date for last 7 days
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const views = await prisma.articleView.findMany({
            where: {
                viewedAt: {
                    gte: sevenDaysAgo,
                },
            },
            select: {
                viewedAt: true,
            },
        });

        // Group by day
        const dailyViews: Record<string, number> = {};
        views.forEach((view) => {
            const day = view.viewedAt.toISOString().split('T')[0];
            dailyViews[day] = (dailyViews[day] || 0) + 1;
        });

        // Create array for last 7 days
        const result = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayKey = date.toISOString().split('T')[0];
            result.push({
                date: dayKey,
                views: dailyViews[dayKey] || 0,
            });
        }

        return NextResponse.json(result);
    } catch {
        return NextResponse.json({ error: 'Failed to fetch views' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { slug } = await request.json();

        if (!slug) {
            return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
        }

        await prisma.articleView.create({
            data: { slug },
        });

        await prisma.article.update({
            where: { slug },
            data: { views: { increment: 1 } }
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to record view' }, { status: 500 });
    }
}
