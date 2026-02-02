import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export async function GET() {
    try {
        const user = await getCurrentUser();
        
        let whereClause: Record<string, unknown> = {};
        
        if (!user) {
            whereClause.status = 'published';
        } else if (user.role !== 'ADMIN') {
            whereClause.authorId = user.userId;
        }

        const [totalArticles, totalViewsResult, categoryStats, recentArticles, draftCount] = await Promise.all([
            prisma.article.count({ where: whereClause }),
            prisma.article.aggregate({
                where: whereClause,
                _sum: { views: true }
            }),
            prisma.article.groupBy({
                by: ['category'],
                where: whereClause,
                _count: { category: true },
                orderBy: { _count: { category: 'desc' } },
                take: 1
            }),
            prisma.article.findMany({
                where: whereClause,
                orderBy: { createdAt: 'desc' },
                take: 5,
                select: {
                    id: true,
                    title: true,
                    status: true,
                    publishedAt: true,
                    createdAt: true
                }
            }),
            prisma.article.count({
                where: { ...whereClause, status: 'draft' }
            })
        ]);

        return NextResponse.json({
            totalArticles,
            totalViews: totalViewsResult._sum.views || 0,
            topCategory: categoryStats[0]?.category || '-',
            draftCount,
            recentArticles: recentArticles.map(a => ({
                id: a.id,
                title: a.title,
                status: a.status,
                publishedAt: a.publishedAt?.toISOString() || a.createdAt.toISOString()
            }))
        });
    } catch (error) {
        console.error('Stats error:', error);
        return NextResponse.json({
            totalArticles: 0,
            totalViews: 0,
            topCategory: '-',
            draftCount: 0,
            recentArticles: []
        });
    }
}
