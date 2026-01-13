import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

type Props = {
    params: Promise<{ slug: string }>
}

// GET: Fetch single article
export async function GET(
    request: Request,
    { params }: Props
) {
    try {
        const { slug } = await params;
        const article = await (prisma as any).article.findUnique({
            where: { slug }
        });

        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        // Parse gallery and tags if they exist
        const responseData = {
            ...article,
            gallery: article.gallery ? JSON.parse(article.gallery) : [],
            tags: article.tags ? JSON.parse(article.tags) : []
        };

        return NextResponse.json(responseData);
    } catch (error) {
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

        // Check if article exists
        const existing = await (prisma as any).article.findUnique({
            where: { slug }
        });

        if (!existing) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        const updated = await (prisma as any).article.update({
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

        return NextResponse.json(updated);
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

        await (prisma as any).article.delete({
            where: { slug }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
    }
}
