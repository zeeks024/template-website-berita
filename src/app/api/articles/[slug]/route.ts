import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getNewsBySlug } from '@/data/news';

type Props = {
    params: Promise<{ slug: string }>
}

// GET: Fetch single article (DB with Fallback)
export async function GET(
    request: Request,
    { params }: Props
) {
    const { slug } = await params;
    try {
        const article = await prisma.article.findUnique({
            where: { slug }
        });

        if (!article) {
            // Try fallback if not found in DB (might be static data only)
            const staticArticle = getNewsBySlug(slug);
            if (staticArticle) return NextResponse.json(staticArticle);

            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        // GET: Parse before returning
        const parsedArticle = {
            ...article,
            tags: article.tags ? JSON.parse(article.tags) : [],
            gallery: article.gallery ? JSON.parse(article.gallery) : []
        };

        return NextResponse.json(parsedArticle);
    } catch (error) {
        console.warn("Database connection failed, falling back to static data.");
        const staticArticle = getNewsBySlug(slug);
        if (staticArticle) return NextResponse.json(staticArticle);

        return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
    }
}

// PUT: Update article
export async function PUT(
    request: Request,
    { params }: Props
) {
    try {
        const { slug } = await params;
        const body = await request.json();

        const updated = await prisma.article.update({
            where: { slug },
            data: {
                title: body.title,
                summary: body.summary,
                content: body.content,
                category: body.category,
                author: body.author,
                image: body.image,
                gallery: body.gallery ? JSON.stringify(body.gallery) : undefined,
                status: body.status,
                excerpt: body.excerpt,
                imageCaption: body.imageCaption,
                imageCredit: body.imageCredit,
                metaTitle: body.metaTitle,
                metaDesc: body.metaDesc,
                tags: body.tags ? JSON.stringify(body.tags) : undefined,
                readTime: body.readTime,
                publishedAt: body.publishedAt,
                updatedAt: new Date()
            }
        });

        // Parse response for consistency
        const parsedUpdated = {
            ...updated,
            tags: updated.tags ? JSON.parse(updated.tags) : [],
            gallery: updated.gallery ? JSON.parse(updated.gallery) : []
        };

        return NextResponse.json(parsedUpdated);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
    }
}

// DELETE: Remove article
export async function DELETE(
    request: Request,
    { params }: Props
) {
    try {
        const { slug } = await params;

        await prisma.article.delete({
            where: { slug }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
    }
}
