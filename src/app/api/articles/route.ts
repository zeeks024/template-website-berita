import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { newsData } from '@/data/news';
import { getCurrentUser, requireAuth } from '@/lib/auth';

const VALID_STATUSES = ['draft', 'pending_review', 'published', 'rejected', 'scheduled', 'archived'];

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');
        const myArticles = searchParams.get('my') === 'true';
        const page = parseInt(searchParams.get('page') || '1', 10);
        const limit = parseInt(searchParams.get('limit') || '10', 10);
        const paginate = searchParams.get('paginate') === 'true';

        const whereClause: Record<string, unknown> = {};
        
        if (status && status !== 'all' && VALID_STATUSES.includes(status)) {
            whereClause.status = status;
        } else if (status !== 'all') {
            whereClause.status = 'published';
        }

        if (myArticles) {
            const user = await getCurrentUser();
            if (!user) {
                return NextResponse.json(paginate ? { articles: [], total: 0, page, limit, totalPages: 0 } : []);
            }
            whereClause.authorId = user.userId;
        } else if (status === 'all' || (status && status !== 'published' && VALID_STATUSES.includes(status))) {
            const user = await getCurrentUser();
            if (!user) {
                whereClause.status = 'published';
            } else if (user.role !== 'ADMIN') {
                whereClause.authorId = user.userId;
            }
        }

        if (paginate) {
            const [articles, total] = await Promise.all([
                prisma.article.findMany({
                    where: whereClause,
                    orderBy: { createdAt: 'desc' },
                    include: { authorUser: { select: { id: true, name: true } } },
                    skip: (page - 1) * limit,
                    take: limit
                }),
                prisma.article.count({ where: whereClause })
            ]);

            const parsedArticles = articles.map(article => ({
                ...article,
                tags: article.tags ? JSON.parse(article.tags) : [],
                gallery: article.gallery ? JSON.parse(article.gallery) : []
            }));

            return NextResponse.json({
                articles: parsedArticles,
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit)
            });
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

        let requestedStatus = body.status || 'draft';

        if (user.role === 'WRITER') {
            if (requestedStatus === 'published') {
                requestedStatus = 'pending_review';
            }
            if (!['draft', 'pending_review'].includes(requestedStatus)) {
                requestedStatus = 'draft';
            }
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
                status: requestedStatus,
                excerpt: body.excerpt || '',
                imageCaption: body.imageCaption || '',
                imageCredit: body.imageCredit || '',
                metaTitle: body.metaTitle || '',
                metaDesc: body.metaDesc || '',
                tags: body.tags ? JSON.stringify(body.tags) : undefined,
                publishedAt: requestedStatus === 'published' ? new Date() : undefined,
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
