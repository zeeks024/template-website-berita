import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ tag: string }> }
) {
    try {
        const { tag } = await params;
        const decodedTag = decodeURIComponent(tag).toLowerCase();

        const articles = await prisma.article.findMany({
            where: {
                status: 'published',
                tags: {
                    contains: decodedTag,
                }
            },
            orderBy: { publishedAt: 'desc' },
            select: {
                id: true,
                slug: true,
                title: true,
                summary: true,
                excerpt: true,
                image: true,
                category: true,
                author: true,
                publishedAt: true,
                readTime: true,
                tags: true,
            }
        });

        // Filter untuk memastikan tag yang cocok persis
        const filteredArticles = articles.filter(article => {
            if (!article.tags) return false;
            try {
                const tagsArray: string[] = JSON.parse(article.tags);
                return tagsArray.some(t => t.toLowerCase() === decodedTag);
            } catch {
                return false;
            }
        }).map(article => ({
            ...article,
            tags: article.tags ? JSON.parse(article.tags) : [],
            publishedAt: article.publishedAt?.toISOString() || ''
        }));

        return NextResponse.json({
            tag: decodedTag,
            count: filteredArticles.length,
            articles: filteredArticles
        });
    } catch (error) {
        console.error('Error fetching articles by tag:', error);
        return NextResponse.json(
            { error: 'Failed to fetch articles' },
            { status: 500 }
        );
    }
}
