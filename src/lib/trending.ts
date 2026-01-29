import prisma from '@/lib/prisma';

interface TrendingScore {
    slug: string;
    score: number;
}

export async function calculateTrendingScores(hoursWindow: number = 72): Promise<TrendingScore[]> {
    const cutoffDate = new Date();
    cutoffDate.setHours(cutoffDate.getHours() - hoursWindow);

    const views = await prisma.articleView.findMany({
        where: {
            viewedAt: { gte: cutoffDate },
        },
        select: {
            slug: true,
            viewedAt: true,
        },
    });

    const now = Date.now();
    const scoreMap: Record<string, number> = {};

    for (const view of views) {
        const hoursAgo = (now - view.viewedAt.getTime()) / (1000 * 60 * 60);
        const weight = 1 / Math.pow(hoursAgo + 2, 1.5);
        scoreMap[view.slug] = (scoreMap[view.slug] || 0) + weight;
    }

    return Object.entries(scoreMap)
        .map(([slug, score]) => ({ slug, score }))
        .sort((a, b) => b.score - a.score);
}

export async function updateTrendingRanks(): Promise<void> {
    const scores = await calculateTrendingScores();
    
    await prisma.article.updateMany({
        data: { trendingRank: null },
    });

    const topTrending = scores.slice(0, 10);
    
    for (let i = 0; i < topTrending.length; i++) {
        await prisma.article.updateMany({
            where: { slug: topTrending[i].slug },
            data: { trendingRank: i + 1 },
        });
    }
}

export async function getTrendingArticles(limit: number = 5) {
    const scores = await calculateTrendingScores();
    const topSlugs = scores.slice(0, limit).map(s => s.slug);

    if (topSlugs.length === 0) {
        return prisma.article.findMany({
            where: { status: 'published' },
            orderBy: { views: 'desc' },
            take: limit,
        });
    }

    const articles = await prisma.article.findMany({
        where: {
            slug: { in: topSlugs },
            status: 'published',
        },
    });

    return articles.sort((a, b) => {
        const aIndex = topSlugs.indexOf(a.slug);
        const bIndex = topSlugs.indexOf(b.slug);
        return aIndex - bIndex;
    });
}
