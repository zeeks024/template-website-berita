import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch all articles (with optional query for sorting/filtering later)
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const slug = searchParams.get('slug');

        if (slug) {
            const article = await (prisma as any).article.findUnique({
                where: { slug }
            });
            if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 });
            return NextResponse.json(article);
        }

        const articles = await (prisma as any).article.findMany({
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json(articles);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch articles' }, { status: 500 });
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

        const article = await (prisma as any).article.create({
            data: {
                slug: body.slug,
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

        return NextResponse.json(article);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
    }
}
