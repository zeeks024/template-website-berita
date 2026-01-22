import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { newsData } from '@/data/news';

// GET: Fetch all articles (From DB with Fallback to Static)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status');

        const whereClause = status === 'all' ? {} : { status: 'published' };

        const articles = await prisma.article.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' }
        });

        const parsedArticles = articles.map(article => ({
            ...article,
            tags: article.tags ? JSON.parse(article.tags) : [],
            gallery: article.gallery ? JSON.parse(article.gallery) : []
        }));

        return NextResponse.json(parsedArticles);
    } catch (error) {
        console.warn("Database connection failed, falling back to static data.");
        // Fallback to static data if DB fails
        return NextResponse.json(newsData);
    }
}

// POST: Create a new article (Admin)
export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Basic validation
        if (!body.title || !body.slug) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Ensure slug uniqueness
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
                author: body.author || 'Redaksi',
                image: body.image || '',
                gallery: body.gallery ? JSON.stringify(body.gallery) : undefined,
                status: body.status || 'draft',
                excerpt: body.excerpt || '',
                imageCaption: body.imageCaption || '',
                imageCredit: body.imageCredit || '',
                metaTitle: body.metaTitle || '',
                metaDesc: body.metaDesc || '',
                tags: body.tags ? JSON.stringify(body.tags) : undefined,
                publishedAt: body.publishedAt || 'Baru saja',
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
    } catch (error: any) {
        console.error("Error creating article:", error);
        return NextResponse.json(
            { error: 'Failed to create article', details: error.message },
            { status: 500 }
        );
    }
}
