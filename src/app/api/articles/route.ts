import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { newsData } from '@/data/news';
import { getCurrentUser, requireAuth } from '@/lib/auth';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const myArticles = searchParams.get('my') === 'true';

        let whereClause: Record<string, unknown> = {};
        
        if (status !== 'all') {
            whereClause.status = 'published';
        }

        if (myArticles) {
            const user = await getCurrentUser();
            if (!user) {
                return NextResponse.json([]);
            }
            whereClause.authorId = user.userId;
        } else if (status === 'all') {
            const user = await getCurrentUser();
            if (!user) {
                whereClause.status = 'published';
            } else if (user.role !== 'ADMIN') {
                whereClause.authorId = user.userId;
            }
        }

        const articles = await prisma.article.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            include: { authorUser: { select: { id: true, name: true } } }
        });

        const parsedArticles = articles.map(article => ({
            ...article,
            tags: article.tags ? JSON.parse(article.tags) : [],
            gallery: article.gallery ? JSON.parse(article.gallery) : []
        }));

        return NextResponse.json(parsedArticles);
    } catch {
        return NextResponse.json(newsData);
    }
}

export async function POST(request: Request) {
    try {
        const user = await requireAuth();
        
        const body = await request.json();

        if (!body.title || !body.slug) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let uniqueSlug = body.slug;
        let counter = 1;

        while (await prisma.article.findUnique({ where: { slug: uniqueSlug } })) {
            uniqueSlug = `${body.slug}-${counter}`;
            counter++;
        }

        const article = await prisma.article.create({
            data: {
                slug: uniqueSlug,
                title: body.title,
                summary: body.summary || '',
                content: body.content || '',
                category: body.category || 'Umum',
                author: user.name,
                authorId: user.userId,
                image: body.image || '',
                gallery: body.gallery ? JSON.stringify(body.gallery) : undefined,
                status: body.status || 'draft',
                excerpt: body.excerpt || '',
                imageCaption: body.imageCaption || '',
                imageCredit: body.imageCredit || '',
                metaTitle: body.metaTitle || '',
                metaDesc: body.metaDesc || '',
                tags: body.tags ? JSON.stringify(body.tags) : undefined,
                publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
                readTime: body.readTime || '3 menit',
                featured: body.featured || false
            }
        });

        const parsedArticle = {
            ...article,
            tags: article.tags ? JSON.parse(article.tags) : [],
            gallery: article.gallery ? JSON.parse(article.gallery) : []
        };

        return NextResponse.json(parsedArticle);
    } catch (error: unknown) {
        if (error instanceof Error && error.message === 'UNAUTHORIZED') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        return NextResponse.json(
            { error: 'Failed to create article', details: errorMessage },
            { status: 500 }
        );
    }
}
