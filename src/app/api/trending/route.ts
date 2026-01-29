import { NextResponse } from 'next/server';
import { getTrendingArticles } from '@/lib/trending';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '5', 10);

        const articles = await getTrendingArticles(Math.min(limit, 20));

        const result = articles.map(article => ({
            id: article.id,
            slug: article.slug,
            title: article.title,
            summary: article.summary,
            category: article.category,
            author: article.author,
            image: article.image || '',
            readTime: article.readTime || '1 menit',
            publishedAt: article.publishedAt?.toISOString() || '',
            createdAt: article.createdAt.toISOString(),
            views: article.views,
            featured: article.featured,
            trendingRank: article.trendingRank,
        }));

        return NextResponse.json(result);
    } catch (error) {
        console.error('Failed to fetch trending articles:', error);
        return NextResponse.json({ error: 'Failed to fetch trending articles' }, { status: 500 });
    }
}
