import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getNewsBySlug } from '@/data/news';
import { getCurrentUser } from '@/lib/auth';
import { validateStatusTransition } from '@/lib/validations';

type Props = {
    params: Promise<{ slug: string }>
}

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
            const staticArticle = getNewsBySlug(slug);
            if (staticArticle) return NextResponse.json(staticArticle);

            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        const parsedArticle = {
            ...article,
            tags: article.tags ? JSON.parse(article.tags) : [],
            gallery: article.gallery ? JSON.parse(article.gallery) : []
        };

        return NextResponse.json(parsedArticle);
    } catch {
        const staticArticle = getNewsBySlug(slug);
        if (staticArticle) return NextResponse.json(staticArticle);

        return NextResponse.json({ error: 'Failed to fetch article' }, { status: 500 });
    }
}

export async function PUT(
    request: Request,
    { params }: Props
) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = await params;
        const body = await request.json();

        const article = await prisma.article.findUnique({ where: { slug } });
        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        if (user.role !== 'ADMIN' && article.authorId !== user.userId) {
            return NextResponse.json({ error: 'Forbidden: You can only edit your own articles' }, { status: 403 });
        }

        const newStatus = body.status;
        const currentStatus = article.status;
        const updateData: Record<string, unknown> = {
            title: body.title,
            summary: body.summary,
            content: body.content,
            category: body.category,
            author: body.author,
            image: body.image,
            gallery: body.gallery ? JSON.stringify(body.gallery) : undefined,
            excerpt: body.excerpt,
            imageCaption: body.imageCaption,
            imageCredit: body.imageCredit,
            metaTitle: body.metaTitle,
            metaDesc: body.metaDesc,
            tags: body.tags ? JSON.stringify(body.tags) : undefined,
            readTime: body.readTime,
            featured: body.featured !== undefined ? body.featured : undefined,
            updatedAt: new Date()
        };

        if (newStatus && newStatus !== currentStatus) {
            if (user.role === 'WRITER' && newStatus === 'published') {
                updateData.status = 'pending_review';
            } else {
                const transition = validateStatusTransition(currentStatus, newStatus, user.role as 'ADMIN' | 'WRITER');
                if (!transition.valid) {
                    return NextResponse.json({ error: transition.message }, { status: 403 });
                }
                updateData.status = newStatus;
            }

            const finalStatus = updateData.status as string;

            if (finalStatus === 'published' && currentStatus !== 'published') {
                updateData.reviewedBy = user.name;
                updateData.reviewedAt = new Date();
                updateData.publishedAt = new Date();
            }

            if (finalStatus === 'rejected') {
                if (!body.rejectionNote) {
                    return NextResponse.json({ error: 'Alasan penolakan wajib diisi' }, { status: 400 });
                }
                updateData.reviewedBy = user.name;
                updateData.reviewedAt = new Date();
                updateData.rejectionNote = body.rejectionNote;
            }

            if (['draft', 'pending_review'].includes(finalStatus) && currentStatus === 'rejected') {
                updateData.rejectionNote = null;
            }
        } else {
            updateData.status = currentStatus;
        }

        if (body.publishedAt && updateData.status !== 'published') {
            updateData.publishedAt = new Date(body.publishedAt);
        }

        const updated = await prisma.article.update({
            where: { slug },
            data: updateData
        });

        const parsedUpdated = {
            ...updated,
            tags: updated.tags ? JSON.parse(updated.tags) : [],
            gallery: updated.gallery ? JSON.parse(updated.gallery) : []
        };

        return NextResponse.json(parsedUpdated);
    } catch {
        return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: Props
) {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { slug } = await params;

        const article = await prisma.article.findUnique({ where: { slug } });
        if (!article) {
            return NextResponse.json({ error: 'Article not found' }, { status: 404 });
        }

        if (user.role !== 'ADMIN' && article.authorId !== user.userId) {
            return NextResponse.json({ error: 'Forbidden: You can only delete your own articles' }, { status: 403 });
        }

        await prisma.article.delete({
            where: { slug }
        });

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Failed to delete article' }, { status: 500 });
    }
}
